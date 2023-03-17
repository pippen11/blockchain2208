import { SHA256 } from 'crypto-js'
import merkle from 'merkle'
import { BlockHeader } from './blockHeader'
import { GENESIS } from '@core/config'
/**
 * 객체를 만들기 위함.
 * constructor() 객체 만들려고
 * this = {
 *  version : 'asdfasf'
 *  hash : 'asdfasdfasdfasf',
 *  merkleRoot.:'asdfasdf',
 *  data : ['asdf','asdfasdf','asfdasdf']
 * }
 */
export class Block extends BlockHeader implements IBlock {
    public hash: string
    public merkleRoot: string
    public nonce: number
    public difficulty: number
    public data: string[]

    constructor(_previousBlock: Block, _data: string[]) {
        super(_previousBlock)

        const merkleRoot = Block.getMerkleRoot(_data)

        this.merkleRoot = merkleRoot
        this.hash = Block.createBlockHash(this)
        this.nonce = 0
        this.difficulty = 0
        this.data = _data
    }

    public static getGENESIS(): Block {
        return GENESIS
    }

    public static getMerkleRoot<T>(_data: T[]): string {
        const merkleTree = merkle('sha256').sync(_data)
        return merkleTree.root() || '0'.repeat(64)
    }

    public static createBlockHash(_block: Block): string {
        const { version, timestamp, merkleRoot, previousHash, height } = _block
        const values: string = `${version}${timestamp}${merkleRoot}${previousHash}${height}`
        return SHA256(values).toString()
    }

    public static generateBlock(_previousBlock: Block, _data: string[]): Block {
        const generateBlock = new Block(_previousBlock, _data)
        // TODO : newBlock은 마이닝이 완료된 블럭
        const newBlock = Block.findBlock(generateBlock)
        return newBlock
    }

    public static findBlock(_generateBlock: Block): Block {
        // TODO : 마이닝 작업 코드를 넣어야함.
        return _generateBlock
    }

    static isValidNewBlock(_newBlock: Block, _previousBlock: Block): Failable<Block, string> {
        if (_previousBlock.height + 1 !== _newBlock.height) return { isError: true, error: '블록높이가 맞지않습니다.' }
        if (_previousBlock.hash !== _newBlock.previousHash)
            return { isError: true, error: '이전해시값이 맞지 않습니다.' }
        if (Block.createBlockHash(_newBlock) !== _newBlock.hash)
            return { isError: true, error: '블록해시가 옳바르지 않습니다.' }

        return { isError: false, value: _newBlock }
    }
}

/**
 * data
 */
