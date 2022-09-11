let i = 0;
// 반복할때 i , j , k 이런식으로 변수를 선언한다.
//  i가 뭘까? index 약자 git은 아예 다르게 index라는 용어를 사용한다.
// array[5] = 배열의 6번째 아이템을 가져온다. << 5 index 0부터시작해서

while (i < 10) {
  // while은 반복문의 명령어중하나다.
  //  () 안의 조건이 충족되면 실행된다.
  //  {}안의 코드를 실행한후 ()안의 조건을 확인한다
  console.log("i = " + ++i);
}

// while(true)console.log(new Data())
// 브라우저 멈추고 싶으면 위코드 실행해라

let j = 0;
while (j < 10) {
  console.log("j = " + j++);
  break; /* 한번돌고 브레이크때문에 멈춤 break는 코드를 멈춘다, 즉 반복을 멈추고 다음코드를 실행한다. */
}

while (true) {
  console.log(new Date());
  if (--i < 1) break;
}

let k = 0;

do {
  // do는 while 조건을 확인하기 전에 실행한다.
  //   while은 조건을 먼저확인한다
  console.log("k = " + ++k);
  // k를 출력하고 조건을 확인한다.
} while (k < 10);

// do 를 적는것과 안적는 것의 차이가 무엇인가?
console.log(i);
while (i !== 0) {
  console.log("asdf1");
}
do {
  console.log("asdf2");
} while (i !== 0);
//!==는 다르냐를 묻는건데 i가 0으로 타입까지 같아서 다름




