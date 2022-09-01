let a;
let b;
// 위에두개는 undefied값임
let count = 0;

function c0() {
  count++;
  if (count == 1) {
    a = 0;
    console.log("첫번째 숫자");
  } else if (count == 2) {
    b = 0;
    console.log("두번째숫자");
  }
}

// function button7() {
//   console.log("7");
// }
// function button8() {
//   console.log("8");
// }
// function button9() {
//   console.log("9");
// }
// function buttona() {
//   console.log("*");
// }
// function button4() {
//   console.log("4");
// }
// function button5() {
//   console.log("5");
// }
// function button6() {
//   console.log("6");
// }
// function buttonb() {
//   console.log("-");
// }
// function button1() {
//   console.log("1");
// }
// function button2() {
//   console.log("2");
// }
// function button3() {
//   console.log("3");
// }
// function buttonc() {
//   console.log("+");
// }
// function buttond() {
//   console.log("/");
// }
// function button0() {
//   console.log("5");
// }
// function buttone() {
//   console.log(".");
// }
// function buttonf() {
//   console.log("=");
// }

// function c0() {
//   count++;
//   if (count == 1) {
//     a = 0;
//     console.log(`첫번째 선택한 숫자는 ${a} 입니다.`);
//   } else if (count == 2) {
//     b = 0;
//     console.log(`두번째 선택한 숫자는 ${b} 입니다.`);
//   }
// }

// function c1() {
//   count++;
//   if (count == 1) {
//     a = 1;
//     console.log(`첫번째 선택한 숫자는 ${a} 입니다.`);
//   } else if (count == 2) {
//     b = 1;
//     console.log(`두번째 선택한 숫자는 ${b} 입니다.`);
//   }
// }

function plus() {
  if (count == 2) {
    console.log(a + b);
    alert(a + b);
  }
}
