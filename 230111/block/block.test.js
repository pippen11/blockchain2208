const Block = require("./block");
const merkle = require("merkle");

describe("block Test", () => {
  // it("merkle Test", () => {
  //   //merkleRoot를 확인한다
  //   const data = ["a", "b", "c"];
  //   const block = new Block(data);
  //   const merkleRoot = merkle("sha256").sync(data).root();
  //   expect(block.merkleRoot).toBe(merkleRoot);
  // });
  // it("hash test", () => {
  //   // hash를 확인한다.
  //   const data = ["a", "b", "c"];
  //   const block1 = new Block(data); //block1이 1번블록이고
  //   const block2 = new Block(data, block1); //blcok2가 2번블록이다
  //   // 즉 block1, block2로 연결되어있다.
  //   // const block = new Block(data);
  //   const hash = Block.createHash(block2);
  //   expect(block2.hash).toBe(hash);
  //   //block2.hash와 hash의 timestamp로 만들어주는 시간차이때문에 오류날수있음(70번째줄주석해줌그래서)
  // });
  describe("data가 배열이 아닐 때", () => {
    const data = "a";
    const block = new Block(data);
    //이부분은 배열아닌거넣고있어서 console.error뜬다

    it("merkleRoot가 비어있는가?", () => {
      expect(block.merkleRoot).toBe("");
    });

    //여기서의 hash도 변수
    it("hash가 비어있는가?", () => {
      expect(block.hash).toBe("");
    });
  });

  describe("data가 배열일때", () => {
    const data = ["a"];
    const block = new Block(data);

    it("merkleRoot가 정상인가??", () => {
      const merkleRoot = merkle("sha256").sync(data).root();
      expect(block.merkleRoot).toBe(merkleRoot);
    });

    it("hash와 merkleRoot의 길이가 64인가?", () => {
      expect(block.merkleRoot).toHaveLength(64);
      expect(block.hash).toHaveLength(64);
      //toHaveLength << 길이확인
    });
  });
});
