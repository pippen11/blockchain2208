import { Block } from '@core/blockchain/block';

describe('Block 검증', () => {
    /*
        어차피 제네시스 블록은 하드코딩한 값이다.
    */

    const genesisBlock: Block = {
        version: '1.0.0',
        height: 0,
        timestamp: new Date().getTime(),
        hash: '0'.repeat(64),
        previousHash: '0'.repeat(64),
        merkleRoot: '0'.repeat(64),
        data: ['Hello Block'],
    };

    it('블록 생성', () => {
        const data = ['Block #2'];
        const newBlock = new Block(genesisBlock);
        console.log(newBlock);
    });
});
