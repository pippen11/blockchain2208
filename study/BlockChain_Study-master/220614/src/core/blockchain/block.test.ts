import { Block } from '@core/blockchain/block';
import { GENESIS } from '@core/config';

describe('Block 검증', () => {
    /*
        어차피 제네시스 블록은 하드코딩한 값이다.
    */

    let newBlock: Block;

    // it() : 테스트할 최소 단위의 코드를 작성하는 공간.
    it('블록 생성', () => {
        const data = ['Block #2'];
        // newBlock = new Block(genesisBlock, data);
        newBlock = Block.generateBlock(GENESIS, data);

        const newBlock2 = new Block(newBlock, data);
    });

    it('블록 검증 테스트', () => {
        // const isValidBlock = Block.isValidNewBlock(newBlock, genesisBlock);

        // if (isValidBlock.isError) {
        //     console.error(isValidBlock.error);
        //     return expect(true).toBe(false);
        // }
        // expect(isValidBlock.isError).toBe(false);

        try {
            const isValidBlock = Block.isValidNewBlock(newBlock, GENESIS);
            if (isValidBlock.isError) throw new Error(isValidBlock.error);
            console.log(isValidBlock.value);
            expect(isValidBlock.isError).toBe(false);
        } catch (e) {
            if (e instanceof Error) console.error(e.message);
            expect(false).toBe(true);
        }
    });

    // it('1 is 1', () => {
    //     /**
    //      *  원하는 결과값이 나오지 않았을지라도 코드 자체가 문제 없이 실행되었다면 테스트에 통과되었다고 나온다.
    //      *  expect().toBe() 를 사용할 경우 예상한 값과 다른 값이 나올 경우 테스트에 실패했다고 나오게끔 할 수 있다.
    //      */
    //     const a: number = 1;
    //     expect(a).toEqual(2);
    // });
});
