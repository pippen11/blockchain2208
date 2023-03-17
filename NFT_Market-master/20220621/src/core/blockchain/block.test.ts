import { Block } from '@core/blockchain/block'
import { GENESIS } from '@core/config'

describe('Block 검증', () => {
    let newBlock: Block

    it('블록생성', () => {
        const data: ITransaction[] = []
        // newBlock = new Block(genesisBlock, data)
        newBlock = Block.generateBlock(GENESIS, data, GENESIS)
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

    it('블록난이도 가져오기 테스트', () => {
        const data = ['hello world']
    })
})
