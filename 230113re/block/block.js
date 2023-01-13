const merkle = require("merkle");
//merkle루트 만드는 라이브러리 가져옴
const SHA256 = require("crypto-js").SHA256;
//암호화하는 라이브러리
const hexToBinary = require("hex-to-binary");
// 16진수를 2진수로  바꾸는 라이브러리

class BlockHeader {
  version;
  merkleRoot;
  timestamp;
  height;
  difficulty;
  nonce;

  constructor(_previousBlock, _data) {
    //밑에서 _priviousBlock으로 높이조절 하려고 매개변수 넣어줌? _data넣어서 밑에 머클루트로 돌릴려고 넣어줌?
    this.version = "1.0.0";

    const merkleRoot = this.createMerkleRoot(_data);
    //createmerkleroot함수 밑에 _data넣어줘서 merkleroot로 정의

    if (merkleRoot.isError) {
      // creatmerkleroot함수의 에러가 있으면
      this.merkleRoot = "";
      // 머클루트는 빈값으로 설정
      console.error(merkleRoot.msg);
    } else {
      this.merkleRoot = merkleRoot.value;
      // 에러가 없으면 머클루트값은  //value: merkle("sha256").sync(_data).root() createmerkleroot함수의 value값으로 지정
    }

    this.setTimestamp();
    // settimestamp함수호출

    this.height = _previousBlock ? _previousBlock.height + 1 : 0;
    // 높이는 previousblock이 있으면  이전 블록의 높이 +1하고 이전블록이 없으면 제네시스라 0으로 설정
    this.difficulty = 0;
    //난이도 처음 0
    this.nonce = 0;
    // 논스 처음 0
    //숫자 초기값
  }

  setTimestamp() {
    this.timestamp = Date.now();
    // timestamp는 현재시간으로 설정
  }

  createMerkleRoot(_data) {
    if (!Array.isArray(_data) || !_data.length) {
      //일단 데이터가 배열인지 아닌지 판별함 배열이 아니거나 데이터 길이가없으면
      //밑에꺼 리턴
      return { isError: true, msg: "data가 배열이 아니거나 빈배열" };
      // 에러이면서 빈배열이라고 리턴
    }
    return { isError: false, value: merkle("sha256").sync(_data).root() };
    // 배열이고 데이터가 있으면 데이터가 있으니까 에러가 false고 그값을 merkle로 암호화해서 머클루트로 생성
  }

  //getdifficulty함수가 block header에 있는이유?
  getDifficulty({
    previousDifficulty,
    adjustmentDifficulty,
    adjustmentTimestamp,
    DAI,
    averageGenerationTime,
    //10개당 생성소요시간의 목표치 :1초
  }) {
    if (this.height < DAI) this.difficulty = 0;
    //만약 블록의 높이가 블록10개당 난이도 지정한값보다 작으면 난이도 0 10개당 난이도 설정하니까
    else if (this.height < DAI * 2) this.difficulty = 1;
    // 20개로 비교해서 높이 비교 20개 전까지는 난이도 1
    else if (this.height % DAI !== 0) {
      //만약 높이를 10개당 난이도 로 나눈 나머지가 0이랑 다르다면(0~9에서,21~29)
      this.difficulty = previousDifficulty;
      // 난이도는 이전난이도랑 같게 설정함
    } else {
      const timeToken = this.timestamp - adjustmentTimestamp;
      // 20,30,40,50 시간으로 따짐  현재시간에서 10개전 블록의 시간을 뺌 그게 timetoken
      if (timeToken < averageGenerationTime * 0.9) {
        // timetoken이 10개블록 생성목표시간에 0.9곱하면 0.9초보다 90프로보다 떨어졌을때 덜걸렸을때 난이도올림
        this.difficulty = adjustmentDifficulty + 1;
      } else if (timeToken > averageGenerationTime * 1.1) {
        // timetoken이 평균블록생성시간 보다 오래걸렸으니 난이도 내림 110% 1.1초이상 시간걸리면
        this.difficulty = adjustmentDifficulty - 1;
        //난이도를 하나내림
      } else {
        this.difficulty = adjustmentDifficulty;
        // 내리거나 올리는거 아니면 지금 난이도를 10개전블록의 난이도로 함
        //난이도 유지
      }
    }
  }
}

