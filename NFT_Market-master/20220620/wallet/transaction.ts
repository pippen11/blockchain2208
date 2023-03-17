// 비트코인

interface ITxIn {
    txOutId: string
    txOutIndex: number
    signature?: any
}

interface ITxOut {
    address: string
    amount: number
}

interface ITransaction {
    hash: string
    txins: ITxIn[]
    txouts: ITxOut[]
}
