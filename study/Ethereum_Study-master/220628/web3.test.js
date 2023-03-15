// web3 테스트 코드

const Web3 = require('web3');
const ethTx = require('ethereumjs-tx').Transaction;

describe('web3 테스트 코드', () => {
    let web3;
    let accounts;

    let sender; // 보내는 사람
    let received; // 받는 사람

    it('web3 연결 테스트', () => {
        // web3를 사용해 메소드만 호출하면 요청을 보내게끔 하고 싶다.
        // new Web3.providers.HttpProvider("http://127.0.0.1:8545");
        web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
        // console.log(web3);
    });

    // web3 라이브러리에서 반환값은 Promise 객체
    // 최신 블록의 높이(number) 가져오기
    it('Latest Block 높이(number) 가져오기', async () => {
        const latestBlock = await web3.eth.getBlockNumber();
        console.log(latestBlock);
    });

    it('전체 accounts 가져오기', async () => {
        // 현재 가나쉬에 있는 accounts
        accounts = await web3.eth.getAccounts();
        sender = accounts[0];
        received = accounts[1];
        console.log(accounts);
    });

    it('첫번째 계정 balance 가져오기', async () => {
        // getBalance() 메소드에는 인자값 존재
        const balance = await web3.eth.getBalance(accounts[0]);
        console.log(balance); // wei 단위로 Ether를 표현함.
        console.log('ETH : ', balance / 10 ** 18);

        /**
         * 이더리움의 단위
         * wei : 1
         * Gwei : 10 ** 9
         * Ether : 10 ** 18
         *
         * */
    });

    it('ETH 단위 변경하기', () => {
        console.log(web3.utils.toWei('1', 'gwei')); // 1 gwei를 wei 단위로 변환
        console.log(web3.utils.toWei('1', 'ether')); // 1 ether를 wei 단위로 변환
    });

    /**
     * web3-eth
     * web3-shh : webSocket 전용
     * web3-bzz
     * web3-utils
     */

    it('트랜잭션 횟수 구해오기', async () => {
        const txCount = await web3.eth.getTransactionCount(sender);
        console.log('txCount : ', txCount);

        // 트랜잭션 횟수를 hex 단위로 변환
        console.log(web3.utils.toHex(txCount));
    });

    // 메타마스크 없이 가나쉬만을 이용해 트랜잭션 구현하기
    /**
     * 트랜잭션 구현에 필요한 값
     *
     * 보내는 사람 계정 (account)
     * 받는 사람 계정
     * 보낼 금액
     * 서명 (개인키 필요)
     * 수수료
     * data
     * nonce
     */
    // 블록 속성의 nonce 값은 PoW 용도
    // 트랜잭션 객체 안의 nonce 값은 보내는 사람이 발생시킨 트랜잭션 횟수
    // 계정의 상태를 체크하기 위해 nonce라는 고유한 값을 넣어준 것.

    it('트랜잭션 실행하기', async () => {
        const txCount = await web3.eth.getTransactionCount(sender);
        /**
         * 이더리움은 블록을 생성할 때 한 블록에서 사용할 수 있는 가스량을 지정한다. -> gasLimit
         * 트랜잭션을 발생시켰을 때 돌아가는 로직에 따라 가스비를 측정
         * 몇 가스를 사용했냐에 따라 가스비가 측정된다.
         * 가스비가 존재하는 이유는 EVM을 실행시키기 때문이다.
         * 악의적인 코드 실행을 막기 위해 도입된 개념.
         * 쉽게말해 EVM 사용료 = 가스비
         */
        /**
         * gasLimit
         * gasPrice : sender가 지정, 1 gas 당 내야할 값
         */
        // gasUsed < gasLimit 이어야만 트랜잭션이 블록에 들어간다.

        // 0xca4d95b225d1a7a48b994da481c7d7fb3eedf0a33f84f89b28868499bcc794da (보내는 사람 개인키)
        const privateKey = Buffer.from('ca4d95b225d1a7a48b994da481c7d7fb3eedf0a33f84f89b28868499bcc794da', 'hex'); // 앞의 0x 제거
        const txObject = {
            nonce: web3.utils.toHex(txCount), // 보내는 사람이 발생시킨 트랜잭션 횟수
            from: sender,
            to: received,
            value: web3.utils.toHex(web3.utils.toWei('1', 'ether')), // 보낼 금액 (단위를 wei로 해야한다. 10 ** 18 -> hex)
            gasLimit: web3.utils.toHex(6721975), // 해당 트랜잭션이 사용할 수 있는 가스의 최대치 (아반떼 연료통이 55L)
            gasPrice: web3.utils.toHex(web3.utils.toWei('1', 'gwei')), // 발신자가 지불하는 가스 당 가격 (1L 당 = 2,000)
            data: web3.utils.toHex(''), // 스마트 컨트랙트와 관련된 data
        };

        const tx = new ethTx(txObject);
        tx.sign(privateKey); // tx.sign() 메소드를 사용하면 tx 객체 안에 서명 값을 추가해준다.
        console.log(tx);

        const serializedTx = tx.serialize();
        console.log(serializedTx.toString('hex'));

        const TxObject = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));
        console.log(TxObject);
    });

    // 가나쉬에서는 트랜잭션이 발생될 때마다 블록이 마이닝된다.

    it('Balance 확인', async () => {
        const senderBalance = await web3.eth.getBalance(sender);
        const receivedBalance = await web3.eth.getBalance(received);

        console.log('sender balance : ', senderBalance / 10 ** 18);
        console.log('received balance : ', receivedBalance / 10 ** 18);
    });

    it('가스 사용량 확인하기', () => {
        // 기본 가스 사용량 21000
        // 21000 + 4 (balance 값을 바꾸는데 +- 연산이 사용됨)
        /**
         * gasUsed : 21004
         * gasPrice : 1 gwei
         * gasLimit : 6721975
         */
    });
});
