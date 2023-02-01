// const Block = require("../block/block");
import Transaction from "@core/transaction/Transaction";
import TxIn from "@core/transaction/TxIn";
import TxOut from "@core/transaction/TxOut";
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

  private utxos: Array<IUnspentTxOut>;
  // 체인에 utxos를 저장해놓고 가져다쓰자

  constructor() {
    // constructor은 그냥 타입안적어줌 오류나서 그럼 any로들어감?
    this.chain = [];
    const genesis: IBlock = new Block([`제네시스 블록 ${new Date()}`]);
    this.chain.push(genesis);

    this.utxos = [];
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

  get getUtxo(): Array<IUnspentTxOut> {
    return [...this.utxos];
  }
  // 이리로 src의 index.ts
  // app.get("/utxo", (req: Request, res: Response) => {
  //   res.json(ws.getUtxo);
  // });
  //
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
  mineBlock(_address: string) {
    // console.log("address: ", _address);
    //블록이 추가됨으로써 그거에대한 트랜잭션이라 그높이를 가져다쓰겟다
    const txIn: ITxIn = new TxIn("", this.lastBlock.height + 1);
    console.log("txIn: ", txIn);
    // TxIn { txOutId: '', txOutIndex: 1, signature: undefined }
    // txoutId는 "" txoutIndex는 lastBlock.height+1
    // 코인베이스 트랜젝션특징: 마지막블록 높이 +1이 인덱스?
    // 마이닝 한사람의 블록생성한 위치를 알기위해 index로설정
    // ""==txOutId , this.lastBlock.height + 1==txOutIndex
    // signature은 ?라 값이 안들어가도됨
    // 코인베이스 트랜잭션의 특징으로 txOutIndex를 블록의 높의 높이로 정의한다
    const txOut: ITxOut = new TxOut(_address, 50);
    // console.log("txOut :", txOut);
    //TxOut { address: 'test123123', amount: 50 }
    const coinbaseTransaction: Transaction = new Transaction([txIn], [txOut]);
    console.log("coinbaseTransaction: ", coinbaseTransaction);
    const utxo = coinbaseTransaction.createUTXO();
    this.utxos.push(...utxo);

    return this.addBlock([JSON.stringify(coinbaseTransaction)]);
    //문자열로 바꿔줌
  }
}

// module.exports = Chain;
export default Chain;
