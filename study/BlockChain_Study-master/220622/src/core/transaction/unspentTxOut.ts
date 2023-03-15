export class UnspentTxOut {
    public txOutId: string; // transaction hash값
    public txOutIndex: number;
    public account: string;
    public amount: number;

    constructor(_txOutId: string, _txOutIndex: number, _account: string, _amount: number) {
        this.txOutId = _txOutId;
        this.txOutIndex = _txOutIndex;
        this.account = _account;
        this.amount = _amount;
    }

    // 필요한 인자값 : 전체 UTXO , 내 계정(account)
    static getMyUnspentTxOuts(_account: string, _unspentTxOuts: UnspentTxOut[]): UnspentTxOut[] {
        return _unspentTxOuts.filter((utxo: UnspentTxOut) => {
            return utxo.account === _account;
        });
    }
}
