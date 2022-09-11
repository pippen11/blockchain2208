console.log("이것은 개발자 도구 콘솔창에 로그를 남기는 것이다.");

console.log('1==="1" : ' + (1 === "1"));

// 조건문, if && elseif && else
if (1 < 2) {
  // 만약에 ()안이 참이면 {}코드를 실행한다.
  console.log("1 < 2는 true다");
} else {
  //  if의 ()안에 있는 조건이 거짓이면 해당 코드를 실행한다
  console.log("1 >2 는 false다");
}

if (1 < 2) console.log("1 < 2는 true다");
// if에서 조건이 참이어서 해당 코드가 실행되면 elseif, else등 아래의 코드를 건너뛴다.
// 즉 , 아래코드는 실행하지않는다
else console.log("1 >2 는 false다");
// 위의 if, elself의 조건이 모두 충족되지않았을때 최후의 보루로 실행되는 코드다.
// 한줄의 코드면 {} 없어도된다

// if (1 < 2) console.log("1 < 2는 true다");
// console.log('asdf');
// else console.log("1 >2 는 false다");
// if와 elseif, else는 함께 붙어다녀야한다

// elseif 는 else와 if 합쳐진다
if (1 > 2) {
  console.log("여기 조건이 거짓이면서");
} else if (2 < 3) {
  console.log("여기 조건이 참이면 else if{} 코드가 실행된다.");
} else {
  console.log("위의 if , else if의 모든 조건이 거짓일때 실행된다.");
}

console.log(1 < 2 ? "이건참이야" : "이건 거짓이야.");

// 조건 ? 참일때 : 거짓일때
// 삼항연산자

let test1 = 10;
let test2 = 7;

if (test1 < test2) {
  console.log("꼴을좀보자");
} else {
  console.log("꼴도 보기 싫다.");
}

let com = prompt("넣고싶은값입력");
// const inputData = prompt("넣고 싶은 값을 입력해 보세요.");
//
// inputData 변수임
// switch는 여러 조건을 한번에 확인한다.
//  숫자로의 형변환 ->Number(***) || +*** | parseInt(***) || parseFloat(***)
//  우리의적 NaN
switch (com) {
  // switch의 () 안에 있는 변수의 값을 확인한다

  case "1":
    // case는 () 안에있는 변수의 값이 같은지 확인한다.
    console.log("1을 넣었어.");
    break;
  // break 해당 명령어가 있는 지점에서 코드를 정지한다 없으면 밑에꺼까지 실행
  //  반복문에서 다시하고 , 확실하게 알수있따
  case "2":
    console.log("2을 넣었어.");
    break;
  case "3":
    console.log("3을 넣었어.");
    break;
  case "4":
    console.log("4을 넣었어.");
    break;
  default:
    // if else에서 else와 같은놈이다. 즉 case에서 걸리지않으면 실행되는 마지막 보류이다.
    console.log("1~4만 넣어줘");
}

// switch (input) {
//   case "말":
//     console.log("말이다");
//     a = prompt("말 중 무슨 말이냐 ?");
//     if (a == "얼룩말") {
//       console.log("얼룩말이구나");
//     } else {
//       console.log("?");
//     }
//     break;
//   case "고양이":
//     console.log("고양이다");
//     break;
// }
