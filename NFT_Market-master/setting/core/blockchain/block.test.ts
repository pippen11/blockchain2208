import { Block } from '@core/blockchain/block'

describe('Block 테스트', () => {
    let genesisBlock: Block
    let block: Block
    beforeEach(() => {
        genesisBlock = {
            version: '1.0.0',
            height: 0,
            hash: '0'.repeat(64),
            previousHash: '0'.repeat(64),
            merkleRoot: '0'.repeat(64),
            timestamp: 1231006506,
            difficulty: 0,
            nonce: 0,
            data: ['Hello world'],
        }
    })

    it('블록만들어보기', () => {
        const data = ['Block #2']
        block = Block.generateBlock(genesisBlock, data)
        console.log(block)
    })

    it('블록 검증 테스트', () => {
        try {
            const result = Block.isValidNewBlock(block, genesisBlock)
            expect(result.isError).toBe(false)
        } catch (e) {
            if (e instanceof Error) console.log(e.message)
        }
    })
})
