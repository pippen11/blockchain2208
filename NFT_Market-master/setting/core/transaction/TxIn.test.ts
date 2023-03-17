import { TxIn } from './TxIn'

describe('TxIn', () => {
    let TxIns: TxIn[] = []

    it('TxIn 생성', () => {
        const txin = new TxIn('hash', 1)
        TxIns.push(txin)
    })
})
