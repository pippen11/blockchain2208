import { Chain } from './blockchain/chain'
import { UnspentTxOut } from './transaction/UnspentTxOut'
import { Wallet } from './wallet/wallet'

export class BlockChain {
    public chain: Chain
    // public unspentTxOuts: UnspentTxOut[]
    public wallet: Wallet

    constructor() {
        this.chain = new Chain()
        // this.unspentTxOuts = UnspentTxOut.newUnspentTxOuts(this.chain.getChain()[0].data)
        this.wallet = new Wallet()
    }

    getWallet(_privKey: string) {
        this.wallet = new Wallet(_privKey)
    }
}
