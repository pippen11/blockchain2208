const Test = artifacts.require("Test");

contract("Test", (accounts) => {
  console.log(accounts);

  let test;

  describe("Test Contract", () => {
    it("deploy", async () => {
      test = await Test.deployed();
    });

    it("getText", async () => {
      console.log(await test.getText.call());
    });

    it("setText", async () => {
      await test.setText("Hi ! Block7");
      console.log(await test.getText.call());
    });
  });
});

// getText는 마이닝 안해도됨 setText는 값이 바뀌니까 트랜잭션 보내주고 마이닝하니까
// 처리가 더느리다
// 230302/test에서 돌린다 npx truffle test
