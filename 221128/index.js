let a = 1;
let b = 2;
function add() {
  a += b;
  // a는 외부의 값이다 . 그런 a를 수정했기때문에 순수함수가 아니다.
}

function add1(a, b) {
  return a + b;
}
// 순수함수이다.
