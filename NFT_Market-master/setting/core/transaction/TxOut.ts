export class TxOut implements ITxOut {
    [address: string]: number

    constructor(_address: string, _amount: number) {
        this[_address] = _amount
    }

    public static getAddress(output: TxOut): string {
        const [address] = TxOut.destructuring(output)
        return address
    }

    public static getAmount(output: TxOut): number {
        const [, amount] = TxOut.destructuring(output)
        return amount
    }

    private static destructuring(output: TxOut): [string, number] {
        const [[address, amount]] = Object.entries(output)
        return [address, amount]
    }
}
