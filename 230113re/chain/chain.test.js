const Chain = require("./chain");
const Block = require("../block/block");

describe("chain test", () => {
  let chain;

  beforeEach(() => {
    chain = new Chain();
    //밑에 코드실행하기전 실행
  });

  describe("addBlock test", () => {
    it("데이터로 블록 추가 확인", () => {
      console.log(chain.chain);
      chain.addBlock(["정상적인 데이터"]);
      // 새로운 블록을 추가?
      // console.log(chain.chain);
      expect(chain.chain).toHaveLength(2);
      // 이건 제네시스블록이랑 정상적인데이터들어간 블록 두개비교?
    });

    it("잘못된 데이터로 블록 추가 확인", () => {
      // console.log(chain.chain);
      chain.addBlock("잘못된 데이터");
      // 배열이 아니라서 처음부터 걸림
      // console.log(chain.chain);
      expect(chain.chain).toHaveLength(1);
      // 블록생성이 안되기때문에 제네시스블록만 잇음 그래서 길이1?
    });
  });

  describe("add2Chain", () => {
    it("블록 생성 후 추가 확인", () => {
      const newBlock = new Block(
        ["asdf"],
        chain.lastBlock,
        chain.adjustmentBlock,
        chain.config
      );
      // 새로운블록에 ["asdf"]랑 chain의 lastblock을 넣어줘서 생성?

      chain.add2Chain(newBlock);
      // 그렇게 넣어준걸 add2chain돌리고 이거하면서 체인추가?
      expect(chain.chain).toHaveLength(2);
      // 새로운블록과 제네시스블록 길이가 2맞는지확인?
    });
    it("잘못된 블록 생성 후 추가 확인", () => {
      const newBlock = new Block(["asdf"]);
      //previousblock없으면 높이가 0으로처리
      // 이것만 넣으면 잘못된 블록생성임?
      chain.add2Chain(newBlock);
      // 잘못된블록을 넣어줌?
      expect(chain.chain).toHaveLength(1);
      //그래서 제네시스블록만있나?
    });
  });

  describe("lastBlock check", () => {
    it("마지막 블록 확인", () => {
      const newBlock = new Block(["qwer"], chain.lastBlock);
      chain.add2Chain(newBlock);
      expect(chain.lastBlock).toEqual(newBlock);
      // 여기서 chain.chain이아니라 lastblock이고 toequal로하는이유?
    });
  });
});
