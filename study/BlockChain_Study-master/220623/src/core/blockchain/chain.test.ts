import { Chain } from '@core/blockchain/chain';
import { Wallet } from '@core/wallet/wallet';

describe('Chain 함수 체크', () => {
    let ws: Chain = new Chain(); // [GENESIS]
    let receivedTx = {
        sender: '03a8aca5135a59c8493d69c75323d848b964dc1b930f25fdb84d7442de6fe7448c',
        received: 'd8d268f4eb3c7c2701c615474c67f61503e0b11c',
        amount: 120,
        signature: {
            r: 'b4abf3c69d54e453bd53aa9fbaf851c338a2d5d2da36b41209b4d26e6bb72b00',
            s: 'dc9e8efcf559a035c34b13f1327166992f5f299462977e8aed93885fb22d55ac',
            recoveryParam: 1,
        },
    };

    it('getChain() 함수 체크', () => {
        console.log(ws.getChain());
    });

    it('getLength() 함수 체크', () => {
        console.log(ws.getLength());
    });

    it('getLatestBlock() 함수 체크', () => {
        console.log(ws.getLatestBlock());
    });

    it('addBlock 함수 체크', () => {
        for (let i = 1; i <= 5; i++) {
            // 현 높이가 2 , 두번째 블록을 가져오고 3번째 블록을 만들 때
            ws.miningBlock('23d848b964dc1b930f25fdb84d7442de6fe7448c');
        }

        console.log(ws.getLatestBlock().data);
        console.log(ws.getUnspentTxOuts());

        console.log('총 금액 : ', Wallet.getBalance('23d848b964dc1b930f25fdb84d7442de6fe7448c', ws.getUnspentTxOuts()));
    });

    it('sendTransaction() 검증', () => {
        try {
            const tx = Wallet.sendTransaction(receivedTx, ws.getUnspentTxOuts());
            // console.log(tx);

            console.log(ws.getUnspentTxOuts());

            // Transaction 내용을 가지고 UTXO 최신화하기 updateUTXO()
            // console.log(ws.updateUTXO(tx));

            // console.log(ws.getUnspentTxOuts());

            ws.appendTransactionPool(tx);
            ws.updateUTXO(tx);

            console.log(ws.getUnspentTxOuts());
            console.log('풀 : ', ws.getTransactionPool());

            // 마이닝 -> 트랜잭션 풀에 있는 트랜잭션 데이터 넣기
        } catch (e) {
            if (e instanceof Error) console.log(e.message);
        }
    });

    it('채굴 테스트', () => {
        try {
            ws.miningBlock('23d848b964dc1b930f25fdb84d7442de6fe7448c');
            console.log(ws.getTransactionPool());
        } catch (e) {}
    });

    it('트랜잭션 검증', () => {
        /*
            ToDo : 지갑 -> Block Server
                1. 서명 확인
                2. 받은 것을 가지고, UTXO에서 내용을 가지고 와서 현재 보내는 사람의 계정에 돈이 있는지 확인
                3. Transaction 만들기 (A -> B, 0.5 전송)
                    (1) 보내는 사람이 작성한 금액에 맞는 UTXO를 찾는 과정
                    (2) TxIn 만드는 과정
                        // 보낸금액: 1
                    (3) TxOut 만드는 과정
                        // 보낼계정: B
                        // 보낼금액: 0.5

                        // 보낼계정: A (보내는 사람의 계정)
                        // 보낼금액: 0.5 (보낸금액 - 보낼금액)
        */
    });
});
