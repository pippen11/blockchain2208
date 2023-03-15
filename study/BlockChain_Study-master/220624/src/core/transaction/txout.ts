import { Wallet } from '@core/wallet/wallet';

export class TxOut {
    public account: string;
    public amount: number;

    constructor(_account: string, _amount: number) {
        this.account = _account;
        this.amount = _amount;
    }

    // 필요한 인자값 : 보내는사람 계정, 받는사람 계정, sum, amount
    /*
        받는사람 계정, amount
        보내는사람 계정, sum - amount

    */
    static createTxOuts(_sum: number, _receivedTx: any): TxOut[] {
        // ToDo : _receivedTx any 타입 변경
        /*
            _receivedTx.amount; // 보낼금액
            _receivedTx.sender; // 보내는사람 공개키
            _receivedTx.received; // 받는사람 계정
        */

        const { sender, received, amount } = _receivedTx;
        const senderAccount: string = Wallet.getAccount(sender);

        // 받는사람 txOut
        const receivedTxOut = new TxOut(received, amount);
        // 보내는사람 txOut
        const senderTxOut = new TxOut(senderAccount, _sum - amount);

        if (senderTxOut.amount <= 0) return [receivedTxOut];

        return [receivedTxOut, senderTxOut];
    }
}
