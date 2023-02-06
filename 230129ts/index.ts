let 이름: string[] = ["kim", "park"];
let 이롬: { name?: string } = { name: "kim" };
//객체는 보통 ?넣어줌 들어올수도있고 안들어올수도있고
let test: string | number = 123;

type Name = string | number;

let 테스트: Name = 1234;

function 함수(x: number): number {
  return x * 2;
}
// 이함수는 파라미터로 number, return 값으로 number

함수(123);

type Member = [Number, boolean];

let john: Member = [123, true];
// 123 true 다써야 오류안남 '123'이런식으로 스트링쓰면 오류

type Memberobject = {
  [key: string]: string;
  // 모든 문자로 들어오는 속성 전부 string으로지정
};
let jone: Memberobject = { name: "kim" };

class User {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
/////////////////////////////////////////////
let car: string = "bmw";

let age: number = 30;

let isAdult: boolean = true;
let a: number[] = [1, 2, 3];
let a2: Array<number> = [1, 2, 3];

let week1: string[] = ["mon", "tue", "wed"];
let week2: Array<string> = ["mon", "tue", "wed"];
//week1처럼 쓰나 week2처럼쓰나 같다

// 튜플(Tuple)

let b: [string, number];

b = ["z", 1];
// b = [1, "z"];
//밑에처럼쓰는건 순서가 안맞아서 안됨

// void , never
function sayHello(): void {
  console.log("hello");
}

function sayHello1(): never {
  throw new Error();
}
//오류를 반환하거나

function sayHello2(): never {
  while (true) {}
}
// 끝나지않는 함수를 반환

// enum

enum Os {
  window = 3,
  Ios,
  Android,
}
// emnum은 수동으로 값을 주지않으면 자동으로 0부터 1씩늘어남

enum myOs {
  window = "win",
  Ios = "ios",
  Android = "and",
}
let mytest: myOs;

// 이렇게 타입을주면

mytest = myOs.window;
//이런식으로 쓸수있음

// null , undefined

let c: null = null;
let d: undefined = undefined;

// interface
let user: object;

user = {
  name: "xx",
  age: 30,
};

// console.log(user.name); 이렇게쓰면 오류가난다

type Score = "A" | "B" | "C" | "F";

interface User {
  name: string;
  age: number;
  gender?: string;
  readonly birthYear: number;
  // readonly로하면 수정불가
  //   [key: number]: string;
  //여러개한번에 적을때 넘버를 키로하고 string을 밸류로값는 여러개값 1:string, 2:string, 3:string, 이렇게안적어도됨
  [key: number]: Score;
  // 이건 위에 "A"또는 "B"등 위에 Score값 이외에는 쓸수없음
}
// gender에 물음표 붙여주면 밑에안써도됨(있어도 없어도되는 프로퍼티)
let users: User = {
  name: "xxx",
  age: 31,
  birthYear: 2000,
  1: "A",
  2: "B",
};

// users.birthYear = 1990;
//이렇게수정가능 하지만 readonly 붙이면 수정불가
// users.age=10; 문제없음
// users.gender="male" 이건오류
// console.log(users.age); 이건 오류안남

interface Add {
  (num1: number, num2: number): number;
}
// 함수의 인자 와 리턴값 타입정의
const add: Add = function (x, y) {
  return x + y;
};

// add(10,20) 됨
// add(10,20,30) 두개가아니라 세개거나(오류)
// add(10,"f") 한개가 스트링이여서 오류

interface isAdult {
  (age: number): boolean;
}

const f: isAdult = (agee): boolean => {
  return agee > 19;
};

// f(33) true임

// implements

interface Car {
  color: string;
  wheels: number;
  start(): void;
}
// 위에 값 다입력해야함 그래야오류안남
class Bmw implements Car {
  color;
  wheels: 4;

  constructor(c: string) {
    this.color = c;
  }
  start() {
    console.log("2");
  }
}

const g = new Bmw("green");

// console.log(g); 찍으면 color에 green이들어감
// g.start()하면 콘솔 2가찍힘

//extends

interface Benz extends Car {
  door: number;
  stosp(): void;
}
// Car타입 가지고있으면서 추가?

// 함수

function testone(num1: number, num2: number): void {
  console.log(num1 + num2);
}

function hello(name?: string) {
  return `heelo, ${name || "world"}`;
}
// ?붙이면 name있어도되고 없어도됨 선택적 매개변수
const result = hello();
const result2 = hello("Sam");
// const result3 = hello(123); 이건숫자라서 안됨

function hello2(name: string, age?: number): string {
  //name앞에 age등 두개 자리가 바뀌면안됨 선택적매개변수는 자리가 같아야함
  if (age != undefined) {
    return `Hello, ${name}. You are ${age}`;
  } else {
    return `Hello, ${name}`;
  }
}
console.log(hello2("Sam"));
console.log(hello2("Sam", 30));

function addd(...nums: number[]) {
  //a매개변수안에 ...세개하면 전달받은 매개변수를 배열로나타낼수있음
  return nums.reduce((result, num) => result + num, 0);
}
addd(1, 2, 3); //6
addd(1, 2, 3, 4, 5, 6, 7, 8, 9, 10); //55

////
interface User {
  name: string;
  age: number;
}

///오버로드 다시보기
// function join(name: string, age: number): User;
// function join(name: string, age: string): string;
// function join(name: string, age: number | string): User | string {
//   if (typeof age === "number") {
//     return {
//       namef,
//       age,
//     };
//   } else {
//     return "나이는 숫자로 입력";
//   }
// }

// const samok: User = join("sam", 30);
