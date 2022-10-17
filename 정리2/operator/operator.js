//1. string concatenation
console.log("my" + "cat");
console.log("1" + 2);
console.log(`string literals:1+2=${1 + 2}`);

console.log("ellie's\n book");

//2.numeric operators
//+,-,/등

//3.++등 increment and decrement operators
let counter = 2;
const preIncrement = ++counter;
//counter= counter+1;
//preIncrement=counter;

console.log(`preIncrement:${preIncrement}`);

const postIncrement = counter++;
//postIncrement=counter;
//counter=counter+1;
console.log(`postIncrement:${postIncrement}, counter: ${counter}`);

//4.assignment operators
let x = 3;
let y = 6;
x += y; //x = x+y
x = +y;
x *= y;
x /= y;

//6.logical operators: ||(or), &&(and), !(not)

const value1 = false;
const value2 = 4 < 2;

// ||(or), finds the first truthy value
console.log(`or:${value1 || value2 || check()}`);
//또는이라 check만 트루여도 트루로 리턴
//or연산자는 처음꺼가 트루면 거기서멈추고 트루로나옴

//&&(and), finds the first falsy value
console.log(`and: ${value1 && value2 && check()}`);
//and는 다 투르가 돼야 투르임 만약 처음게 false면 false다

function check() {
  for (let i = 0; i < 10; i++) {
    console.log();
  }
  return true;
}

//!(not)
console.log(!value1);

//== ===

//object equality by reference
const ellie1 = { name: "ellie" };
const ellie2 = { name: "ellie" };
const ellie3 = ellie1;
console.log(ellie1 == ellie2);
//객체안에 각각 다른 레퍼런스가 저장되있어서 false다
console.log(ellie1 === ellie2);
//똑같은 타입이던아니던 레퍼런스값이달라서 false다

console.log(ellie1 === ellie3);
//이건 똑같은 레퍼런스를 할당했기때문에 같다

//0 , null , empty문자열은 펄스로 간주됨

console.log(0 == false);
console.log(0 === false); //불리언타입이 0이아니라서 false다
console.log("" == false);
console.log("" === false);
console.log(null == undefined);
console.log(null === undefined);

//if , else if , else

const name = "dfr";
if (name === "ellie") {
  console.log("welcome,Ellie");
} else if (name === "coder") {
  console.log("you are amazing coder");
} else {
  console.log("unkwnon");
}

//9.Ternary operator: ?
//condition ? value1 : value2:
console.log(name === "ellie" ? "yes" : "no");

//swich statement
const browser = "IE";
switch (browser) {
  case "IE":
    console.log("go away!");
    break;
  case "chrome":
  case "firefox":
    //같은건 이렇게 묶을수있다
    console.log("love you");
    break;

  default:
    console.log("same all");
    break;
}

//11.loops

let i = 3;
while (i > 0) {
  console.log(`while: ${i}`);
  i--;
}

//do while loop
do {
  console.log(`do while: ${i}`);
  i--;
} while (i > 0);

//do는 먼저실행하고 나중에 조건확인 그래서 위에서 i가 0인값이나옴

//for loop, for(begin; condition; step)
for (i = 3; i > 0; i--) {
  console.log(`for: ${i}`);
}

for (let i = 3; i > 0; i = i - 2) {
  console.log(`${i}`);
}

for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    console.log(`i:${i},j:${j}`);
  }
}

//loop에서 break는 루프를 완전히 끝내는것 continue는 지금껏만 스킵하고 다음껄로넘어감

//1.문제 숫자를 0부터 10까지 오직 짝수만 컨티뉴 이용해서 출력
for (let i = 0; i < 11; i++) {
  if (i % 2 !== 0) {
    continue;
  }
  console.log(`q1.${i}`);
}

//2.문제 숫자 0부터 10까지 인데 8만나면 브레이크사용
for (let i = 0; i < 11; i++) {
  if (i > 8) {
    break;
  }
  console.log(`q2. ${i}`);
}
