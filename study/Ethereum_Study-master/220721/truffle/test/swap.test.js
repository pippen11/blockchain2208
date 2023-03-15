const JwToken = artifacts.require('JwToken');
const EthSwap = artifacts.require('EthSwap');

function toEther(n) {
    return web3.utils.toWei(n, 'ether');
}

// contract() : 재배포를 진행하면서 테스트 코드를 돌려준다.

// web3.eth.getAccount()
contract('EthSwap', ([deployer, account1, account2]) => {
    let token, ethSwap;

    describe('EthSwap deployment', () => {
        // console.log(deployer, account1, account2);
        it('deployed', async () => {
            token = await JwToken.deployed();
            ethSwap = await EthSwap.deployed();

            console.log('JwToken CA : ', token.address);
            console.log('EthSwap CA : ', ethSwap.address);
        });

        it('토큰 배포자의 기본 초기값 확인', async () => {
            const balance = await token.balanceOf(deployer);
            console.log('deployer EOA 토큰 밸런스 : ', balance.toString() / 10 ** 18);
            assert.equal(balance.toString(), '5000000000000000000000');
        });

        it('ethSwap - getSwapBalance()', async () => {
            const swapBal = await ethSwap.getSwapBalance();
            console.log('getSwapBalance() : ', swapBal.toString() / 10 ** 18);
        });

        it('ethSwap - getToken()', async () => {
            const address = await ethSwap.getToken();
            assert.equal(address, token.address);
        });

        it('ethSwap - getMsgSender(), getThisAddress()', async () => {
            const msgSender = await ethSwap.getMsgSender(); // EthSwap 컨트랙트를 실행시킨 사람의 EOA
            const thisAddress = await ethSwap.getThisAddress();

            assert.equal(msgSender, deployer);
            assert.equal(thisAddress, ethSwap.address);
        });

        // ERC20 배포한 사람의 EOA 계정을 알고 싶다.
        it('token - owner 확인', async () => {
            const owner = await token._owner();
            console.log('owner EOA : ', owner);
            assert.equal(owner, deployer);
        });

        it('ethSwap - getTokenOwner()', async () => {
            const owner = await ethSwap.getTokenOwner();

            assert.equal(owner, deployer);
        });

        it('token - balanceOf()', async () => {
            // token.transfer(보내는 사람 주소, 1000)
            // JwToken에 있는 transfer 함수 실행해서 토큰 전송
            // 1 token == 1 wei (단위 맞춰줌)
            await token.transfer(ethSwap.address, toEther('1000'));
            const balance = await token.balanceOf(ethSwap.address);
            const ownerBal = await token.balanceOf(deployer);
            console.log('deployer EOA 토큰 밸런스 : ', ownerBal.toString() / 10 ** 18);
            console.log('ethSwap CA 토큰 밸런스 : ', balance.toString() / 10 ** 18);
        });

        it('ethSwap - buyToken()', async () => {
            let balance = await token.balanceOf(account1); // 0
            let ethBal = await web3.eth.getBalance(account1);
            console.log('account1 토큰 밸런스 : ', balance.toString());
            console.log('account1 이더 밸런스 : ', ethBal.toString() / 10 ** 18);

            assert.equal(balance.toString(), '0');

            await ethSwap.buyToken({
                from: account1,
                value: toEther('1'),
            });

            balance = await token.balanceOf(account1);
            console.log('buyToken() 실행 이후 account1 토큰 밸런스 : ', parseInt(balance.toString()) / 10 ** 18); // 100 token

            const ethAccount = await web3.eth.getBalance(account1);
            console.log('buyToken() 실행 이후 account1 이더 밸런스 : ', ethAccount / 10 ** 18);

            const ethSwapBalance = await web3.eth.getBalance(ethSwap.address);
            console.log('ethSwap CA에 들어간 이더 밸런스 : ', web3.utils.fromWei(ethSwapBalance));

            const ethSwapTokenBal = await token.balanceOf(ethSwap.address);
            console.log('ethSwap CA에 있는 토큰 밸런스 : ', ethSwapTokenBal.toString() / 10 ** 18);
        });

        it('ethSwap - sellToken()', async () => {
            const account1_balance = await token.balanceOf(account1);
            // console.log(web3.utils.fromWei(account1_balance.toString(), 'ether'));

            let swapEth = await web3.eth.getBalance(ethSwap.address);
            let swapToken = await token.balanceOf(ethSwap.address);
            let accountEth = await web3.eth.getBalance(account1);
            let accountToken = await token.balanceOf(account1);

            console.log(`
                sellToken() 실행 전
                swapEth : ${swapEth / 10 ** 18}
                swapToken : ${swapToken / 10 ** 18}
                accountEth : ${accountEth / 10 ** 18}
                accountToken : ${accountToken / 10 ** 18}
            `);

            // approve(위임받는사람, 보낼양)
            /* 
                A : 위임 해주는 사람
                B : 위임 받는 사람
                C : 돈을 받는 사람
                A -> B : 1000
                approve(B:위임 받는 사람, 1000)

                컨트랙트를 발동시키는 사람이 위임을 해준다.
                account1 -> ethSwap (CA)
            */
            // from : account1 == 위임해주는 사람
            // ethSwap (CA) == 위임 받는 사람

            await token.approve(ethSwap.address, toEther('50'), {
                from: account1,
            });

            await ethSwap.sellToken(toEther('50'), {
                from: account1,
            });

            swapEth = await web3.eth.getBalance(ethSwap.address);
            swapToken = await token.balanceOf(ethSwap.address);
            accountEth = await web3.eth.getBalance(account1);
            accountToken = await token.balanceOf(account1);

            console.log(`
                sellToken() 실행 이후
                swapEth : ${swapEth / 10 ** 18}
                swapToken : ${swapToken / 10 ** 18}
                accountEth : ${accountEth / 10 ** 18}
                accountToken : ${accountToken / 10 ** 18}
            `);

            // await token.transfer(ethSwap.address, toEther('50'), {from: account1})
            // 마지막 객체는 인자값X => .send({from: accoun1}) 과 동일
            // 만약 ethSwap CA에 이더 잔액이 부족하다면? 에러,,
            /*
                {
                    from: account1,
                    to: token.address,
                    data: 'approve 함수 바이트 코드'
                }
            */

            // 1. 토큰 50개를 ethSwap에 보내는 것
            // 2. 토큰 50개 만큼의 ETH 돌려받는 것

            // 제3자 거래
            // account1 -> ethSwap 50개만큼 사용할 수 있게 처리하고
            // ethSwap 안에서 코드를 처리하고 transferFrom 으로 이더 전송
            // 1. ethSwap이 accoun1에 대한 위임을 받는다
            // 2. ethSwap이 스마트 컨트랙트를 발동시켜서 돈이 다시 account1로 가게끔 하는 프로세스
        });
    });
});
