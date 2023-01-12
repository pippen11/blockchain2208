const Chain = require("./chain");
const Block = require("../block/block");

// npx jest --verbose ./chain/chain.test.js
// 이것만 돌릴거면 이렇게 js파일만 돌릴거면 node로도 돌림
describe("chain test", () => {
  let chain;

  beforeEach(() => {
    //다른 테스트를 실행하기 전에 실행하는 메서드
    chain = new Chain();
    // 모든 describe돌기전에 이게 돌아서 계속 새로생성
    // 이거 안적으면 계속 추가됨
  });

  describe("addBlock test", () => {
    it("데이터로 블록 추가 확인", () => {
      // it이 시작하기 전에 위에서 설정된 beforeEach가 실행된다

      console.log(chain.chain); // 여기서의 체인은 새로 생성된 체인이다.
      chain.addBlock(["정상적인 데이터"]);
      //["정상적인 데이터"]=> _data로 들어감
      console.log(chain.chain); // addBlock으로 정상적인 데이터가 입력(전달)되어 chain에 추가된다
      expect(chain.chain).toHaveLength(2);
      // 정상적인데이터라 추가돼서 랭스가 2이다
    });

    it("잘못된 데이터로 블록 추가 확인", () => {
      //it이 시작하기 전에 위에서 설정된 beforeEach가 실행된다
      console.log(chain.chain); // 여기서의 체인은 새로 생성된 체인이다
      chain.addBlock("잘못된 데이터");
      //이걸로 들어가면 new Block에서 틀만들어줄때 이미 배열에서 걸림
      console.log(chain.chain); // 잘못된 데이터로인해 chain에 추가되지않는다.
      expect(chain.chain).toHaveLength(1);
      //정상적인 데이터가 추가가안되니까 랭스 1
    });
  });

  describe("add2Chain", () => {
    it("블록 생성 후 추가 확인", () => {
      const newBlock = new Block(["asdf"], chain.lastBlock);
      chain.add2Chain(newBlock);
      expect(chain.chain).toHaveLength(2);
    });
    it("잘못된 블록 생성 후 추가 확인", () => {
      const newBlock = new Block(["asdf"]);
      //라스트블록이없으면 이전블록이없다 즉 제네시스 블록생성
      chain.add2Chain(newBlock);
      expect(chain.chain).toHaveLength(1);
    });
  });

  describe("lastBlock check", () => {
    it("마지막 블록 확인", () => {
      // chain.addBlock(["asdf"]);
      const newBlock = new Block(["qwer"], chain.lastBlock);
      chain.add2Chain(newBlock);
      expect(chain.lastBlock).toEqual(newBlock);
    });
  });
});
