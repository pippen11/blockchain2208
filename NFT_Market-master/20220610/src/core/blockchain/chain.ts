import { Block } from '@core/blockchain/block'
import { DIFFICULTY_ADJUSTMENT_INTERVAL } from '@core/config'

export class Chain {
    public blockchain: Block[]

    constructor() {
        this.blockchain = [Block.getGENESIS()]
    }

    public getChian(): Block[] {
        return this.blockchain
    }

    public getLength(): number {
        return this.blockchain.length
    }

    public getLatestBlock(): Block {
        return this.blockchain[this.blockchain.length - 1]
    }

    public addBlock(data: string[]): Failable<Block, string> {
        // TODO
        const previousBlock = this.getLatestBlock()
        const newBlock = Block.generateBlock(previousBlock, data)
        const isVaild = Block.isValidNewBlock(newBlock, previousBlock)

        if (isVaild.isError) return { isError: true, error: isVaild.error }

        this.blockchain.push(newBlock)
        return { isError: false, value: newBlock }
    }

    /**
     * 생성기준으로 블럭높이가 -10 짜리 구해오기.
     */
    public getAdjustmentBlock() {
        const currentLength = this.getLength()
        const adjustmentBlock: Block =
            currentLength < DIFFICULTY_ADJUSTMENT_INTERVAL
                ? Block.getGENESIS()
                : this.blockchain[currentLength - DIFFICULTY_ADJUSTMENT_INTERVAL]
        return adjustmentBlock
    }
}