class Block extends BlockHeader {
  previousHash;
  // previoushash 넣어주는이유?
  hash;
  //현재블록의 id 문제가 있는지없는지 확인하기위한것
  //여기서의 hash는 이전 위에서의 값들이라 hash로 받음?
  data;
  // 입력된 데이터(거래에대한 데이터)

  constructor(_data, _previousBlock, _adjustmentBlock, _config) {
    // _data배열로된 데이터들
    // 위에 매개변수 이것들 받는이유? 안에서 hash를 만들고있어서 받을필요없다
    super(_previousBlock, _data);
    //super _data는 constructor _data받은걸 보낸다
    // 위에서의 blockheaer를 호출 위의constructor 호출
    //부모의 생성자 실행
    // _data배열로된 데이터들
    this.previousHash = _previousBlock ? _previousBlock.hash : "0".repeat(64);
    // 이전 해시값 설정 = 이전블록이잇으면 이전블록의 해시설정 만약 블록이없으면 0 64개로 넣어줌

    //이부분은 예외처리
    if (this.merkleRoot) {
      //만약 머클루트가 있다면
      if (_adjustmentBlock && _config) {
        // adjustmentblock이랑 config가 있다면 예외처리 이걸로 하는이유? 제네시스블록에는 밑에값들이 없어서 터져서 예외처리했따
        this.getDifficulty({
          //난이도 설정 함수 호출
          previousDifficulty: _previousBlock.difficulty,
          //이전 난이도는 이전블록의 난이도
          adjustmentDifficulty: _adjustmentBlock.difficulty,
          // 난이도 매개변수
          adjustmentTimestamp: _adjustmentBlock.timestamp,
          // 시간 매개변수
          DAI: _config.DAI,
          //난이도 단위개수 _adjustmentBlock 이걸 찾아온다
          averageGenerationTime: _config.averageGenerationTime,
          //10개 블록만드는데 걸리는 목표 시간
        });
      }

      this.hash = Block.createHash(this);
      //hash는  블록의 createhash안에  previoushash,hash,data, version;
      // merkleRoot;
      // timestamp;
      // height;
      // difficulty;
      // nonce;
      //를 다넣어줌?
      // 해시를 가지고 2진수로 바꿔서 문제를 푸니까 밑에있어야한다

      if (_adjustmentBlock && _config) {
        //이거 두개만 매개변수 받는이유? 제네시스블록에는 밑에값들이 없어서 터져서 예외처리했따
        this.updateBlock({
          //난이도와 논스(임시값,횟수)를 이용하여 문제풀이
          // 난이도메서드 쓰려고 매개변수 전달
          previousDifficulty: _previousBlock.difficulty,
          // 이전블록의 난이도
          adjustmentDifficulty: _adjustmentBlock.difficulty,
          // 블록10개당이 난이도? 밑에 dai랑 다름?

          adjustmentTimestamp: _adjustmentBlock.timestamp,
          // 블록 10개당의 시간?

          DAI: _config.DAI,
          // 환경설정 블록10개당 난이도 지정한값?
          averageGenerationTime: _config.averageGenerationTime,
          // 평균 생성 블록시간 1초?
        });
      }
    } else {
      this.hash = "";
      // 머클루트가 없으면 해시값을 빈값으로 하는이유? 정상적으로 완성되면 해시값이 있고 완성안되면 해시값없음
    }

    this.data = _data;
    //블록생성할때 받은 데이터
  }

  static createHash(_block) {
    // 위에서 this를 _block의 매개변수로받음
    // static으로 만든이유? 외부에서 쓰기편하게
    let tempStr = "";
    //tmepStr에 넣어줄려고 빈 스트링으로(모든정보 스트링으로 합치기)

    const keys = Object.keys(_block);
    // _block의 전체키를 다가져옴
    for (let i = 0; i < keys.length; i++) {
      // keys의 길이만큼 돌림
      if (keys[i] === "hash" || keys[i] === "data") {
        // 만약 키가 hash 또는 data이면
        continue;
        //밑에코드를 실행하지않고 위로 올림
      }

      tempStr += _block[keys[i]];
      // 전체 블록의 데이터 keys의 블록데이터값을 tempstr에 넣어줌
    }

    return SHA256(tempStr).toString().toUpperCase();
    // hash와 data빼고 나머지값들을 암호화하고 스트링으로바꾸고 대문자로 바꿔서 리턴
  }

