const Chain = require("./chain");
const Block = require("../block/block");

describe("chain test", () => {
  let chain;

  beforeEach(() => {
    chain = new Chain();
  });

  describe("addBlock test", () => {
    it("데이터로 블록 추가 확인", () => {
      console.log(chain.chain);
      chain.addBlock(["정상적인 데이터"]);

      console.log(chain.chain);
      expect(chain.chain).toHaveLength(2);
    });

    it("잘못된 데이터로 블록 추가 확인", () => {
      console.log(chain.chain);
      chain.addBlock("잘못된 데이터");

      console.log(chain.chain);
      expect(chain.chain).toHaveLength(1);
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

      chain.add2Chain(newBlock);
      expect(chain.chain).toHaveLength(1);
    });
  });

  describe("lastBlock check", () => {
    it("마지막 블록 확인", () => {
      const newBlock = new Block(["qwer"], chain.lastBlock);
      chain.add2Chain(newBlock);
      expect(chain.lastBlock).toEqual(newBlock);
    });
  });
});
