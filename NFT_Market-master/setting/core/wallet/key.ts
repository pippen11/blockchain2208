import { SHA256 } from 'crypto-js'
import { randomBytes } from 'crypto'
import elliptic from 'elliptic'

const ec = new elliptic.ec('secp256k1')

export class Key {
    static createPrivateKey(): string {
        return randomBytes(32).toString('hex')
    }

    static getKeyPair(_privKey: string): elliptic.ec {
        return ec.keyFromPrivate(_privKey)
    }

    static KeyPairToKey(_keyPair: elliptic.ec): string {
        return _keyPair.getPrivate().encode('hex')
    }

    static getPublicKey(_privKey: string): string {
        const keyPair = this.getKeyPair(_privKey)
        return keyPair.getPublic().encode('hex', true)
    }

    static sign(_privKey: string, _data: string): string {
        const hash = SHA256(_data).toString()
        const keyPair = this.getKeyPair(_privKey)
        return keyPair.sign(hash)
    }

    static verify(_privkey: string, _data: string, _signature: string): boolean {
        const keyPair = this.getKeyPair(_privkey)
        const hash = SHA256(_data).toString()
        const verify: boolean = keyPair.verify(hash, _signature)
        return verify
    }
}
