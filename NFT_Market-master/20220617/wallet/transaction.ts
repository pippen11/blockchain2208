// 비트코인

interface ITxIn {
    txOutId: string
    txOutIndex: number
    signature: string
}

interface ITxOut {
    address: string
    amount: number
}

interface ITransaction {
    hash: string
    txIns: ITxIn[]
    txOuts: ITxOut[]
}
