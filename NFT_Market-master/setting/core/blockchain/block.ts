import { SHA256 } from 'crypto-js'
import Merkle from 'merkle'
import { BlockHeader } from '@core/blockchain/blockHeader'
import hexToBinary from 'hex-to-binary'
import { BLOCK_GENERATION_INTERVAL, DIFFICULTY_ADJUSTMENT_INTERVAL, GENESIS } from '@core/config'

export class Block extends BlockHeader implements IBlock {
    public hash: string
    public data: string[]
    public merkleRoot: string
    public difficulty: number
    public nonce: number
    constructor(_previousBlock: Block, _data: string[] = [], _adjustmentBlock: Block = _previousBlock) {
        super(_previousBlock)
        const merkleRoot = Block.getMerkleRoot<String>(_data)
        const difficulty = Block.getDifficulty(this, _adjustmentBlock)
        this.difficulty = difficulty
        this.nonce = _previousBlock.nonce
        this.hash = Block.createBlockHash(this, merkleRoot)
        this.merkleRoot = merkleRoot
        this.data = _data
    }

    static generatorGenesis(): Block {
        return GENESIS
    }

    static getMerkleRoot<T>(_data: T[]): string {
        const merkleTree = Merkle('sha256').sync(_data)
        return merkleTree.root() || '0'.repeat(64)
    }

    static createBlockHash({ data, hash, ...rest }: Block, _merkleRoot: string = ''): string {
        const values = Object.values(rest).sort().join('') + _merkleRoot
        return SHA256(values).toString()
    }

    static generateBlock(_previousBlock: Block, data: string[], _adjustmentBlock: Block = _previousBlock): Block {
        console.log(_previousBlock, _adjustmentBlock)
        const generateBlock = new Block(_previousBlock, data, _adjustmentBlock)
        const newBlock = Block.findBlock(generateBlock)
        const isValid = Block.isValidNewBlock(newBlock, _previousBlock)
        if (isValid.isError) throw new Error(isValid.error)
        return newBlock
    }

    static findBlock(_generateBlock: Block): Block {
        let nonce = _generateBlock.nonce
        let hasBinary: string, hash: string
        const requirePrefix: string = '0'.repeat(_generateBlock.difficulty)

        do {
            nonce++
            _generateBlock.nonce = nonce
            hash = Block.createBlockHash(_generateBlock)
            hasBinary = hexToBinary(hash)
        } while (!hasBinary.startsWith(requirePrefix))

        _generateBlock.hash = hash

        return _generateBlock
    }

    static getDifficulty(_newBlock: Block, _adjustmentBlock: Block): number {
        if (_newBlock.height === 0) return 0
        if (_newBlock.height === _adjustmentBlock.height) return _adjustmentBlock.difficulty
        if (_newBlock.height % DIFFICULTY_ADJUSTMENT_INTERVAL !== 0) return _adjustmentBlock.difficulty

        const timeExpected: number = BLOCK_GENERATION_INTERVAL * DIFFICULTY_ADJUSTMENT_INTERVAL
        const timeTaken: number = _adjustmentBlock.timestamp - _newBlock.timestamp

        if (timeTaken < timeExpected / 2) return _adjustmentBlock.difficulty + 1
        else if (timeTaken > timeExpected * 2) return _adjustmentBlock.difficulty - 1
        return _adjustmentBlock.difficulty
    }

    static isValidNewBlock(_newBlock: Block, _previousBlock: Block): Failable<undefined, string> {
        if (_previousBlock.height + 1 !== _newBlock.height) return { isError: true, error: '블록높이가 맞지않습니다.' }
        else if (_previousBlock.hash !== _newBlock.previousHash)
            return { isError: true, error: '블록 해시가 맞지않습니다.' }
        else if (Block.createBlockHash(_newBlock) !== _newBlock.hash)
            return { isError: true, error: '블록해시가 옳바르지 않습니다.' }

        return { isError: false, value: undefined }
    }
}
