const Block = require("../block/block");
//블록파일에서 블록 클래스 가져옴

class Chain {
  #chain;
  //체인 변수명 지정
  #DIFFICULTY_ADJUSTMENT_INTERVAL = 10;
  //블록 10개당 난이도 설정하게 지정
  #BLOCK_GENERATION_INTERVAL = 1;
  //시간설정 알아보기 편하게 1로 설정
  //  10개만드는데 얼마나 걸릴거냐(보기편할라고)

  #TIME_UNIT = 1 * 1000;
  //시간설정 1초
  //시간의 단위

  constructor() {
    this.#chain = [];
    //private로 chain 빈배열설정
    const genesis = new Block([`제네시스 블록 ${new Date()}`]);
    //'제네시스 블록 + 현재날짜를' 배열에 넣어서 블록생성해서 genesis로 정의
    this.#chain.push(genesis);
    // #chain에 genesis를 push함
  }

  get chain() {
    return [...this.#chain];
    // 원본 데이터 유지되게끔 복사본을 내보냄
  }

  get lastBlock() {
    // lastblock 지정해줘서 내보내는이유
    // 현재블록에서 이전블록의 정보(해시,높이,난이도등)를 알아야하니까 마지막블록 내보냄
    return this.#chain[this.#chain.length - 1];
    // 마지막블록은 체인의 마지막 길이에서 하나뺀걸 내보냄
    // 만약 블록이 10개면 길이는 9 그래서 마지막 블록
  }

  get config() {
    //환경설정 config
    return {
      DAI: this.#DIFFICULTY_ADJUSTMENT_INTERVAL,
      // 블록 10개당 난이도 지정한 값 DAI로 지정
      averageGenerationTime: this.#BLOCK_GENERATION_INTERVAL * this.#TIME_UNIT,
      //블록 10개생성시 걸리는목표 시간 1초
    };
  }

  get adjustmentBlock() {
    //adjustmentblock지정해서 내보내는이유?
    //=>  난이도 지정을 10개마다 했으니까 체인에 추가는 되는데 만약 길이가 -면 말이안되니까 제네시스를 내보냄
    const length = this.#chain.length;
    //체인의 길이를 구함
    const interval = length - this.#DIFFICULTY_ADJUSTMENT_INTERVAL;
    // interval은  체인의 길이에서 블록 10개당 난이도 지정한값을 뺌
    // 최소 체인 길이 1이니까 만약 단위개수가 20이면 interval이 -19
    if (interval < 0) return this.#chain[0];
    // 그값이 0보다 작으면 제네시스 블록을 내보냄
    //인덱스에 -들어갈수없다

    return this.#chain[interval];
    //예를들어 -19번째는 안됨
    // 현재 블록의 10번째 전블록을 내보냄
    // 0보다 작지않으면 그냥 그자체를 내보냄
  }

  addBlock(_data) {
    // 체인에 블록을 추가한다?
    //밑에 블록생성할시에 매개변수들 넣어주는이유?
    const newBlock = new Block(
      //새로운 블록을 블록클래스형태를 써서 만듬
      _data,
      //_data를 매개변수로 넣어주고
      this.lastBlock,
      //위에서만든 lastblock을 넣어주고
      this.adjustmentBlock,
      //위에서만든 체인길이와 10개당 난이도 비교한 블록 넣어줌

      this.config
      // 10개당 난이도 지정한값 DAI와 블록 생성 평균시간 넣어줌
      //결국에 last블록은 이전해시값등 adjustmentblock과 config등은 난이도비교하하려고 새로운 블록에 같이넣어줌
    );

    return this.add2Chain(newBlock);
    // add2chain함수 호출하면서 newBlock으로 만든 블록 넣어줌
  }

  add2Chain(_newBlock) {
    //추가되어지는 블록이 정상인지 확인
    const isValid = Block.isValidBlock(_newBlock, this.lastBlock);
    //추가하기전이라 아직은 현재블록의 이전블록이 lastblock
    // 블록인지 정상인지 클래스 blcok에있는 isvalidBlock호출해서
    // newblcok이랑 lastblock을 넣어줌
    //그래서 newblock은 그대로 매개변수들어가는데
    // last블록은 _previousblock자리로 들어감?
    // 새로운블록과 이전블록 높이+1 비교  같아야함 다르면 idError출력
    // 새로운블록의 이전해시값과  last블록의 해시값비교  같아야함
    // 다르면 에러출력
    // 새로운 블록의 해시와 블록클래스로 새로만드는해시값이 같아야함
    // 다르면 hash오류
    // if (_newBlock.hash !== Block.createHash(_newBlock)) {
    //   return {
    //     isError: true,
    //     msg: "hash 생성중 오류 발생",
    //   };
    // 이부분 비교하는이유? 이게같아야하나?
    if (isValid.isError) {
      // 만약 isvalid의 isError가 잇으면
      console.error(isValid.msg);
      //에러 메세지 띄워줌
      return null;
      //그리고 빈값으로 리턴 (즉 추가안함)
    } else {
      this.#chain.push(_newBlock);
      // 에러가없으면 체인에 새로운블록을 추가함
      return _newBlock;
      //그리고 새로운블록을 리턴 하는게맞나?
    }
  }
}

const chain = new Chain();
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

module.exports = Chain;
//체인클래스 내보냄
