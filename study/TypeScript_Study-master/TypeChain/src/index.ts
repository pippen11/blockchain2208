import crypto from 'crypto'

interface BlockShape {
    hash: string
    prevHash : string  // 이전 해쉬
    height: number  // 블록의 위치를 표시해주는 숫자
    data: string
}

// 블록의 hash값은 prevHash, height, 그리고 data값을 이용해서 계산된다.
// hash는 해당 블록의 고유한 서명과 같다.
// hash값은 결정론적이다. 특정 입력값의 hash는 언제나 같은 결과값이 나온다. 데이터가 변하지 않으면 hash값도 변하지 않는다.
// 블록체인에서는 이러한 방식으로 블록을 보호한다.
// hash값을 이용하면 블록체인의 블록 정보가 수정되지 않았다는 사실을 확인할 수 있다.

class Block implements BlockShape {
    public hash: string
    constructor(
        public prevHash: string,
        public height: number,
        public data: string
    ) {
        this.hash = Block.calculateHash(prevHash, height, data)
    }

    static calculateHash(prevHash: string, height: number, data: string) {
        const toHash = `${prevHash}${height}${data}`
        return crypto.createHash('sha256').update(toHash).digest('hex')
    }
}

class Blockchain {
    private blocks: Block[]
    constructor() {
        this.blocks = []
    }
    private getPrevHash() {
        if (this.blocks.length === 0) return ""
        return this.blocks[this.blocks.length - 1].hash
    }
    public addBlock(data: string) {
        const newBlock = new Block(this.getPrevHash(), this.blocks.length + 1, data)
        this.blocks.push(newBlock)
    }
    public getBlocks() {
        return [...this.blocks]  // blockchain의 state와 연결되지 않게끔 return값 설정
    }
}

const blockchain = new Blockchain()

blockchain.addBlock('First Block')
blockchain.addBlock('Second Block')
blockchain.addBlock('Third Block')
blockchain.addBlock('Fourth Block')

console.log(blockchain.getBlocks())