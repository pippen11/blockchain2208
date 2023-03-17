import { Chain } from '@core/blockchain/chain'
import { Wallet } from '@core/wallet/wallet'

describe('Chain 함수체크', () => {
    let ws: Chain = new Chain() // [GENESIS]
    let receivedTx = {
        sender: '026f7cd8fb5b60fa307b9c6afc1d2395f79ba164d2ab2235835b42248fd618b1ff',
        received: '1d2395f79ba164d2ab2235835b42248fd618b1ff',
        amount: 20,
        signature: {
            r: '10a59a1a9f86d290c48bb84be574ff167347fc0cba9c9f65a741c7139e2ed0ee',
            s: 'e4df1414d99b57b1c8c1e3b499998f5da1881801ad42e0feb4c3b052843b3092',
            recoveryParam: 1,
        },
    }
    it('addBlock 함수체크', () => {
        // for (let i = 1; i <= 10; i++) {
        //     // 현높이가 2 블럭을가지고오고 , 3블럭을 만들때
        //     node.miningBlock('1d2395f79ba164d2ab2235835b42248fd618b1ff')
        // }
        ws.miningBlock('1d2395f79ba164d2ab2235835b42248fd618b1ff')
        ws.miningBlock('1d2395f79ba164d2ab2235835b42248fd618b1ff')
        ws.miningBlock('1d2395f79ba164d2ab2235835b42248fd618b1ff')
        ws.miningBlock('10187335f40af237c8fe4764bdabbf6f34c340ff')
        ws.miningBlock('10187335f40af237c8fe4764bdabbf6f34c340ff')
        ws.miningBlock('10187335f40af237c8fe4764bdabbf6f34c340ff')
        // console.log(node.getChain())
        // console.log(ws.getUnspentTxOuts())
        // // console.log(node.getLatestBlock().data[0].txIns)
        // console.log(
        //     'b38f474c08e92cdaf8adc058ae6eddb294b6ca60 총금액 : ',
        //     Wallet.getBalacne('b38f474c08e92cdaf8adc058ae6eddb294b6ca60', ws.getUnspentTxOuts()),
        // )
    })

    it('sendTransaction 검증', () => {
        try {
            const tx = Wallet.sendTransaction(receivedTx, ws.getUnspentTxOuts())
            // Transaction 내용을가지고 UTXO 를 최신화하기. updateUTXO
            // ws.updateUTXO(tx)

            ws.appendTransactionPool(tx)
            ws.updateUTXO(tx) // 7 50 5개 20개 1 30개 1

            // 마이닝

            console.log(ws.getTransactionPool()) //1
        } catch (e) {
            if (e instanceof Error) console.error(e.message)
        }
    })

    it('채굴 테스트', () => {
        try {
            // Txpool : 1
            ws.miningBlock('10187335f40af237c8fe4764bdabbf6f34c340ff')
            console.log(ws.getTransactionPool()) // txpool : 0

            console.log(ws.getChain()) // block : 7
            console.log(ws.getChain()[6]) // block data -> transaction 2개
        } catch (e) {}
    })

    it('트랜잭션 검증', () => {
        // TODO : 지갑 -> Block Server
        // 서명을 확인하고.
        // 받은것을 가지고. UTXO에서 내용을 가지고와서 현재 보내는사람의 계정의 돈이있는지 확인하고.
        // Transaction을 만들어야겠죠
        // 1. 보내는사람의 금액에 맞는 UTXO를 찾는과정
        // 2  TxIn 만드는 과정
        //  보낸금액 1 BTC
        // 3. TxOut 만드는 과정
        // 보낼계정 : asdfasdf
        // 보낼금액 : 0.5
        // 인구
        // 보낼계정 : 인구 - 보내는사람의 계정
        // 보낼금액 : 0.5  - 보낸금액 - 보낼양
        // 인구
        //  1
        //  1
        //  1
        // input ouput
        //  1      2.5
        //  1      0.5
        //  1
        // 지갑 - sendTransaction()
    })
})
