import { TxOut } from './TxOut'
import { TxIn } from './TxIn'
import { SHA256 } from 'crypto-js'
import { UnspentTxOut } from './UnspentTxOut'
import { COINBASE_AMOUNT } from '@core/config'

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
            if (item instanceof TxOut) acc += key + value.toString()
            else acc += value.toString()
            return acc
        }, '')
    }

    static processTransaction(_transaction: Transaction[], _unspentTxOuts: IUnspentTxOut[], blockHeight: number) {
        try {
            // Transaction.validateBlockTransaction(_transaction, _unspentTxOuts, blockHeight)
            // TODO : UnspentTxOuts Update넣기.

            UnspentTxOut.updateUnspentTxOuts(_transaction, _unspentTxOuts)
        } catch (e) {
            if (e instanceof Error) console.error(e.message)
        }
    }

    static getCoinbaseTransaction(_pubkey: string, _blockHeight: number): Transaction {
        const tx = new Transaction()
        const txIn: TxIn = new TxIn('', _blockHeight)
        const txOut: TxOut = new TxOut(_pubkey, COINBASE_AMOUNT)

        tx.txIns = [txIn]
        tx.txOuts = [txOut]
        tx.hash = this.createTransactionHash(tx)
        return tx
    }

    // Transaction 검증
    static validateBlockTransaction(
        _transactions: Transaction[],
        _unspentTxOuts: IUnspentTxOut[],
        blockHeight: number,
    ) {
        /**
         * TODO :
         * 1. 코인베이스 검사
         * 2. TxIn 검사
         * 3. 코인베이스 제외한 전체 트랜잭션 검사
         */
    }
}
