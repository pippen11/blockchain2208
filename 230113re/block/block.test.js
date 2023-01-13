const Block = require("./block");
const merkle = require("merkle");
const hexToBinary = require("hex-to-binary");

describe("block Test", () => {
  describe("data가 배열이 아닐 때", () => {
    const data = "a";
    const block = new Block(data);
    //배열이아닌 데이터를넣어줘서 블록을 만들어줌

    it("merkleRoot가 비어있는가?", () => {
      expect(block.merkleRoot).toBe("");
      // 배열이아닐때는 merkleroot가 생성안되니 비어잇는지 확인
    });

    it("hash가 비어있는가?", () => {
      expect(block.hash).toBe("");
      //해시가 비어있는지 확인
    });
  });

  describe("data가 배열일때", () => {
    const data = ["a"];
    const block = new Block(data);

    it("merkleRoot가 정상인가??", () => {
      const merkleRoot = merkle("sha256").sync(data).root();
      expect(block.merkleRoot).toBe(merkleRoot);
      // 블록의 merkle루트와 여기서만든 merkle루트를 둘이 비교 제대로 block의 merkleroot가 만들어졌는지
    });

    it("hash와 merkleRoot의 길이가 64인가?", () => {
      expect(block.merkleRoot).toHaveLength(64);

      expect(block.hash).toHaveLength(64);
      //toHaveLength << 길이확인
    });
  });
  describe("difficulty check", () => {
    const data = ["a"];
    const block = new Block(data);
    let tempDifficultyOptions;
    //테스트하려고 변수정해주고 그변수 test하기전 설정
    beforeEach(() => {
      tempDifficultyOptions = {
        previousDifficulty: 9,
        // 이전 난이도 9
        adjustmentDifficulty: 10,
        // 10개전블록의 난이도 10
        adjustmentTimestamp: Date.now(),
        // 10개전 블록의 생성 시간
        DAI: 10,
        // 난이도 조절단위개수 10
        averageGenerationTime: 60 * 1000,
        // 10개블록의생성목표시간 1분
      };
      block.height = 30;
    });

    it("높이가 0~9까지 난이도는 0인가", () => {
      for (let i = 0; i < 10; i++) {
        block.height = i;
        //높이 0~9까지
        // 높이는 블록객체의 높이로 들어간다
        block.getDifficulty(tempDifficultyOptions);
        // 높이가 0~9로 다른값 포함해서 들어감
        // 9까지는 dai설정해준 10보다 작기때문에
        // 블록의 난이도가 0으로빠진다
        // 블록의 getdifficulty 함수에 설정해준값을 매개변수로 보내줌

        expect(block.difficulty).toBe(0);
      }
    });

    it("높이가 10~19까지 난이도는 1인가", () => {
      for (let i = 10; i < 20; i++) {
        block.height = i;
        // 높이는 10부터 19까지
        block.getDifficulty(tempDifficultyOptions);
        //높이가 10부터 19까지라서 20보다 작으니 난이도 1이랑비교
        expect(block.difficulty).toBe(1);
      }
    });

    it("기준 시간보다 빠르게 생성되었을경우 난이도를 높이는가?", () => {
      tempDifficultyOptions.adjustmentTimestamp =
        tempDifficultyOptions.adjustmentTimestamp - 20 * 1000;
      //10개전 블록의 생성시간은 지금보다 20초전 20초걸렸다
      // 54초이상(1분*90%)이나와야하는데 20초밖에안걸림

      block.getDifficulty(tempDifficultyOptions);
      expect(block.difficulty).toBe(
        //기존블록의 난이도와 뒤에꺼비교
        tempDifficultyOptions.adjustmentDifficulty + 1
        // 10개전 블록의 난이도에서 1이추가가됐다?
        //근데 위에서 설정해준 난이도랑 안맞는거같음?
      );
    });

    it("기준 시간 허용 범위 이내에 생성 되었을경우 난이도를 유지하는가?", () => {
      tempDifficultyOptions.adjustmentTimestamp -=
        tempDifficultyOptions.averageGenerationTime;
      //10개전블록의생성시간에서 10개블록의생성목표시간 1분을뺌
      // 약 1분

      block.getDifficulty(tempDifficultyOptions);
      expect(block.difficulty).toBe(tempDifficultyOptions.adjustmentDifficulty);
      // 블록난이도와 10개전블록생성 난이도(10?)이랑비교
    });

    it("기준 시간 오래 걸려서 생성 되었을경우 난이도를 유지하는가?", () => {
      tempDifficultyOptions.adjustmentTimestamp -= 100 * 1000;
      // 10개전블록의 생성시간이 현재시간의 100초전
      //
      block.getDifficulty(tempDifficultyOptions);
      // 110퍼니까 66초보다 더걸림
      expect(block.difficulty).toBe(
        tempDifficultyOptions.adjustmentDifficulty - 1
        // 난이도 9?
      );
    });
  });

  describe("updateBlock", () => {
    const previousBlock = new Block(["이전 블록"]);
    previousBlock.height = 29;
    // 이전블록 높이 29 현재블록 높이 30
    previousBlock.difficulty = 10;

    const adjustmentBlock = new Block(["단위 개수 전 블록"]);
    adjustmentBlock.height = 20;

    adjustmentBlock.difficulty = 11;
    //10개전블록의난이도 설정

    it("난이도에 따라 문제 풀이가 정상적으로 작동했는가?", () => {
      const newBlock = new Block(["asdf"], previousBlock, adjustmentBlock, {
        DAI: 10,
        averageGenerationTime: 60 * 1000,
      });
      // constructor에 들어가는값?
      expect(
        hexToBinary(newBlock.hash).startsWith("0".repeat(newBlock.difficulty))
        // newblock hash를 2진수로바꿔서 newblock의 난이도만큼의 0이 앞에서부터 반복되는지 확인
      ).toBe(true);
    });
  });
});
