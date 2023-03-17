import { UnspentTxOut } from '@core/transaction/UnspentTxOut'
import { Key } from '@core/wallet/key'
import elliptic from 'elliptic'

export class Wallet extends Key {
    public publicKey: string
    public keyPair: elliptic.ec
    public balance: number

    constructor(_privKey: string = '', _unspentTxOuts: UnspentTxOut[] = []) {
        super()

        const privkey = _privKey === '' ? Key.createPrivateKey() : _privKey
        this.keyPair = Key.getKeyPair(privkey)
        this.publicKey = Key.getPublicKey(privkey)
        this.balance = this.getBalance(this.publicKey, _unspentTxOuts)
    }

    public getBalance(_address: string, _unspentTxOuts: UnspentTxOut[]): number {
        // TODO : 나중에 체이닝으로 해보자..
        const utxo = UnspentTxOut
        return utxo.getAmount(utxo.findUnspentTxOuts(_address, _unspentTxOuts))
    }

    public getPrivkey(): string {
        return Key.KeyPairToKey(this.keyPair)
    }

    public findTxOutsForAmount(_amount: number, _myUnspentTxOuts: UnspentTxOut[]): Failable<any, string> {
        let currentAmount: number = 0
        const includedUnspentTxOuts: UnspentTxOut[] = []
        for (const myUnspentTxOut of _myUnspentTxOuts) {
            includedUnspentTxOuts.push(myUnspentTxOut)
            currentAmount += myUnspentTxOut.amount
            if (currentAmount >= _amount) {
                return {
                    isError: false,
                    value: {
                        includedUnspentTxOuts,
                        leftOverAmount: currentAmount - _amount,
                    },
                }
            }
        }

        return {
            isError: true,
            error: `사용가능한 미사용 트랜잭션 출력에서 트랜잭션을 사용할수 없습니다.`,
        }
    }
}
