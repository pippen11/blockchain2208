class ParentTestClass {
  #privateValue;

  constructor(value) {
    this.#privateValue = value;
    this.value = value * 10;
  }

  get privateValue() {
    //보통은 private 키를 가져올때 사용한다.
    return this.#privateValue;
  }

  set privateValue(value) {
    this.#privateValue = value;
    //set은 매개변수 필요
  }
  // set을쓰면 privatevalue 변경 하려고

  static add(a, b) {
    //class.test.js에서 TestClass.add(1,2) 13번째줄에서사용
    return a + b;
  }

  add() {
    //class.test.js에서 test.add() 12번째줄에서사용
    return this.#privateValue + this.value;
  }
}
//#붙이면 외부에서는 없는애다

class TestClass extends ParentTestClass {
  constructor(value) {
    super(value);
    // console.log(this.#privateValue);
    //위에껀안됨
    //상속받은건 모든걸 다갖고잇기때문에 정상적으로 test가 진행이됨
  }
}

module.exports = TestClass;
