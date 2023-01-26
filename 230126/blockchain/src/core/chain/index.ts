// const Block = require("../block/block");
import Block from "../block/block";

class Chain {
  private chain: Array<IBlock>;
  // chain은 블록의 모임으로 배열이다

  private DIFFICULTY_ADJUSTMENT_INTERVAL: number = 10;
  private BLOCK_GENERATION_INTERVAL: number = 10;

  private TIME_UNIT: number = 60 * 1000;
  // 1*1000은 1초 60*1000 1초 Block generation interval도 1이면 1분
  //보기 편하려고 private로 변경 , 보통 다른 언어에서 private라고 적는다.
  //private는 해당 클래스내에서만 사용할수있기때문에 interface를 따로 사용하지 못한다.
  // -private는 상속도 안된다.

  constructor() {
    // constructor은 그냥 타입안적어줌 오류나서 그럼 any로들어감?
    this.chain = [];
    const genesis: IBlock = new Block([`제네시스 블록 ${new Date()}`]);
    this.chain.push(genesis);
  }

  get getChain(): Array<IBlock> {
    return [...this.chain];
  }

  get lastBlock(): IBlock {
    return this.chain[this.chain.length - 1];
  }

  get config(): IConfig {
    return {
      DAI: this.DIFFICULTY_ADJUSTMENT_INTERVAL,
      averageGenerationTime: this.BLOCK_GENERATION_INTERVAL * this.TIME_UNIT,
    };
  }

  get adjustmentBlock(): IBlock {
    const length: number = this.chain.length;
    const interval: number = length - this.DIFFICULTY_ADJUSTMENT_INTERVAL;
    if (interval < 0) return this.chain[0];
    return this.chain[interval];
  }

  addBlock(_data: Array<string>): IBlock | null {
    // 빈값이 들어올수도 있어서 null 또는 IBlock
    const newBlock: IBlock = new Block(
      _data,
      this.lastBlock,
      this.adjustmentBlock,
      this.config
    );

    return this.add2Chain(newBlock);
  }

  add2Chain(_newBlock: IBlock): IBlock | null {
    const isValid: TResult<IBlock, string> = Block.isValidBlock(
      _newBlock,
      this.lastBlock
    );
    if (isValid.isError) {
      console.error(isValid.msg);
      return null;
    } else {
      console.log(_newBlock);
      this.chain.push(_newBlock);
      return _newBlock;
    }
  }
}

// module.exports = Chain;
export default Chain;
