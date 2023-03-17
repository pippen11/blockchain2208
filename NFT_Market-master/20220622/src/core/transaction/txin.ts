export class TxIn {
    public txOutId: string
    public txOutIndex: number // txout 배열 인덱스값 / 코인베이스 블록의 높이로
    public signature?: string

    constructor(_txOutId: string, _txOutIndex: number, _signature: string | undefined = undefined) {
        this.txOutId = _txOutId
        this.txOutIndex = _txOutIndex
        this.signature = _signature
    }

    static createTxIns(_receviedTx: any, myUTXO: IUnspentTxOut[]) {
        let sum = 0
        let txins: TxIn[] = []
        for (let i = 0; i < myUTXO.length; i++) {
            const { txOutId, txOutIndex, amount } = myUTXO[i]
            const item: TxIn = new TxIn(txOutId, txOutIndex, _receviedTx.signature)
            txins.push(item)

            sum += amount
            if (sum >= _receviedTx.amount) return { sum, txins }
        }

        return { sum, txins }
    }
}
