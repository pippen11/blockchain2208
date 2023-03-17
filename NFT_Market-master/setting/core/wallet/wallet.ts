import { Key } from '@core/wallet/key'

export class Wallet extends Key {
    public publicKey: string
    public account: string
    public balance: number

    constructor(_sender: string) {
        super()
        this.publicKey = _sender
        this.account = this.getAccount()
        this.balance = 0
    }

    public getAccount(): string {
        return Buffer.from(this.publicKey).slice(26).toString()
    }
}
