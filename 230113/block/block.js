const merkle = require("merkle");
const SHA256 = require("crypto-js").SHA256;
const hexToBinary = require("hex-to-binary");

//한블록기준으로 블록을 찍어내려는 틀
class BlockHeader {
  version;
  merkleRoot;
  timestamp;
  height;
  difficulty;
  nonce;
  //private 키로 정의(생성)할 경우 키들이 객체에서 보이지 않는다.
  //후에 통신할때 다른 처리를 하려했으나 쉽게 가기위해서 private를 취소하겠다.

  constructor(_previousBlock, _data) {
    //1-3
    this.version = "1.0.0";
    // this.merkleRoot = _data
    //   ? merkle("sha256").sync(_data).root()
    //   : "0".repeat(64);
    const merkleRoot = this.createMerkleRoot(_data);
    //1-5
    // 머클루트 생성 메서드 호출
    if (merkleRoot.isError) {
      this.merkleRoot = "";
      console.error(merkleRoot.msg);
    } else {
      this.merkleRoot = merkleRoot.value;
    }

    this.setTimestamp();
    //이후에 체인에 블록을 연결하는 시점으로 블록생성 시간을 정의하기 위해서 메서드를 만들었다
    //블록이 생성된 시간
    // Date << 클래스 , now<< static으로 정의된 메서드
    this.height = _previousBlock ? _previousBlock.height + 1 : 0;
    this.difficulty = 0;
    this.nonce = 0;
    // 1-6
  }

  //private로 만들어주면 값쓰려면 get써야함

  setTimestamp() {
    this.timestamp = Date.now();
    //밀리초(ms, 0.001s) 기준이다.
  }
  //만들었다

  createMerkleRoot(_data) {
    if (!Array.isArray(_data) || !_data.length) {
      // Array.isArray는 매개변수가 배열인지 확인한다.
      return { isError: true, msg: "data가 배열이 아니거나 빈배열" };
    }
    return { isError: false, value: merkle("sha256").sync(_data).root() };
  }

  getDifficulty({
    previousDifficulty, // 이전 블록의 난이도
    adjustmentDifficulty, // 난이도 조절 단위개수 이전블록의 난이도,
    // 10개 전 블록의 난이도
    adjustmentTimestamp, // 난이도 조절 단위 개수 이전의 블록의 생성기간,
    // 10개전 블록의 생성 시간
    DAI, // 난이도 조절 단위 개수
    averageGenerationTime, // 블록 세대당 생성 시간, 블록 10개당 생성 시간
  }) {
    if (this.height < DAI) this.difficulty = 0;
    // 10개 이전에는 제네시스 블록 생성 시 설정한 난이도(0)으로 설정 (정의) 된다.
    else if (this.height < DAI * 2) this.difficulty = 1;
    // 20개 이전에는 제네시스 블록 생성 시 설정한 난이도보다 하나 더높은 난이도가 설정된다.
    else if (this.height % DAI !== 0) {
      //0~9나 21~29? // 높이가 난이도 조절 단위 개수에 맞지 않을때
      // 이전 블록의 난이도로 설정( 난이도 조절할필요없을때)
      // 10 20 30 이럴때는 난이도 조절들어감
      this.difficulty = previousDifficulty;
    } else {
      const timeToken = this.timestamp - adjustmentTimestamp;
      //말그대로 현재블록에서 10개전의 블록 생성시간
      // 현재블록과 10개전 블록의 생성시간 차이

      // console.log("블록 생성 시간:", this.timestamp);
      // console.log("10개 전 블록 생성 시간:", adjustmentTimestamp);
      // console.log("10개 전 블록과 현재 블록의 생성 시간 차이:", timeToken);
      // console.log("10개당 블록 생성 시간 기준:", averageGenerationTime);
      // 결과값 나오는거 질문

      // 허용범위를 50%로 했는데 이러면 너무커서 줄이자
      // 10%로
      if (timeToken < averageGenerationTime * 0.9) {
        // averageGenerationTime은 10분 0.5곱하면 5분
        //이전 10개 생성 시간이 5분보다 적게 걸렸을때
        //=> 이전 10개 생성 시간이 0.9초보다 적게걸렸을때
        this.difficulty = adjustmentDifficulty + 1;
      } else if (timeToken > averageGenerationTime * 1.1) {
        // 이전 10개 생성 시간이 15분보다 많이 걸렸을때
        // => 이전 10개 생성시간이 1.1초보다 많이걸렸을때
        this.difficulty = adjustmentDifficulty - 1;
        // 난이도를 낮춰서 시간이 덜걸릴수있게 조절한다
      } else {
        this.difficulty = adjustmentDifficulty;
      }
    }
  }
}

// const temp=new BlockHeader()
//temp에 constructor실행시킴

class Block extends BlockHeader {
  previousHash;
  hash;
  data;

