import { SHA256 } from 'crypto-js'
import { Key } from './key'

export class Wallet {
    public publicKey: string
    public account: string
    public balance: number
    public signature: string

    constructor(_sender: string, _signature: string) {
        this.publicKey = _sender
        this.signature = _signature
        this.account = this.getAccount()
        this.balance = 0
    }

    public getAccount(): string {
        return Buffer.from(this.publicKey).slice(26).toString()
    }

    public getVerify(_received: string, _amount: number): boolean {
        const data: string = [this.publicKey, _received, _amount].join('')
        return Key.verify(_received, data, this.signature)
    }
}
