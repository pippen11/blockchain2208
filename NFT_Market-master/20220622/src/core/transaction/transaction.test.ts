import { Transaction } from './transaction'
import { TxIn } from './txin'
import { TxOut } from './txout'

describe('Transaction 생성', () => {
    // 코인베이스
    let txin: TxIn
    let txout: TxOut
    let transaction: Transaction
    it('txin 생성해보기', () => {
        txin = new TxIn('', 0)
    })

    it('txout 생성해보기', () => {
        txout = new TxOut('1d2395f79ba164d2ab2235835b42248fd618b1ff', 50)
    })

    it('transaction 생성해보기', () => {
        transaction = new Transaction([txin], [txout])
        const utxo = transaction.createUTXO()
        console.log(utxo)
    })
})
