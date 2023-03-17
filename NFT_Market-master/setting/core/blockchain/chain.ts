import { Block } from '@core/blockchain/block'
import { BLOCK_GENERATION_INTERVAL, DIFFICULTY_ADJUSTMENT_INTERVAL, GENESIS } from '@core/config'
import { MessageType, Message } from '../../@types/p2p'

export class Chain {
    private blockchain: Block[]

    constructor() {
        const GENESIS = Block.generatorGenesis()
        this.blockchain = [GENESIS]
    }

    getChain(): Block[] {
        return this.blockchain
    }

    getLength(): number {
        return this.blockchain.length
    }

    getLatestBlock(): Block {
        return this.blockchain[this.blockchain.length - 1]
    }

    addBlock(data: string[]): Failable<Block, string> {
        const latestBlock: Block = this.getLatestBlock()
        const adjustmentBlock: Block = this.getAdjustmentBlock()
        const newBlock = Block.generateBlock(latestBlock, data, adjustmentBlock)
        const isValid = Block.isValidNewBlock(newBlock, latestBlock)

        if (isValid.isError) return { isError: true, error: isValid.error }
        this.blockchain.push(newBlock)

        return { isError: false, value: newBlock }
    }

    getAdjustmentBlock(): Block {
        const currentLength = this.getLength()
        const adjustmentBlock: Block =
            currentLength < DIFFICULTY_ADJUSTMENT_INTERVAL
                ? GENESIS
                : this.blockchain[currentLength - DIFFICULTY_ADJUSTMENT_INTERVAL]
        return adjustmentBlock
    }

    isValidChain(_chain: Block[]): Failable<undefined, string> {
        // TODO : Invaild genesis block

        for (let i = 1; i < _chain.length; i++) {
            const newBlock = _chain[i]
            const previousBlock = _chain[i - 1]

            const isVaild = Block.isValidNewBlock(newBlock, previousBlock)
            if (isVaild.isError) return { isError: true, error: isVaild.error }
        }

        return { isError: false, value: undefined }
    }

    recivedChain(receivedChain: Block[]): Failable<Message | null, string> {
        const latestReceivedBlock: Block = receivedChain[receivedChain.length - 1]
        const latestBlock: Block = this.getLatestBlock()

        const actions = (type: MessageType, data: any): Message => ({
            type,
            data,
        })

        if (latestReceivedBlock.height < latestBlock.height) {
            return { isError: true, error: '1' }
        }

        if (latestReceivedBlock.previousHash === latestBlock.hash) {
            // TODO broadcast : latest_block
            this.addBlockToChain(latestReceivedBlock)
            const value = actions(MessageType.latest_block, JSON.stringify([latestBlock]))
            return { isError: false, value }
        }

        if (receivedChain.length === 1) {
            // TODO broadcast : response_chain
            const value = actions(MessageType.response_chain, null)
            return { isError: false, value }
        }

        this.replaceChain(receivedChain)
        return { isError: false, value: null }
    }

    addBlockToChain(newBlock: Block): Failable<undefined, string> {
        const isValid = Block.isValidNewBlock(newBlock, this.getLatestBlock())
        if (isValid.isError) throw new Error(isValid.error)

        this.blockchain.push(newBlock)
        return { isError: false, value: undefined }
    }

    replaceChain(_newChain: Block[]): Failable<undefined, string> {
        if (_newChain.length <= this.getLength()) return { isError: true, error: '블록 길이가 맞지않습니다.' }

        const isVaild = this.isValidChain(_newChain)
        if (isVaild.isError) return { isError: true, error: isVaild.error }

        this.blockchain = _newChain
        return { isError: false, value: undefined }
    }
}
