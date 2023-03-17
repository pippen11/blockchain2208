import { Wallet } from '@core/wallet/wallet'

describe('wallet', () => {
    let wallet: Wallet

    beforeEach(() => {})

    it('Wallet 생성', () => {
        const privKey = Wallet.createPrivateKey()
        wallet = new Wallet(privKey)
        console.log(wallet)
    })
})
