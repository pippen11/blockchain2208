function sum(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

module.exports = { sum, multiply };
//sum multiply객체로 만든다음 모둘 익스폴트에 넣어줌
//모듈을 외부로 내보낼때 module.exports를 사용한다
//module.exports는 객체형식이다.
