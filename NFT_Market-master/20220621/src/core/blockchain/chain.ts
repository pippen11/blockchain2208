import { Block } from '@core/blockchain/block'
import { DIFFICULTY_ADJUSTMENT_INTERVAL } from '@core/config'
import { Transaction } from '@core/transaction/transaction'
import { TxIn } from '@core/transaction/txin'
import { TxOut } from '@core/transaction/txout'
import { unspentTxOut } from '@core/transaction/unspentTxOut'

export class Chain {
    private blockchain: Block[]
    private unspentTxOuts: unspentTxOut[]

    constructor() {
        this.blockchain = [Block.getGENESIS()]
        this.unspentTxOuts = []
    }

    public getUnspentTxOuts(): unspentTxOut[] {
        return this.unspentTxOuts
    }

    public appendUTXO(utxo: unspentTxOut[]): void {
        this.unspentTxOuts.push(...utxo)
    }

    public getChain(): Block[] {
        return this.blockchain
    }

    public getLength(): number {
        return this.blockchain.length
    }

    public getLatestBlock(): Block {
        return this.blockchain[this.blockchain.length - 1]
    }

    public miningBlock(_account: string): Failable<Block, string> {
        // TODO : Transaction 만들는 코드를넣넣고.

        const txin: ITxIn = new TxIn('', this.getLatestBlock().height + 1)
        const txout: ITxOut = new TxOut(_account, 50)
        const transaction: Transaction = new Transaction([txin], [txout])
        const utxo = transaction.createUTXO()
        this.appendUTXO(utxo)
        // TODO : addBlock
        return this.addBlock([transaction])
    }

    public addBlock(data: ITransaction[]): Failable<Block, string> {
        // TODO : 내가 앞으로 생성할블록의 높이값을 가져올수있는가?
        // 현재높이값, -  block interval = 음수값
        // 난이도를 구해야함.
        // 생성시간을 구하는것.
        const previousBlock = this.getLatestBlock() // 2  3번째블럭에들어갈 Transaction
        const adjustmentBlock: Block = this.getAdjustmentBlock() // -10 Block 구함
        const newBlock = Block.generateBlock(previousBlock, data, adjustmentBlock)
        const isVaild = Block.isValidNewBlock(newBlock, previousBlock)

        if (isVaild.isError) return { isError: true, error: isVaild.error }

        this.blockchain.push(newBlock)
        return { isError: false, value: newBlock }
    }

    public addToChain(_receviedBlock: Block): Failable<undefined, string> {
        const isVaild = Block.isValidNewBlock(_receviedBlock, this.getLatestBlock())
        if (isVaild.isError) return { isError: true, error: isVaild.error }

        this.blockchain.push(_receviedBlock)
        return { isError: false, value: undefined }
    }

    public isValidChain(_chain: Block[]): Failable<undefined, string> {
        // TODO : 제네시스블록을 검사하는 코드가 들어가면 될거같습니다.
        const genesis = _chain[0]

        for (let i = 1; i < _chain.length; i++) {
            const newBlock = _chain[i]
            const previousBlock = _chain[i - 1]
            const isVaild = Block.isValidNewBlock(newBlock, previousBlock)
            if (isVaild.isError) return { isError: true, error: isVaild.error }
        }

        return { isError: false, value: undefined }
    }

    replaceChain(receivedChain: Block[]): Failable<undefined, string> {
        // 내체인과 상대방체인에 대해서 검사하는
        // 1. 받은체인의 최신블록.height === 0 (이새끼 제네시스밖에없음) return
        // 2. 받은체인의 최신블록.height <= 내체인최신블록.height return
        // 3. 받은체인의 최신블록.previousHash === 내체인의 최신블록.hash return

        // 4. 내체인이 더짧다. 다바꾸자.
        const latestReceivedBlock: Block = receivedChain[receivedChain.length - 1]
        const latestBlock: Block = this.getLatestBlock()
        if (latestReceivedBlock.height === 0) {
            return { isError: true, error: '받은 최신블록이 제네시스 블록입니다.' }
        }
        if (latestReceivedBlock.height <= latestBlock.height) {
            return { isError: true, error: '자신의 블록이 길거나 같습니다.' }
        }
        if (latestReceivedBlock.previousHash === latestBlock.hash) {
            // addToChain()
            return { isError: true, error: '블록이 하나만큼 모자릅니다.' }
        }

        // 체인을 바꿔주는 코드를 작성하면됨.
        this.blockchain = receivedChain

        return { isError: false, value: undefined }
    }

    // 체인검증하는

    /**
     * 생성기준으로 블럭높이가 -10 짜리 구해오기.
     */
    public getAdjustmentBlock() {
        const currentLength = this.getLength() // 1
        const adjustmentBlock: Block =
            currentLength < DIFFICULTY_ADJUSTMENT_INTERVAL
                ? Block.getGENESIS()
                : this.blockchain[currentLength - DIFFICULTY_ADJUSTMENT_INTERVAL]
        return adjustmentBlock // 블럭자체를 반환
    }
}
