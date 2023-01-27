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
    console.log("addBlock");
    console.log("_data:", _data);
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

  isValidChain(_chain: Array<IBlock>): TResult<undefined, string> {
    // 다른 서버에서 체인 받았을때 정상적인 체인인지 확인하자
    console.log("isValidChain");
    for (let i = 1; i < _chain.length; ++i) {
      //첫번째 블록 마지막 블록까지 확인
      const nowBlock = _chain[i];
      const previousBlock = _chain[i - 1];
      const isValid = Block.isValidBlock(nowBlock, previousBlock);
      // 정상적으로 연결된 블럭인가확인
      if (isValid.isError == true) return isValid;
      //문제가 있는 체인이면 에러를 반환한다
    }
    return { isError: false, value: undefined };
    // 문제가 없는 체임임이 확인됐따
  }

  replaceChain(_chain: Array<IBlock>): TResult<undefined, string> {
    //_chain은 payload의 배열 데이터 값 블록
    console.log("replaceChain");

    const newLastBlock = _chain[_chain.length - 1];
    const lastBlock = this.lastBlock;
    if (newLastBlock.height === 0 && lastBlock.height !== 0) {
      // 제네시스블록
      return { isError: true, msg: "받은 블록이 제네시스 블록이다" };
    }

    if (newLastBlock.height < this.lastBlock.height) {
      //롱기스트 체인 룰, 체인을 적용한다.
      return { isError: true, msg: "내 체인이 더 길다." };
    }
    if (newLastBlock.hash === this.lastBlock.hash) {
      return { isError: true, msg: "동기화 완료" };
    }

    this.chain = _chain;
    // 체인을 덮어씌운거다
    return { isError: false, value: undefined };
  }
}

// module.exports = Chain;
export default Chain;
