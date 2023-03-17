export class Transaction implements ITransaction {
    public hash: string
    public txIns: ITxIn[]
    public txOuts: ITxOut[]

    constructor() {
        this.hash = ''
        this.txIns = []
        this.txOuts = []
    }
}
