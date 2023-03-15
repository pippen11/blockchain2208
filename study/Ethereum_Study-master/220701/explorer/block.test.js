const Web3 = require('web3');

describe('Block', () => {
    let web3;

    it('web3 연결 테스트', async () => {
        // 여기서 web3 라이브러리는 자바스크립트 파일
        web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:9000'));

        // NodeJs 환경에서 geth에게 요청을 보내 값을 가져와야 한다.
        // web3 라이브러리에서 eth 모듈을 사용해서 geth에게 요청을 보낸 것
        const block_number = await web3.eth.getBlockNumber();
        console.log(block_number);

        // 블록에 있는 정보 가져오기
        // 40번 블록에 대한 정보
        const block = await web3.eth.getBlock(40, true);
        console.log(block);

        // 제네시스 블록 number : 1
        // 모든 블록 정보 가져오기
        // for (let i = 1; i <= block_number; i++) {
        //     const block = await web3.eth.getBlock(i, true);
        //     console.log(block);

        //     for (let j = 0; j < block.transactions.length; j++) {
        //         console.log(block.transactions[j]);
        //     }
        // }
    });

    // 0xeec18f258b11011d462c4fef0e32271695048552
    // web3.fromWei(eth.getBalance(eth.coinbase), 'ether')
    // web3.fromWei(eth.getBalance('0xeec18f258b11011d462c4fef0e32271695048552'), 'ether')

    // getTransaction() 사용자가 서명까지 완료한 데이터의 결과물을 보여줌
    // EVM을 거치기 전의 트랜잭션 내용
    it('getTransaction', async () => {
        const tx = await web3.eth.getTransaction('0xd55c6a040b34bd46b0a7dc9ff6905beb0a1761a0610c2568e9a961568f009400');
        console.log('tx : ', tx);
    });

    // geth 가 트랜잭션 내용을 실행한 결과물 (EVM을 거쳤다가 나온 트랜잭션)
    // Block에 있는 내용
    it('getTransactionReceipt', async () => {
        const tx = await web3.eth.getTransactionReceipt(
            '0xd55c6a040b34bd46b0a7dc9ff6905beb0a1761a0610c2568e9a961568f009400',
        );
        console.log('tx Receipt : ', tx);
    });

    // 블록을 가져와서 조회했다면 해당 블록의 정보를 우리 서버의 DB에 저장해줘야 한다.
});
