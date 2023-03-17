import { SHA256 } from 'crypto-js'

// #1. createTransaction
export class Transaction implements ITransaction {
    public hash: string
    public txIns: ITxIn[]
    public txOuts: ITxOut[]

    constructor() {
        this.hash = ''
        this.txIns = []
        this.txOuts = []
    }

    static newTransaction(
        _sender: string,
        _recipient: string,
        _amount: number,
        _unspentTxOuts: IUnspentTxOut[],
    ): Transaction {
        const transaction = new Transaction()

        // TODO : test 코드를 작성하기 위한 임시코드
        const txout = new TxOut('01089557722', 50)
        const txin = new TxIn('hash', 1)
        transaction.txIns.push(txin)
        transaction.txOuts.push(txout)

        // TODO : createHash
        transaction.hash = Transaction.createTransactionHash(transaction)

        return transaction
    }

    static createTransactionHash(_transaction: Transaction): string {
        const txInContent: string = Transaction.TxToString(_transaction.txIns)
        const txOutContent: string = Transaction.TxToString(_transaction.txOuts)
        return SHA256(txInContent + txOutContent).toString()
    }

    static TxToString<T>(_data: T[]): string {
        return _data.reduce((acc: string, item: T) => {
            const [[key, value]] = Object.entries(item)
            acc += value.toString()
            return acc
        }, '')
    }
}