  constructor(_data, _previousBlock, _adjustmentBlock, _config) {
    // 1-2
    super(_previousBlock, _data);
    //1-7
    //super는 부모 클래스의 constructor함수를 호출한다(실행) super을 적어줘야 부모꺼 constructor가져와서 실행
    this.previousHash = _previousBlock ? _previousBlock.hash : "0".repeat(64);
    //_previousBlock.hash는 Block에서 매개변수로 받은 _previousBlock의 밑에서의 hash값
    //1-5
    // this.hash =
    //   _data && _previousBlock ? Block.createHash(this) : "0".repeat(64);

    //createHash(this)안에 this는 get으로 내보낸값들 받는다 밑에 static의 _block이랑은다름
    // 위에 부모에서 get으로 내보낸 값도 같이가져옴
    if (this.merkleRoot) {
      //merkleroot가 있어야 정상적인 블록임
      //merkleRoot가 있음 << 정상적인 배열로된 데이터가 입력(전달)되었다
      if (_adjustmentBlock && _config) {
        //예외처리임 이게 undefined면 터진다
        //제네시스 블록 생성시 전달하지 않음으로 예외처리
        this.getDifficulty({
          previousDifficulty: _previousBlock.difficulty,
          adjustmentDifficulty: _adjustmentBlock.difficulty,

          adjustmentTimestamp: _adjustmentBlock.timestamp,

          DAI: _config.DAI,
          averageGenerationTime: _config.averageGenerationTime,
          //constructor매개변수 받아서 값과 키로 넣어줌
        });
      }

      this.hash = Block.createHash(this);
      //1-8-1
      if (_adjustmentBlock && _config) {
        //예외처리임 이게 undefined면 터진다
        //제네시스 블록 생성시 전달하지 않음으로 예외처리
        // 해시를 받아서 문제풀이 함 그게 updateBlock함수가 문제풀이함수이다
        this.updateBlock({
          //밑에서 updateBlock에서 getdifficulty쓰고있어서  값을 그대로 넘겨줌
          // hash생성 후에 문제풀이를 시작한다
          previousDifficulty: _previousBlock.difficulty,
          adjustmentDifficulty: _adjustmentBlock.difficulty,
          //10번째 블록전 난이도

          adjustmentTimestamp: _adjustmentBlock.timestamp,
          //10번째 블록전 생성시간

          DAI: _config.DAI,
          averageGenerationTime: _config.averageGenerationTime,
          //constructor매개변수 받아서 값과 키로 넣어줌
        });
      }
    } else {
      //merkleRoot가 없음 << 배열이 아닌 데이터가 입력(전달)되었다.
      this.hash = "";
      //1-8-2
      //이후 오류 발생 여부 확인용
    }
    this.data = _data;
    // console.log(this);
    //preciousHash와 hash값이 0갯수가 적은이유는 2진수를 16진수로 변환하기때문임
    // 1-9
  }

