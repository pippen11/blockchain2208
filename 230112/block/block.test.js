const Block = require("./block");
const merkle = require("merkle");

describe("block Test", () => {
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
  describe("difficulty check", () => {
    const data = ["a"];
    const block = new Block(data);
    let tempDifficultyOptions;
    // 테스트하려고 변수하나적어줌
    // getDifficulty 호출 시 사용되는 객체 정의 할 변수

    beforeEach(() => {
      // 테스트 할 때마다 코드를 실행하여 tempDifficultyOptions과
      // 블록의 높이를 다시 설정(재정의)한다.
      //테스트하기전 beforEach가 돌아감
      tempDifficultyOptions = {
        previousDifficulty: 9,
        adjustmentDifficulty: 10,
        adjustmentTimestamp: Date.now(),
        DAI: 10,
        averageGenerationTime: 60 * 1000,
        //60초 1분임
      };
      block.height = 30;
    });

    it("높이가 0~9까지 난이도는 0인가", () => {
      for (let i = 0; i < 10; i++) {
        block.height = i; //높이가 0~9까지
        //높이설정하는이유?
        block.getDifficulty(tempDifficultyOptions);
        //getDfficuly함수 호출하면서 tempDifficultyOptions를 넣어줌
        // 진짜 blcok.difficuly의 난이도와 0으로 나오는지 비교
        //난이도를 재설정한다.
        expect(block.difficulty).toBe(0);
        // 그 난이도가 0인가?
      }
    });

    it("높이가 10~19까지 난이도는 1인가", () => {
      for (let i = 10; i < 20; i++) {
        block.height = i; //높이가 10~19까지
        block.getDifficulty(tempDifficultyOptions);
        //난이도를 재설정한다.
        expect(block.difficulty).toBe(1);
        // 그 난이도가 1인가?
      }
    });

    // it("적당히", () => {
    //   block.height = 25;
    //   block.getDifficulty(tempDifficultyOptions);
    //   expect(block.difficulty).toBe(9);
    // });

    it("기준 시간보다 빠르게 생성되었을경우 난이도를 높이는가?", () => {
      // tempDifficultyOptions.adjustmentTimestamp -= 20 * 1000;
      tempDifficultyOptions.adjustmentTimestamp =
        tempDifficultyOptions.adjustmentTimestamp - 20 * 1000;
      // 기준시간이 60초인데 0.5배하면 30초 20초빼면 더 적게걸림
      // 더적게걸리게하려고 현재시간에서 20초뺌 20초전임
      //20초걸렸으니 30초보다 적게걸려서 난이도 +1시킨다
      //이부분이해안됨

      // 20초걸린것
      // 1000으로 나눔
      // 10개전 블록이 20초(20*1000) 전에 생성되었다
      block.getDifficulty(tempDifficultyOptions);
      expect(block.difficulty).toBe(
        tempDifficultyOptions.adjustmentDifficulty + 1
      );
      // 10개전 블록의 난이도에 1이 추가가 되었는가?
    });

    it("기준 시간 허용 범위 이내에 생성 되었을경우 난이도를 유지하는가?", () => {
      tempDifficultyOptions.adjustmentTimestamp -=
        tempDifficultyOptions.averageGenerationTime;
      //10개전시간에서 기준시간만큼뺀다?
      // 10개전 블록이 60초(기준 시간)전에 생성되었다.
      block.getDifficulty(tempDifficultyOptions);
      expect(block.difficulty).toBe(tempDifficultyOptions.adjustmentDifficulty);
      // 10개전 블록의 난이도가 현재 난이도와 같은가?
    });

    it("기준 시간 오래 걸려서 생성 되었을경우 난이도를 유지하는가?", () => {
      // 기준시간 60초 , 50%(0.5)~150%(1.5)
      tempDifficultyOptions.adjustmentTimestamp -= 100 * 1000;
      //10개 전 블록이 100초(100s*1000ms) 전에 생성되었다.
      // 60초의 1.5배면 90초 100초니까 90초보다 더걸려서 난이도 내림

      block.getDifficulty(tempDifficultyOptions);
      expect(block.difficulty).toBe(
        tempDifficultyOptions.adjustmentDifficulty - 1
      );
      // 10개전 블록의 난이도보다 현재 난이도가 1 낮은가?
    });
  });
});
