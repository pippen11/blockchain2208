//테스트 함수들을 실행하는데 묶어서 실행할수 있다.

const { createMerkle, libMerkle } = require("./merkleTree");

// decribe: 테스트의 묶음(그룹을 지어줄수 있다고 보면 된다)
describe("테스트들의 묶음 단위 내용", () => {
  //각각의 테스트들을 여기에 작성해주면 된다.
  //테스트 단위
  it("테스트의 내용", () => {
    console.log("나 처음써봄");
  });
  it("테스트의 내용2", () => {
    console.log("나 처음써봄");
  });
  it("테스트의 내용3", () => {
    console.log("나 처음써봄");
  });
  it("테스트의 내용4", () => {
    //expect 함수로 비교 함수들을 사용할수 있게 해준다.
    // expect의 매개변수로 비교할 값을 넣어주고
    // expect().toBe()의 toBe()매개변수로 앞의 값과 비교할 값을 넣어준다.
    // 단순히 데이터 비교 A와 B를 넣었다고 하면 A===B

    // expect("a").toBe("b");

    //매개변수안에 값이 달라서 터짐
    expect(createMerkle(["asdff"])).toBe(libMerkle(["asdff"]));

    //매개변수안에 배열로해줘야함 그래야 비교가능 함수자체가 그래서
  });
  it("테스트의 내용5", () => {
    expect("1").toBe("1");
  });
});
