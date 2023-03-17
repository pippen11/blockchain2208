import { Transaction } from './transaction'
import { UnspentTxOut } from './UnspentTxOut'

describe('Trasnaction', () => {
    let transaction: Transaction
    let amount: number, recipient: string
    let sender: string
    let TxIns: ITxIn[]
    let TxOuts: ITxOut[]
    let unspentTxOut: UnspentTxOut[] = []

    beforeEach(() => {
        amount = 50
        recipient = '--recipient--'
        sender = '01089557722'
    })

    it('newTransaction', () => {
        transaction = Transaction.newTransaction(sender, recipient, amount, unspentTxOut)
        expect(transaction instanceof Transaction).toBe(true)
    })

    it('createTransactionHash', () => {
        const hash = Transaction.createTransactionHash(transaction)
        expect(hash).toEqual(transaction.hash)
    })
})
