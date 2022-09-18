const divs = document.getElementsByTagName("div");
//const, let , var 명령어로 이름 짓는 것이 변수이다.
//변수의 이름을 정하는것을 선언이라고 한다.
//변수에 데이터(값)을 저장하는것을 정의라고한다.
//선언과 정의를 한번에 하는것을 초기화라 한다.
//const는 재정의가 불가능하기 때문에 초기화를 해야만 한다.
//재정의 불가능한 변수 divs를 선언하여 div라는 TagName(tag)를 html구조 (DOM, document)내에서 검색하여 가져와서 정의한다.
//즉 상수 divs에 div엘리먼트들을 초기화 한다.

[...divs].forEach((elem) => {
  //...(스프레드, 전개 연산자)는 배열 등 데이터의 모음을 풀어서 반환한다.
  // 보통[...***]을 사용하여 유사 배열 ***을 배열로 변환한다.<<해당방법 사용시 직전 코드마지막에 ; (세미클론)이 없으면 한줄(하나의 코드)로 인식되서 오류가 발생하는 경우가 있따.
  //forEach는 배열의 각 아이템을 매개변수함수에 매개변수로 전달하여 함수를 실행한다.
  //elem은 내가 자주사용하는 element의 약어
  elem.onclick = (e) => {
    //onclick은 클릭시 실행되는 이벤트 함수이다.
    console.log(elem.classList.toString());
    //classList는 엘리먼트의 class(클래스)를 관리하는 프로퍼티 객체이다.
    console.log("버블링!");
    //console은 개발자 도구에 출력하기 위한 객체이다.
    //console.log는 개발자 도구에 전달된 매개변수를 단순 출력한다.
    e.stopPropagation();
    //버블링 막는 메서드
    //e.preventDefault();
  };
});
//이상 위의 코드는 버블링 기능 볼수있따
//div가 유사배열
//자식이 클릭이됐을때 부모의 클릭이 같이되는게 버블링?
//버블링은 클릭등 이벤트 함수에 대해서 자식의 이벤트 함수 실행 후 그 부모의 이벤트 함수를 실행하는 것을 말한다.
//캡쳐링은 버블링과 반대로 상위 부모에서부터 자식으로 내려와 이벤트 함수가 실행되는 것을 말한다.
//챕쳐링은 addEventListener를 사용해서 확인할수있다.
// 이벤트 함수 실행시 캡쳐링이 진행후 버블링이 진행된다.<< 해당 내용은 각자 찾아서 해볼것.
hoisting();
console.log(a);
var a = 1;
console.log(a);
//35~37번줄 처럼 선언(초기화)하기 전에 호출해서(가져와서) 사용하는 현상을 호이스팅이라고 한다.
//공식적으로는 hoisting은 var를 사용시 javascript가 최상단에서 미리 선언하는 것을 말한다.
//var, function으로 가능하다.
//hoisting은 좋은 기능이 아니기때문에 사용하지않는것을 권장한다.

// console.log(b);
// let b = 23;
hoisting();

function hoisting() {
  console.log(++a);
}

// expressionHoisting(); 막힘 호이스팅 안됨

let expressionHoisting = function () {
  //함수 표현식을 사용하자
  console.log(++a);
};

expressionHoisting();

// arrowHoisting();
const arrowHoisting = () => {
  console.log(++a);
};
arrowHoisting();

//==========================

// 구조 분배할당
const tempArr = [1, 2, 3, 4, 5];

const [aa, bb, ...cc] = tempArr;

console.log(aa);
console.log(bb);
console.log(cc);
//위는 배열의 구조분해 할당

//아래는 객체의 구조분해할당
const tempObj = {
  aaa: 11,
  bbb: 22,
  ccc: 33,
};
const { aaa, bbb, ccc } = tempObj;
console.log(aaa);
console.log(bbb);
console.log(ccc);
