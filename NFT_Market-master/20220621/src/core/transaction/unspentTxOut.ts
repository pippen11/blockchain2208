export class unspentTxOut {
    public txOutId: string // c551502ed39c408f2b56c61195fc5f72fd9ec91dc820675d0fa54218d896b5ad
    public txOutIndex: number // 0
    public account: string // 1d2395f79ba164d2ab2235835b42248fd618b1ff
    public amount: number // 50

    constructor(_txOutId: string, _txOutIndex: number, _account: string, _amount: number) {
        this.txOutId = _txOutId
        this.txOutIndex = _txOutIndex
        this.account = _account
        this.amount = _amount
    }
}
