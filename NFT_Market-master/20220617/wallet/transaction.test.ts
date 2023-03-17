import { Wallet } from './wallet'

interface ITxOut {
    address: string
    amount: number
}

interface ITxIn {
    address: string
    amount: number
    signature?: string
}

interface ITransaction {
    hash: string
    txin: ITxIn
    txouts: ITxOut[]
}

class Transaction implements ITransaction {
    public hash: string
    public txin: ITxIn
    public txouts: ITxOut[]

    constructor(_txin: ITxIn, _txouts: ITxOut[]) {
        this.txin = _txin
        this.txouts = _txouts
        this.hash = this.getTransactionHash()
    }

    public getTransactionHash(): string {
        console.log(this.txin, this.txouts)
        return ''
    }
}

describe('Transaction 검증', () => {
    let myWallet: Wallet = new Wallet()
    let sender: string = '--example_sender--'
    let amount = 5
    let outputs: ITxOut[]
    let inputs: ITxIn
    let transaction: ITransaction

    it('Wallet 가져오기', () => {
        console.log(myWallet)
        myWallet.balance = 50
    })

    it('output 만들기', () => {
        outputs = [
            {
                address: myWallet.publicKey,
                amount: myWallet.balance - amount,
            },
            {
                address: sender,
                amount: amount,
            },
        ]
    })

    it('inputs 만들기', () => {
        inputs = {
            amount: myWallet.balance,
            address: myWallet.publicKey,
        }
    })

    it('transaction 조합하기', () => {
        transaction = {
            hash: '',
            txin: inputs,
            txouts: outputs,
        }
    })
})
