import { randomBytes } from 'crypto'
import elliptic from 'elliptic'
import fs, { existsSync } from 'fs'
import path from 'path'

const ec = new elliptic.ec('secp256k1')

export class Wallet {
    public account: string
    public privateKey: string
    public publicKey: string
    public balance: number

    constructor() {
        this.privateKey = this.getPrivateKey()
        this.publicKey = this.getPublicKey()
        this.account = this.getAccount()
        this.balance = this.getBalance()
    }

    public sign(data: string): elliptic.ec.Signature {
        const keyPair = this.getKeyPair()
        return keyPair.sign(data, 'hex')
    }

    public rawTransaction(): void {}
    public newtransaction(): void {}

    private getKeyPair(): elliptic.ec.KeyPair {
        return ec.keyFromPrivate(this.privateKey)
    }

    private getPrivateKey(): string {
        return randomBytes(32).toString('hex')
    }

    private getPublicKey(): string {
        const keyPair = this.getKeyPair()
        return keyPair.getPublic().encode('hex', true)
    }

    private getAccount(): string {
        return Buffer.from(this.publicKey).slice(26).toString()
    }

    private accountToAddress(): string {
        return ''
    }

    private getBalance(account: string = this.account): number {
        // TODO : blockchain 네트워크 구성후 처리가능
        // TODO : account to address
        return 0
    }
}
