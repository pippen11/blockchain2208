import { Block } from '@core/blockchain/block';
import { DIFFICULTY_ADJUSTMENT_INTERVAL } from '@core/config';

export class Chain {
    public blockchain: Block[];

    constructor() {
        this.blockchain = [Block.getGENESIS()];
    }

    public getChain(): Block[] {
        return this.blockchain;
    }

    public getLength(): number {
        return this.blockchain.length;
    }

    public getLatestBlock(): Block {
        return this.blockchain[this.blockchain.length - 1];
    }

    public addBlock(data: string[]): Failable<Block, string> {
        // ToDo : 앞으로 생성할 블록의 높이값을 가져올 수 있는가?
        /**
         *  1. 현재 높이값 - DIFFICULTY_ADJUSTMENT_INTERVAL < 0 : 제네시스 블록이 나오게끔 한다.
         *  2. 난이도를 구해야 한다.
         *     생성시간이 어느정도 걸렸는지 구해야 한다..
         */
        const previousBlock = this.getLatestBlock();
        const adjustmentBlock: Block = this.getAdjustmentBlock(); // -10번째 블록 구하기
        const newBlock = Block.generateBlock(previousBlock, data, adjustmentBlock);
        const isValid = Block.isValidNewBlock(newBlock, previousBlock);

        if (isValid.isError) return { isError: true, error: isValid.error };

        this.blockchain.push(newBlock);

        return { isError: false, value: newBlock };
    }

    /**
     *  생성 기준으로 블록 높이가 -10 인 블록 구하기
     */
    public getAdjustmentBlock() {
        // ToDo : 블록의 interval을 상수로 정해놓기. (블록 몇 개를 기준으로 난이도를 측정할 것인가)
        // 현재 마지막 블록에서 - 10 (DIFFICULTY_ADJUSTMENT_INTERVAL)
        const currentLength = this.getLength();
        const adjustmentBlock: Block =
            this.getLength() < DIFFICULTY_ADJUSTMENT_INTERVAL
                ? Block.getGENESIS()
                : this.blockchain[currentLength - DIFFICULTY_ADJUSTMENT_INTERVAL];
        return adjustmentBlock; // 블록 자체를 반환
    }
}
