import { Block } from '@core/blockchain/block';
import { DIFFICULTY_ADJUSTMENT_INTERVAL } from '@core/config';
import { Transaction } from '@core/transaction/transaction';
import { TxIn } from '@core/transaction/txin';
import { TxOut } from '@core/transaction/txout';
import { UnspentTxOut } from '@core/transaction/unspentTxOut';

export class Chain {
    private blockchain: Block[];
    private unspentTxOuts: IUnspentTxOut[];
    private transactionPool: ITransaction[];

    constructor() {
        this.blockchain = [Block.createGENESIS(Block.getGENESIS())];
        this.unspentTxOuts = [];
        this.transactionPool = [];
    }

    public getUnspentTxOuts(): IUnspentTxOut[] {
        return this.unspentTxOuts;
    }

    public appendUTXO(utxo: IUnspentTxOut[]): void {
        this.unspentTxOuts.push(...utxo);
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

    // 트랜잭션 풀 return
    public getTransactionPool(): ITransaction[] {
        return this.transactionPool;
    }

    // 트랜잭션 풀에 트랜잭션 넣기
    public appendTransactionPool(_transaction: ITransaction): void {
        this.transactionPool.push(_transaction);
    }

    public updateTransactionPool(_newBlock: IBlock) {
        let txPool: ITransaction[] = this.getTransactionPool();

        _newBlock.data.forEach((tx: ITransaction) => {
            txPool = txPool.filter((txp) => {
                txp.hash !== tx.hash;
            });
        });

        this.transactionPool = txPool;
    }

    public miningBlock(_account: string): Failable<Block, string> {
        // ToDo : Transaction 객체 만들어주는 코드
        const txin: ITxIn = new TxIn('', this.getLatestBlock().height + 1);
        const txout: ITxOut = new TxOut(_account, 50);
        const transaction: Transaction = new Transaction([txin], [txout]);
        const utxo = transaction.createUTXO();
        this.appendUTXO(utxo);

        // ToDo : addBlock() 호출
        return this.addBlock([transaction, ...this.getTransactionPool()]);
    }

    public addBlock(data: ITransaction[]): Failable<Block, string> {
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

        // 블록이 생성되었다면 트랜잭션 풀에 있는 트랜잭션 삭제
        // ToDo : 트랜잭션 풀 내용 최신화
        // updateTransactionPool()
        this.updateTransactionPool(newBlock);

        return { isError: false, value: newBlock };
    }

    public addToChain(_receivedBlock: Block): Failable<undefined, string> {
        const isValid = Block.isValidNewBlock(_receivedBlock, this.getLatestBlock());
        if (isValid.isError) return { isError: true, error: isValid.error };

        this.blockchain.push(_receivedBlock);

        // UTXO 업데이트
        _receivedBlock.data.forEach((tx) => {
            this.updateUTXO(tx);
        });

        // 트랜잭션 풀 업데이트
        this.updateTransactionPool(_receivedBlock);

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

        // if (latestReceivedBlock.previousHash === latestBlock.hash) {
        //     // lenth 차이가 1
        //     // addToChain() 실행
        //     return { isError: true, error: '블록이 하나만큼 모자릅니다.' };
        // }

        // 체인 바꿔주는 코드 (내 체인이 더 짧다면)
        this.blockchain = receivedChain;

        // UTXO & 트랜잭션 풀 업데이트
        this.blockchain.forEach((_block: IBlock) => {
            this.updateTransactionPool(_block);
            _block.data.forEach((_tx: ITransaction) => {
                this.updateUTXO(_tx);
            });
        });

        return { isError: false, value: undefined };
    }

    updateUTXO(_tx: ITransaction): void {
        // UnspentTxOuts
        /**
         * {
         *      txOutId
         *      txOutIndex
         *      account
         *      amount
         * }
         */
        const unspentTxOuts: UnspentTxOut[] = this.getUnspentTxOuts();

        // UTXO에 추가할 unspentTxOut 객체 생성
        const newUnspentTxOuts = _tx.txOuts.map((txout, index) => {
            return new UnspentTxOut(_tx.hash, index, txout.account, txout.amount);
        });

        // UTXO에서 사용한 unspentTxOut 객체 제거 & UTXO에 생성된 unspentTxOut 객체 추가
        this.unspentTxOuts = unspentTxOuts
            .filter((_v: UnspentTxOut) => {
                const bool = _tx.txIns.find((v: TxIn) => {
                    return _v.txOutId === v.txOutId && _v.txOutIndex === v.txOutIndex;
                });

                // !undefined == true
                // !{ } == false
                return !bool;
            })
            .concat(newUnspentTxOuts);
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
