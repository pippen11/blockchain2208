import { Wallet } from '@core/wallet/wallet'

export class TxIn implements ITxIn {
    public txOutId: string
    public txOutIndex: number
    public signature: string

    constructor(_id: string, _index: number) {
        this.txOutId = _id
        this.txOutIndex = _index
    }

    static signTxIn(_tx: ITransaction, _index: number, _wallet: Wallet, _unspentTxOuts: IUnspentTxOut[]): string {
        // // TODO : unspentTxOuts 처리필요
        // const txin: TxIn = _tx.txIns[_index]

        // const signature: string = Wallet.sign(_wallet.getPrivkey(), _tx.hash)
        return ''
    }

    // 검증코드

    static validTxIn(_transactions: ITransaction[]): Failable<undefined, string> {
        // const txIns: TxIn[] = _transactions.reduce((acc: TxIn[], tx: ITransaction) => {
        //     if (tx.txIns instanceof Array) acc.push(...tx.txIns)
        //     else acc.push(tx.txIns)
        //     return acc
        // }, [])

        // const valid = TxIn.hasDuplicates(txIns)
        // if (valid.isError) throw new Error(valid.error)

        return { isError: false, value: undefined }
    }

    static hasDuplicates(txIns: TxIn[]): Failable<undefined, string> {
        // const groups = txIns.reduce((acc: any, txIn: TxIn) => {
        //     const key = acc[txIn.txOutId + txIn.txOutIndex]
        //     const value = key === undefined ? 1 : key + 1
        //     return acc
        // }, {})

        // const result = new Set<string>(Object.values(groups))
        // if (result.size < 1) return { isError: true, error: '중복된 TxIn이 존재합니다.' }
        return { isError: false, value: undefined }
    }
}
