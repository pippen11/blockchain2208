const Block = require("./block");
const merkle = require("merkle");

describe("block Test", () => {
  it("merkle Test", () => {
    //merkleRoot를 확인한다
    const data = ["a", "b", "c"];
    const block = new Block(data);
    const merkleRoot = merkle("sha256").sync(data).root();

    expect(block.merkleRoot).toBe(merkleRoot);
  });

  it("hash test", () => {
    // hash를 확인한다.
    const data = ["a", "b", "c"];
    const block1 = new Block(data); //block1이 1번블록이고
    const block2 = new Block(data, block1); //blcok2가 2번블록이다
    // 즉 block1, block2로 연결되어있다.
    // const block = new Block(data);
    const hash = Block.createHash(block2);

    expect(block2.hash).toBe(hash);
  });
});
