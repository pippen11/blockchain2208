let firstNum = 0;
let secondNum = 0;

// function test1() {}

// addFunc(0, 0);

// function addFunc(firstNum, secondNum) {
//   console.log(firstNum + secondNum);
// }

function addFN() {
  firstNum++;
  //   firstNum를 하나 증가시킨다.
  console.log("firstNum: " + firstNum);
  //   firstNum를 콘솔창에출력한다
}

const addSN = function () {
  secondNum++;
  console.log("secondNum : " + secondNum);
};

const sum = () => {
  console.log(firstNum + secondNum);
};
//이부분부터 다시 공부
function examAddFn(firstNum) {
  // 매개변수는 위에 변수와 다른 변수가 된다.
  //  1번줄에서 선언한 firstNum와 매개변수로 선언된 firstNum는 엄연히 다른놈이다.
  console.log(firstNum);
  firstNum++;
  firstNum += 1;
  firstNum = FirstNum + 1;
  console.log(firstNum);
}

examAddFN();
// 매개변수가 없어 20번째 줄의 firstNum은 undefined

//위에 이해가 잘안되는듯?