  updateBlock(difficultyOptions) {
    // difficultyoptions는 위에 매개변수에서 받은것을 한번에 변수로 받음
    let hashBinary = hexToBinary(this.hash);
    //  해시를 16진수에서 2진수로 만들어줌 sha256(이거자체가 16진수로나옴)하고 암호화하면 객체로나와서 스트링하고 대문자로바꿈 위에return SHA256(tempStr).toString().toUpperCase(); 때문?
    while (!hashBinary.startsWith("0".repeat(this.difficulty))) {
      // hashbinary 2진수로만든것의 제일앞이 난이도만큼 0이반복이 안되면 while문돌림 난이도갯수만큼 0이 반복되면 문제가 풀린거임
      this.nonce += 1;
      // 문제 안풀렸으니 논스값을 올림

      //밑에 시간이랑 난이도 다시 설정하는이유?
      this.setTimestamp();
      //현재블록생성시간 언제풀더라도 그시간을 정해주기위해
      // 항상 문제풀때 생성시간을 넣어줘야 그거로 해시를 다시만듬 안넣어주면 이전 생성시간으로됨 이거 while문밖으로 빼도 문제임 다만들고나서 찍으니까

      this.getDifficulty(difficultyOptions);
      //현재기준 난이도설정으로 매개변수받은걸로 다시설정 난이도 다시 설정하기위해서

      this.hash = Block.createHash(this);
      // 논스+생성시간+ 난이도를 다시설정해서 넣는다
      // 해시도 다시 만들어줌?
      hashBinary = hexToBinary(this.hash);
      //해시를 2진수로 다시바꾸는이유?
    }
  }

  static isValidBlock(_newBlock, _previousBlock) {
    // static으로 한이유? 제대로 된 블록인지검사 _newblock이랑 , lastblock이 preciousblock으로 들어옴
    if (_newBlock.height !== _previousBlock.height + 1) {
      return { isError: true, msg: "높이가 다르다." };
    }
    // 새로운 블록높이와 이전블록의높이+1이 다르면 에러

    if (_newBlock.previousHash !== _previousBlock.hash) {
      // 새로운 블록의 이전해시와 이전블록의 해시가 다르면 에러
      return {
        isError: true,
        msg: "이전블록의 해시와 새로운 블록의 이전hash가 다르다",
      };
    }
    if (_newBlock.hash !== Block.createHash(_newBlock)) {
      // 문제풀고나서의 블록의 hash와 static으로 createhash함수에 문제풀고나서의 블록을 넣어줘서 해시를 생성한거를 두개비교
      return {
        isError: true,
        msg: "hash 생성중 오류 발생",
      };
    }
    return { isError: false, value: _newBlock };
  }
}

const temp = new Block(["asd"]);
// 힙에 저장 메모리할당됨

Block.createHash(temp);
//힙에 저장안하고 쓰려고 static으로씀 메모리에 할당하지않으려고

// const temp =
//   "syarvbskeb2rkbsuaerkbsadkvbrsduaklcrulsebarvklsndarcuyblsaetyvbsakldjnlkuasdhtusaerbvlkuseabvntkljsarnevtuakslebtvkulsaebtvkjlsanervlukysegbavtklubsetv";

// const temp1 =
//   "syarvbskeb2rkbsuaerkbsadkvbrsduaklcrulsebarvklsndarcuyblsaetyvbsakldjnlkuasdhtusaerbvlkuseabvntkljsarnevtuakslebtvkulsaebtvkjlsanervlukysegbavtklubsetv";

// console.log(SHA256(temp).toString());
// console.log(SHA256(temp1).toString());

module.exports = Block;
