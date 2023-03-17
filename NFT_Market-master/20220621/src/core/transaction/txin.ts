export class TxIn {
    public txOutId: string
    public txOutIndex: number // txout 배열 인덱스값 / 코인베이스 블록의 높이로
    public signature?: string

    constructor(_txOutId: string, _txOutIndex: number, _signature: string | undefined = undefined) {
        this.txOutId = _txOutId
        this.txOutIndex = _txOutIndex
        this.signature = _signature
    }
}
