const TestClass = require("./class");

describe("Class Test", () => {
  it("private test", () => {
    const test = new TestClass(5);
    //이건 이렇게하면 객체생성
    //test는 결국 객체가 되는것
    //test.value===test["value"]
    expect(typeof test).toBe("object");

    expect(test.value).toBe(50);

    expect(test.add()).toBe(55);
    //이건 클래스로 만든 객체에서 사용하는애 5번째로 사용
    //이건 객체에서 사용하는애임 55랑 55랑 비교
    expect(TestClass.add(1, 2)).toBe(3);
    //이건 클래스 자체로 사용

    test.value = 100;
    expect(test.value).toBe(100);

    test["#privateValue"] = 10; //test.#privateValue
    //왼족에 #privateValue랑 다른것 privatevalue랑 다르다
    //test.#privateValue 으로는 사용할수없음
    expect(test.privateValue).toBe(5);
    //privateValue왼족에있는거랑 같다 get에서가져온것
    // expect(test["#privateValue"]).toBe(5);
    //get은 값을 못바꿈 위에 5가 그대로옴
    test.privateValue = 200; // set사용
    expect(test.privateValue).toBe(200);
  });

  // test["#privateValue"]!=test.#privateValue
});
