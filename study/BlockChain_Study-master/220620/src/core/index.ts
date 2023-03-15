import { Chain } from '@core/blockchain/chain';

export class BlockChain {
    public chain: Chain;

    constructor() {
        this.chain = new Chain();
    }
}
