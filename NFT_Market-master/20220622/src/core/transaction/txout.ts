import { Wallet } from '@core/wallet/wallet'

export class TxOut {
    public account: string
    public amount: number

    constructor(_account: string, _amount: number) {
        this.account = _account
        this.amount = _amount
    }

    // 보내는사람 계정 받는사람 계정  / sum amount
    static createTxOuts(sum: number, _receviedTx: any): TxOut[] {
        // TODO : _receviedTx any타입 변경

        // _receviedTx.amount // 보낼금액
        // _receviedTx.sender // 공개키
        // _receviedTx.received // 계정

        const { sender, received, amount } = _receviedTx
        const senderAccount: string = Wallet.getAccount(sender)

        /**
         *  받는사람 계정 : amount
         *  보내는람 계정 : sum  단 sum-amount 0일경우 보내는사람을 만들면안되여.
         */

        // 받는사람
        const receivedTxOut = new TxOut(received, amount)
        const senderTxOut = new TxOut(senderAccount, sum - amount)

        if (senderTxOut.amount <= 0) return [receivedTxOut]

        return [receivedTxOut, senderTxOut]
    }
}
