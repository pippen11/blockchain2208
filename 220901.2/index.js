// 함수란 기능을 실행하는 코드에 이름을 지은 것이다.
//  변수가 데이터에 이름을 짓는다.
function test() {
  //function 이름 () {}
  // {} 안에 실행할 코드가 들어갑니다.
  // () 안에는 함수를 사용할때 함수에게 줄정보를 입력합니다. (매개변수)
  console.log("넣고싶은거 아무거나");
}

function test1() {
  console.log("함수를 초기화 합니다.");
  console.log("해당 형식으로 함수를 초기화 하는방식 :함수 선언문");
  // funtion이름 () {} <<함수 선언문이다.
}

let test2 = function () {
  console.log("함수를 초기화 합니다.");
  console.log("해당 형식으로 함수를 초기화 하는방식 :함수 표현식");
  // const/let 이름 + function(){} <<함수표현식이다
};

const test3 = () => {
  console.log("함수를 초기화 합니다.");
  console.log("해당 형식으로 함수를 초기화 하는방식 :화살표 함수");
  // const/let 이름 = () => {}
};

test1();
test2();
test3();
// 함수를 호출합니다. 즉 함수에 있는 코드를 실행합니다.

// 매개변수란, 함수에게 데이터를 전달한다.
// 함수가 사용해야할 데이터를 호출할때 전해준다?

function addFunc(firstNum, secondNum) {
  // firstNumm secondNum가 매개변수다.
  console.log(firstNum + secondNum);
}

addFunc(2, 3);
// 2가 firstNum이고 3이 secondNum

function addFunc2(firstNum, secondNum) {
  return firstNum + secondNum;
  // return , 되돌린다 , 반환값, addFunc2가 끝났을때 함수가 반출하는? 돈려주는? 값이다.
}

let answer = addFunc2(6, 13); /* 더해서 위에서 리턴해서 19 리턴에서끝나버림 */
// const comSel = parseInt(Math.random() * 99 + 1);
// 위에 두줄 방식으로 쓴거 같은거임
console.log(answer);
// addFunc2 함수는 return이 있기때문에 answer 변수에 addFunc2의 return값이 정의된다
// 현재 19가 정의된다.

answer = addFunc(56, 3); /* 리턴값이 없기때문에 undefied가 뜸 */
console.log(answer);
// addFunc 함수는 retrun 이없기때문에 answer 변수에 '정의되지 않았다'를 뜻하는 undefined가 정의된다

console.log(Math.random());
console.log(console.log("asdf"));
// 매개변수로 함수를 넣을수있다 consol.log("asdf") 자체가 매개변수
console.log(console.log(addFunc2(1, 2)));
// 제일 밖에 콘솔로그를 실행했더니 매개변수로 2번째 콘솔로그
// 2번째 콘솔로그를 실행 -> 매개변수로 addFunc2
//  addFunc2 실행 -> retrun 1+2 => 3
// 2번째 콘솔로그가 3을 로그출력
// 2번째 콘솔로그가 retrun값을 첫번째 콘솔로그가 로그로 출력하는데
// 콘솔로그는 return값이 없다 => undefined
// addfun2는 리턴값이 있음

////이부분 질문하기
function sel(num) {
  switch (num) {
    case 1:
      return "검";
      //   요 아래의 consol.log는 출력되지않는다.
      // 이유는 함수는 return이 정해지는 순간 끝난다.
      console.log("검을 선택했어요.");
      break;
    case 2:
      return "활";
      break;
    case 3:
      return "방패";
      break;
    case 4:
      return "도끼";
      break;
    default:
      return false;
  }
  console.log("???");
  // default에서 리턴해서 안나옴
}

let playerSel;
// 플레이어 선택을 받는다, 처음에 선언만 했기때문에 undefined
do {
  playerSel = prompt("무기를 선택하세요.");
  // 플레이어의 선택을 받는다.
  playerSel = sel(parseInt(playerSel)); /* false */
  // sel 함수를 호출하며 위에서 받은 플레이어의 선택을 정수로 바꾸어 전달한다.
  // sel은 받은 정수(매개변수, 플레이서 선택한 수를 )사용해서 값을 반환한다.
  //  sel이 반환한 값을 playerSel에 다시 정의한다.(재정의)
  // 넘버로 봐서 팔세트적음
} while (!playerSel);
// playerSel이 false면 계속 반복한다.
console.log(playerSel);
