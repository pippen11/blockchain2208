declare interface ITxOut {
    address: string
    amount: number
}

declare interface ITxIn {
    txOutId: string
    txOutIndex: number
    signature: string
}

declare interface ITransaction {
    hash: string
    txIns: ITxIn[]
    txOuts: ITxOut[]
}
declare interface IUnspentTxOut {
    txOutId: string
    txOutIndex: number
    address: string
    amount: number
}
