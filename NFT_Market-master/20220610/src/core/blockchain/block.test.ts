import { Block } from '@core/blockchain/block'
import { GENESIS } from '@core/config'

describe('Block 검증', () => {
    let newBlock: Block

    it('블록생성', () => {
        const data = ['Block #2']
        // newBlock = new Block(genesisBlock, data)
        newBlock = Block.generateBlock(GENESIS, data)
        const newBlock2 = new Block(newBlock, data)
    })

    it('블록검증 테스트', () => {
        // height: 10 , height: 9
        const isVaildBlock = Block.isValidNewBlock(newBlock, GENESIS)

        if (isVaildBlock.isError) {
            console.error(isVaildBlock.error)
            return expect(true).toBe(false)
        }
        expect(isVaildBlock.isError).toBe(false)
    })
})
