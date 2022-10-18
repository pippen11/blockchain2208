//module.exports={}<<ESS
//export{}<<ES6

function sum(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

const objTest = {
  sum,
  multiply,
  testNum: 1,
  testNum2: 2,
};

const { testNum, testNum2 } = objTest;
//구조분해할당
//객체 내의 프로퍼티를 변수로 초기화한다.
console.log(testNum, testNum2);
// 1 2찍힘

export default objTest;
//이건 이름 그대로 가져옴

export function minus(a, b) {
  return a - b;
}

export { sum, multiply };
//구조할당분해로만 가져올수있다

//export || export default
//export는 {} 안으로 들어간다
// export default는 외부로 내보낼 때 이거 하나를 내보낸다.
