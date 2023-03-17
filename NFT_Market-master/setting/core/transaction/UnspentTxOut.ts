import { TxOut } from './TxOut'

export class UnspentTxOut implements IUnspentTxOut {
    public txOutId: string
    public txOutIndex: number
    public address: string
    public amount: number

    constructor(_txOutId: string, _txOutIndex: number, _address: string, _amount: number) {
        this.txOutId = _txOutId
        this.txOutIndex = _txOutIndex
        this.address = _address
        this.amount = _amount
    }

    static findUnspentTxOuts(_addres: string, _unspentTxOuts: UnspentTxOut[]): UnspentTxOut[] {
        // TODO : test 코드 작성해봐야함.
        return _unspentTxOuts.filter((uTxO: UnspentTxOut) => uTxO.address === _addres)
    }

    static findUnspentTxOut(
        _txOutId: string,
        _txOutIndex: number,
        _unspentTxOuts: UnspentTxOut[],
    ): Failable<UnspentTxOut, string> {
        const unspentTxOut = _unspentTxOuts.find(uTxO => uTxO.txOutId === _txOutId && uTxO.txOutIndex === _txOutIndex)
        if (unspentTxOut === undefined) return { isError: true, error: '미사용 트랜잭션을 찾지못했습니다.' }
        return { isError: false, value: unspentTxOut }
    }

    static getAmount(_filter: UnspentTxOut[]) {
        return _filter.map((uTxO: UnspentTxOut) => uTxO.amount).reduce((acc, amount) => acc + amount, 0)
    }

    static newUnspentTxOuts(_transactions: ITransaction[]): UnspentTxOut[] {
        return _transactions
            .map((tx: ITransaction) => {
                return tx.txOuts.map((txOut: TxOut, index: number) => {
                    const address = TxOut.getAddress(txOut)
                    const amount = TxOut.getAmount(txOut)
                    return new UnspentTxOut(tx.hash, index, address, amount)
                })
            })
            .reduce((acc, utxo: UnspentTxOut[]) => acc.concat(utxo), [])
    }

    static consumedTxOuts(_transactions: ITransaction[]): UnspentTxOut[] {
        return _transactions
            .map(tx => tx.txIns)
            .reduce((a, b) => a.concat(b), [])
            .map(txin => new UnspentTxOut(txin.txOutId, txin.txOutIndex, '', 0))
    }

    static updateUnspentTxOuts(_trasnactions: ITransaction[], _unspentTxOuts: UnspentTxOut[]): UnspentTxOut[] {
        const newUnspentTxOuts = UnspentTxOut.newUnspentTxOuts(_trasnactions)
        const consumedTxOuts = UnspentTxOut.consumedTxOuts(_trasnactions)

        return _unspentTxOuts
            .filter(uTxO => UnspentTxOut.findUnspentTxOut(uTxO.txOutId, uTxO.txOutIndex, consumedTxOuts))
            .concat(newUnspentTxOuts)
    }
}
