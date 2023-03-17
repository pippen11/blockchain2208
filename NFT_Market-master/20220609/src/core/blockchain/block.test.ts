import { Block } from '@core/blockchain/block'
describe('Block 검증', () => {
    /**
     * 어차핀 제네시스블럭은 하드코딩한 값이다.
     */
    let genesisBlock: Block = {
        version: '1.0.0',
        height: 0,
        hash: '0'.repeat(64),
        timestamp: 1231006506,
        previousHash: '0'.repeat(64),
        merkleRoot: '0'.repeat(64),
        data: ['Hello Block'],
    }
    
    it('블록생성', () => {
        const data = ['Block #2']
        const newBlock = new Block(genesisBlock)
        console.log(newBlock)
    })
})
