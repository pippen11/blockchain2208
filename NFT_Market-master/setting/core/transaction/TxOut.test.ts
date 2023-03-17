import { TxOut } from './TxOut'

describe('TxOut', () => {
    let TxOuts: TxOut[] = []
    beforeEach(() => {})

    it('TxOut 생성', () => {
        const txout = new TxOut('01089557722', 50)
        TxOuts.push(txout)
    })

    it('TxOut getAddress', () => {
        const address = TxOut.getAddress(TxOuts[0])
        expect(address).toEqual('01089557722')
    })

    it('TxOut getAmount', () => {
        const amount = TxOut.getAmount(TxOuts[0])
        expect(amount).toEqual(50)
    })
})
