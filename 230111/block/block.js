const merkle = require("merkle");
const SHA256 = require("crypto-js").SHA256;

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
}

// const temp=new BlockHeader()
//temp에 constructor실행시킴

class Block extends BlockHeader {
  previousHash;
  hash;
  data;

  constructor(_data, _previousBlock) {
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
      //merkleRoot가 있음 << 정상적인 배열로된 데이터가 입력(전달)되었다
      this.hash = Block.createHash(this);
      //1-8-1
    } else {
      //merkleRoot가 없음 << 배열이 아닌 데이터가 입력(전달)되었다.
      this.hash = "";
      //1-8-2
      //이후 오류 발생 여부 확인용
    }
    this.data = _data;
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
