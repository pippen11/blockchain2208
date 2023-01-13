const Block = require("../block/block");

class Chain {
  //체인은 배열로 만들거다
  #chain;
  //만들어줄 변수?넣는다?
  //아무데이터 ,정보 등등을 체인에 넣지 못하도록 외부에서의 접근 막기위해 private로 설정
  //난이도를 통해서 문제(퀴즈)를 풀게 되고 문제 해결된 블록을 체인에 추가하게 된다<< 문제 풀이 과정을 마이닝이라고 한다.
  // 왜 문제 풀이를 하는가? 블록의 생성 시간을 조절하기 위해서
  // 결국 난이도는 블록의 생성 시간을 조절하기 위해서 높아졌다가 낮아졌다가 하게된다.
  // 난이도 조절에 대한 조건들을 설정하자
  #DIFFICULTY_ADJUSTMENT_INTERVAL = 10;
  // 난이도 조절을 결정하는 블록의 개수(난이도 조절 단위 개수)
  // 블록이 10개 생성될때마다 난이도를 조절(재정의)한다.
  #BLOCK_GENERATION_INTERVAL = 1;
  // 우리가 시간단위 알기쉽게하기위해 10줌
  //블록 10개당 생성에 걸리는 시간(블록당 생성 시간)
  // 10개는 위에서 설정한수(#DIFFICULTY_ADJUSTMENT_INTERVAL)
  //여기는 시간 단위는 없다.
  // 10개만드는데 10이걸린다 그래서 시간설정을위해 밑에줌
  #TIME_UNIT = 1 * 1000;
  //시간의 기본 단위 설정
  // 60s*1000ms=> 1m(분)

  // 전부 대문자로 변수명을 적는 이유: 얘는 상수다 . 즉 앞으로 절대 변하지 않는 변수 , 상수라고 무조건적으로 모두 대문자로 적을 필요는없다
  // 일반적인 개발자들 사이에서의 관례? 규칙

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
    //chain.length -1이 맞는지? 마지막블록이면 chan.length아닌가?
  }

  get config() {
    // 설정이라서 config라고 지음
    // 난이도 조절 관련 설정들을 한번에 가져가서 사용할수 잇게 묶자.
    return {
      DAI: this.#DIFFICULTY_ADJUSTMENT_INTERVAL,
      //난이도 조절 단위 개수
      averageGenerationTime: this.#BLOCK_GENERATION_INTERVAL * this.#TIME_UNIT,
      // 10개 블록 생성 되는 시간 총 10분
      //위에서 바꿔서 10개만드는데 1초?
    };
  }

  get adjustmentBlock() {
    //체인 내보내는거
    const length = this.#chain.length;
    //현재 체인의 길이
    const interval = length - this.#DIFFICULTY_ADJUSTMENT_INTERVAL;
    // 난이도 조절 단위개수전 index
    if (interval < 0) return this.#chain[0];
    // 1 index에 블록이 추가됐다 => 1이 추가되기전에 체인의 길이는 1
    // => 1 -10 = -9 -> 배열에 -(minus) index는 없다 -> 문제가 생기지 않도록 예외처리
    //제네시스 블록을 내보냄
    return this.#chain[interval];
    // 현재 설정 기준
    // 0 , 1 ,2 3, 4 , 5, 6, 7, 8, 9 10 11
    // 9까지는 제네시스블록만 내보내고 그이후는 하나씩 내보낸다 11이면  그다음꺼내보냄

    //제네시스 블록후 9개의 블록이 추가됐다 << 난이도 0 <<< 체인의 길이가 10이다.
    // 10이 추가될때 난이도를 수정하게 된다. << 1 난이도올라감 엄청많이생성될까봐 - 0 index블록과 비교해야한다 << 10 - 10
    // 10 , 11 ...., 19 << 1
    // ....20
    // 20일때 10 index의 블럭을 보고 블록과 비교해서 난이도를 조절
    // 25일때는 15를 가져와서 비교 10개마다라서 근데 어차피 10개마다 비교해서 비교자체를 안함
  }

  addBlock(_data) {
    const newBlock = new Block(
      _data,
      this.lastBlock,
      this.adjustmentBlock,
      //10개전의 블록의 생성시간과 난이도를 알기위해서
      //이거 addBlock에 추가하는이유? lastblock으로 안됨?
      this.config
    );
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
//테스트용 블록 32개 추가
for (let i = 0; i < 200; i++) {
  chain.addBlock([`test block ${i}`]);
}

// console.log(chain.chain);

// console.log(chain.chain);
// const block = new Block(["qwer"]);
// const temp = chain.chain;
//chain.chain할때마다 복사본을 리턴받음
// temp.push("asf");
// console.log(temp);
// console.log(chain.chain);
// console.log(chain.lastBlock);
// lastBlock은 제네시스블록이 맞다
// const block = new Block(["qwer"], chain.lastBlock);
// console.log(block);
// //block높이는 1
// console.log("lastBlock", chain.lastBlock);
// console.log(block);
// block.height = 4;
// //이건 강제로 맞춰줌
// //chain으로 객체를 생성한거의 chain값을 찍어줌

// console.log(chain.chain);
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
