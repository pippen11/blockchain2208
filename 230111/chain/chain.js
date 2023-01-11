const Block = require("../block/block");

class Chain {
  //체인은 배열로 만들거다
  #chain;
  //만들어줄 변수?넣는다?
  //아무데이터 ,정보 등등을 체인에 넣지 못하도록 외부에서의 접근 막기위해 private로 설정

  constructor() {
    this.#chain = [];
    const genesis = new Block([`제네시스 블록 ${new Date()}`]);
    // console.log(new Date());
    this.#chain.push(genesis);
    //new date는 현재시간
  }

  get chain() {
    return [...this.#chain];
    //return this.#chain 으로 내보내면 원본이 훼손되기때문에 복사본을 내보냄
    //새롭게안만들면 데이터가 다른것도 들어올수있음 private로 내보내야 다른데이터가 못들어옴
    //원본으로 그대로 주면 푸쉬가됨
    // 외부에서 #chain 접근 시 새로운 배열을 만들어서 준다 .(반환한다.)
  }
  //   get chain1() {
  //     return [...this.#chain, 1];
  //   }

  get lastBlock() {
    return this.#chain[this.#chain.length - 1];
  }

  addBlock(_data) {
    const newBlock = new Block(_data, this.lastBlock);
    //제네시스 블록만 있을때 체인의 길이는? 1 [제네시스 블록]
    // - 제네시스 블록의 인덱스는? 0
    //- 마지막 블록의 인덱스는 0 < 길이가 1일때 0을 구해야한다
    // 블록 하나를 추가했다 [제네시스 블록 , 하나 추가]
    // -체인의 길이: 2
    // - 제네시스 블록의 인덱스 ? 0
    // -제네시스 블록의 다음 블록의 인덱스는 1
    // -제네시스 블록의 다음 블록의 다음블록의 인덱스 2? << 터진다
    // -마지막 블록의 인덱스는 1 < 길이가 2일때 1을 구해야한다
    // 블록 하나 더 추가 [제네시스블록, 하나 추가 , 하나 더추가]
    // 체인의 길이 3
    // - 제네시스 블록의 인덱스 ? 0
    // -제네시스 블록의 다음 블록의 인덱스는 1
    // -제네시스 블록의 다음 블록의 다음블록의 인덱스 2
    // -마지막 블록의 인덱스는 2 < 길이가 3일때 2을 구해야한다

    //마지막 인덱스에 해당하는 블록을 가져옴
    //이전블록의내용을 this.#chain[this.#chain.length - 1]이  previousBlock
    // const isValid = Block.isValidBlock(newBlock, this.lastBlock);
    // if (isValid.isError) {
    //   console.error(isValid.msg);
    //   return null;
    // } else {
    //   this.#chain.push(newBlock);
    //   return newBlock;
    // }
    return this.add2Chain(newBlock);
  }

  add2Chain(_newBlock) {
    const isValid = Block.isValidBlock(_newBlock, this.lastBlock);
    //여기서의 this.lasBlock이랑 isValidBlock의 _previousBlock이랑 같나?
    if (isValid.isError) {
      console.error(isValid.msg);
      return null;
    } else {
      this.#chain.push(_newBlock);
      return _newBlock;
    }
  }
  //chain=[1,2,3] => 4번 블록을 추가한다.
  // 4번 블록은 3번 블록을 알고있어야한다.(저장하는 키는 previousHash로 값이 들어간다)
  //chain 기준으로 2번 인덱스의 블록<< chain의 길이에서 1을 빼면 마지막 인덱스가 나온다. => 마지막 인덱스에 해당하는 블록을 가져와서 사용한다.)
  //
}

const chain = new Chain();

// console.log(chain.chain);
// const block = new Block(["qwer"]);
// const temp = chain.chain;
//chain.chain할때마다 복사본을 리턴받음
// temp.push("asf");
// console.log(temp);
// console.log(chain.chain);
// console.log(chain.lastBlock);
// lastBlock은 제네시스블록이 맞다
const block = new Block(["qwer"], chain.lastBlock);
// console.log(block);
// //block높이는 1
// console.log("lastBlock", chain.lastBlock);
// console.log(block);
// block.height = 4;
// //이건 강제로 맞춰줌
// //chain으로 객체를 생성한거의 chain값을 찍어줌

chain.addBlock(["asdf"]);
chain.addBlock(["asdf2"]);
chain.addBlock(["asdf3"]);
console.log(chain.chain);
// const block = new Block(["qwer"], chain.lastBlock);
//이렇게하면 문제없다?

// chain.add2Chain(block);

// console.log(chain.chain);
// console.log(chain.chain1);

// const a = [];
// a => 어떤 위치에 [] 이라는 값을 넣었다 .그 어떤 위치의 이름이 a다
//어떤 위치는 메모리, 컴퓨터 상에서 어떤 용량
//둘다 가르키는게 같기때문에 console.log(a)에서도 b랑같다
// const b = a;
// b.push("adfasdf");
// console.log(a);

module.exports = Chain;
