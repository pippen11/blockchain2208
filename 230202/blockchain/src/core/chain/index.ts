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
  // 60 * 1000  10분
  // 1*1000은 1초 60*1000 1초 Block generation interval도 1이면 1분
  //보기 편하려고 private로 변경 , 보통 다른 언어에서 private라고 적는다.
  //private는 해당 클래스내에서만 사용할수있기때문에 interface를 따로 사용하지 못한다.
  // -private는 상속도 안된다.

  private utxos: Array<IUnspentTxOut>;
  // 체인에 utxos를 저장해놓고 가져다쓰자

  constructor() {
    // constructor은 그냥 타입안적어줌 오류나서 그럼 any로들어감?
    // 트랜젝션이 갖고잇는 모든정보를 가져다 hash로 만듬
    this.chain = [];
    const transaction = new Transaction(
      [new TxIn(`제네시스 블록 ${new Date()}`, 0)],
      //  txoutId가 제네시스 날짜 ,txoutindex는 0
      []
      //[]은 txout임
    );
    //   {
    //     "txIns": [
    //         {
    //             "txOutId": "제네시스 블록 Thu Feb 02 2023 09:28:16 GMT+0900 (대한민국 표준시)",
    //             "txOutIndex": 0
    //         }
    //     ],
    //     "txOuts": [],
    //     "hash": "392DD356A949F0F9F658C5B65DD2C276C76A775C2619BF9A623F168EF0CC3429"
    // }
    const genesis: IBlock = new Block([transaction]);
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
  addBlock(_data: Array<ITransaction>): IBlock | null {
    // string에서 transaction으로 타입 바꿔줌 인터페이스도
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
    // input들과 output들과hash 가 트젝으로 만들어짐
    console.log("coinbaseTransaction: ", coinbaseTransaction);
    const utxo = coinbaseTransaction.createUTXO();
    // utxo는 txout의 address, amount, hash가 들어감
    this.utxos.push(...utxo);

    return this.addBlock([coinbaseTransaction]);

    //블록에는 트랜젝션이 들어간다
    //문자열로 바꿔줌
  }
  updateUTXO(_tx: Transaction) {
    console.log("6-34 UTXO 수정 시작");
    const utxos = this.getUtxo;
    const newUTXO = _tx.createUTXO();

    let temp = utxos.filter((item) => {
      //사용한 utxos input으로 들어간거 찾고있음
      const txIn = _tx.txIns.find(
        //find는 값이있으면 !txIn false값을 내보냄 filter로
        // 그값을 빼고 temp에넣는다
        //tx.txIns는 input
        (item1) =>
          item.txOutId === item1.txOutId && item.txOutIndex === item1.txOutIndex
      );
      // 트랜잭션의 txIns에 들어갔다 => input으로 넣어서 사용했다.
      // 그럼 기존의 utxos에서 사용한 utxo들을 빼야한다
      // 그래서 txIns와 utxos를 비교, 검색해서 나오면 filter에서 걸러진다
      //트랜젝션의 id같은게있으면 빼내야함 input으로 들어온거임
      return !txIn;
      // 그 find로 찾아진애를 제외한 나머지를 반환
      // 사용한게아니면 false로내보내줌
    });

    // let temptest = [];
    // for (let i = 0; i < utxos.length; ++i) {
    //   for (let j = 0; j < _tx.txIns.length; ++j) {
    //     if (
    //       utxos[i].txOutId !== _tx.txIns[j].txOutId &&
    //       utxos[i].txOutIndex !== _tx.txIns[j].txOutIndex
    //     )
    //       temp.push(utxos[i]);
    //   }
    // }
    console.log("6-36 수정된 utxo에 새로운 utxo를 추가해서 정의");

    this.utxos = [...temp, ...newUTXO];
  }
}

// module.exports = Chain;
export default Chain;