  //이부분은 블록의암호화임 해시는 그냥 변수 merkleroot hash방식으로 암호화랑 다름
  static createHash(_block) {
    //_block은 Block과 BlockHeader에서받은 this값 전체가 다 포함된다
    //Block class로 만든객체가 _block
    //1-6
    //2-2
    //this가 _block으로 들어간다
    let tempStr = "";
    // 블록의 정보를 임시로 합칠 string

    // _block.setTimestamp();
    //이 과정이 끝나면 체인에 연결하게 된다.

    // tempStr += _block.version;
    // tempStr += _block.merkleRoot;
    // tempStr += _block.timestamp;
    // tempStr += _block.height;
    // tempStr += _block.difficulty;
    // tempStr += _block.nonce;
    // tempStr += _block.previousHash;
    // hash는 현재 만들고 있는 키라서 추가하지 않는다.
    // data는 merkleRoot로 합쳐져 있기 때문에 merkleRoot로 대체한다.
    const keys = Object.keys(_block);
    // console.log(keys[1]);
    //Object.keys => 객체의 키들을 배열로 가져온다 (반환한다)
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] === "hash" || keys[i] === "data") {
        //여기서의 data는 merkleroot에 있어서 뺀다 hash도 hash생성이라뺀다
        continue;
        // for , while 같은 반복문에서 아래의 코드를 실행하지 않고 위로 올라간다
        // i가 0일때 continue 시 아래의 코드를 실행하지 않고 위로올라가 i++부터 실행하게된다(건너뛴다)
      }
      tempStr += _block[keys[i]];
    }

    return SHA256(tempStr).toString().toUpperCase();
    //하나의 블록을 암호화?

    //2-3
  }

  updateBlock(difficultyOptions) {
    //난이도와 논스를 사용해서 문제를 푼다
    // 여기서의 문제는 difficulty 알고리즘 이라고 한다.
    // difficulty 알고리즘은
    // -2진수로 변화하여 앞의 0이 개수와 difficulty와 비교하여 difficulty보다 0의 개수가 많으면 문제를 해결한것이다
    // -Block의 암호화된 hash는 64자의 16진수 수로 이루어져있다
    // -hash를 2진수로 바꾸고 2진수의 수의 제일 앞에서부터 연속되는 0의개수가 difficulty보다 크면 해결한 것이고
    // 아니면 해결하지 못한것으로 처리한다.
    // -hash == AAAA => 1010 1010 1010 1010 => difficulty가 0이면 "0"이 0개있으면 해결이다 즉 , 현재는 해결이다
    // difficulty가 1이면 "0"이 1개 있으면 해결이다 즉 , 현재는 해결하지 못했다 .
    // / -hash == 1AAA => 0001 1010 1010 1010 => difficulty가 0이면 "0"이 0개있으면 해결이다 즉 , 현재는 해결이다
    // difficulty가 1이면 "0"이 1개 있으면 해결이다 즉 , 현재는 해결이다  그 갯수 이상만 나오면 됨
    // 16진수 3 =>  10진수 3 -> 2진수 0011
    // 16진수 A => 10진수 10 => 2진수 1010
    // 16진수 F => 10진수 15 => 2진수 1111

    //이부분 잘 이해안됨
    // difficulty == 1 => 2진수에서 0으로 시작 => 16진수 9보다 작으면 된다.
    // 16진수의 8은 2진수의 1000이고 그보다 작은 0111 즉 7이하의 수면 가능하다
    // difficulty ==2 => hash의 첫 자리가 몇 이하면 될까 ? 3 이하면 된다
    // 0011 => 3 => 16진수에서도 3 (0011,0010,0001,0000)

    let hashBinary = hexToBinary(this.hash);
    //현재 hash를 2진수로 변환한다
    while (!hashBinary.startsWith("0".repeat(this.difficulty))) {
      //난이도만큼 0이얼마나있는지 확인해서 아닐때까지 돌림
      //startsWith는 string의 메서드로 시작하는 문장(string)를 확인해준다.
      this.nonce += 1;
      //논스가 바뀌면 timestamp 와 난이도가 같아도 데이터가 바껴서 hash가 다른값이 나옴
      //hash가 변경될수있도록 nonce를 증가시킨다
      this.setTimestamp();
      //hash가 만들어준 시점으로 다시잡음
      //블록 생성 시간은 chain에 추가되는 시간이기 때문에 문제 풀이 시점을 생성 시간으로 재설정(재정의)한다.
      this.getDifficulty(difficultyOptions);
      //시간이 다시 설정됐기 때문에 기준 시간과 비교하여 난이도를 재설정(재정의)한다.
      // {
      //   previousDifficulty, // 이전 블록의 난이도
      //   adjustmentDifficulty, // 난이도 조절 단위개수 이전블록의 난이도,
      //   // 10개 전 블록의 난이도
      //   adjustmentTimestamp, // 난이도 조절 단위 개수 이전의 블록의 생성기간,
      //   // 10개전 블록의 생성 시간
      //   DAI, // 난이도 조절 단위 개수
      //   averageGenerationTime, // 블록 세대당 생성 시간, 블록 10개당 생성 시간
      // } 이것들 한번에 받아옴 변수로
      //
      // -difficultyOptions 라는 변수로 넣은이유는 updateBlock 메서드 또한 매개변수로 해당 정보를 받아와야하기 때문이다.
      this.hash = Block.createHash(this);
      // 변경된 값에 따라서 hash를 다시 설정하고
      hashBinary = hexToBinary(this.hash);
      // 2진수로 바꾸어 while의 조건문(문제조건)에 해당하지 않는지 확인한다.
      // -while의 조건문이 부정이기 때문에 해당하지 않으면 문제 해결이다
    }
    // console.log(hashBinary);
    // console.log(hashBinary.slice(0, this.difficulty));
    //처음부터 난이도만큼
    // console.log("---------------------------");
  }

  static isValidBlock(_newBlock, _previousBlock) {
    //생성된 블록이 정상인지 확인해보자.
    if (_newBlock.height !== _previousBlock.height + 1) {
      return { isError: true, msg: "높이가 다르다." };
    }
    if (_newBlock.previousHash !== _previousBlock.hash) {
      return {
        isError: true,
        msg: "이전블록의 해시와 새로운 블록의 이전hash가 다르다",
      };
    }
    if (_newBlock.hash !== Block.createHash(_newBlock)) {
      return {
        isError: true,
        msg: "hash 생성중 오류 발생",
      };
    }
    return { isError: false, value: _newBlock };
  }
}

const temp = new Block(["asd"]);
// console.log(temp);
//()안에 []배열로 넣어야하고 []자체가 data
//1-1 틀만듬
//1-10

Block.createHash(temp);

//2-1

// const temp =new Block([1,2,3])

module.exports = Block;

// node block/block.js로 실행
