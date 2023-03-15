import { Block } from '@core/blockchain/block';
import { DIFFICULTY_ADJUSTMENT_INTERVAL } from '@core/config';

export class Chain {
    private blockchain: Block[];

    constructor() {
        this.blockchain = [Block.createGENESIS(Block.getGENESIS())];
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

    public addToChain(_receivedBlock: Block): Failable<undefined, string> {
        const isValid = Block.isValidNewBlock(_receivedBlock, this.getLatestBlock());
        if (isValid.isError) return { isError: true, error: isValid.error };

        this.blockchain.push(_receivedBlock);
        return { isError: false, value: undefined };
    }

    // 체인 검증 코드
    public isValidChain(_chain: Block[]): Failable<undefined, string> {
        // ToDo : 제네시스 블록을 검사하는 코드
        // const genesis = _chain[0]

        // ToDo : 나머지 체인에 대한 검증 코드
        for (let i = 1; i < _chain.length; i++) {
            const newBlock = _chain[i];
            const previousBlock = _chain[i - 1];
            const isValid = Block.isValidNewBlock(newBlock, previousBlock);
            if (isValid.isError) return { isError: true, error: isValid.error };
        }
        return { isError: false, value: undefined };
    }

    // 체인 교체 코드
    replaceChain(receivedChain: Block[]): Failable<undefined, string> {
        const latestReceivedBlock: Block = receivedChain[receivedChain.length - 1];
        const latestBlock: Block = this.getLatestBlock();
        if (latestReceivedBlock.height === 0) {
            return { isError: true, error: '받은 최신 블록이 제네시스 블록' };
        }

        if (latestReceivedBlock.height <= latestBlock.height) {
            return { isError: true, error: '자신의 블록이 더 길거나 같습니다.' };
        }

        if (latestReceivedBlock.previousHash === latestBlock.hash) {
            // lenth 차이가 1
            // addToChain() 실행
            return { isError: true, error: '블록이 하나만큼 모자릅니다.' };
        }

        // 체인 바꿔주는 코드 (내 체인이 더 짧다면)
        this.blockchain = receivedChain;

        return { isError: false, value: undefined };
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
