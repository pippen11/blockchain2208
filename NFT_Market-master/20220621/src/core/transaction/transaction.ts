import { SHA256 } from 'crypto-js'
import { TxIn } from './txin'
import { TxOut } from './txout'
import { unspentTxOut } from './unspentTxOut'

export class Transaction {
    public hash: string
    public txIns: TxIn[]
    public txOuts: TxOut[]

    constructor(_txIns: TxIn[], _txOuts: TxOut[]) {
        this.txIns = _txIns
        this.txOuts = _txOuts
        this.hash = this.createTransactionHash()
    }

    createTransactionHash(): string {
        const txoutContent: string = this.txOuts.map((v) => Object.values(v).join('')).join('')
        const txinContent: string = this.txIns.map((v) => Object.values(v).join('')).join('')

        return SHA256(txoutContent + txinContent).toString()
    }

    createUTXO(): unspentTxOut[] {
        return this.txOuts.map((txout: TxOut, index: number) => {
            return new unspentTxOut(this.hash, index, txout.account, txout.amount)
        })
    }
}
