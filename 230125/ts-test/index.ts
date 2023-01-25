let num: number = 1234;
let str: string = "1234";
let bool: boolean = true;
let und: undefined = undefined;
let nul: null = null;

//und = 1234  //같은 자료형이라서 에러난다
//TypeScript는 자료형(Type)을 확인하기 때문에 같은 자료형만 변수에 정의할수있다.
num = 4321; // 이건 넘버라된다
// console.log(num.length); //오류 날까? 숫자는 길이없어서난다
console.log(str.length); //오류 날까? 스트링은 길이가 있어서 안남

let any: any = undefined;
any = "1234";
any = 1234;
// any는 모든 자료형을 포함한다
// 그래서 안쓰는것이 좋다.
let unk: unknown = undefined;
unk = "1234";
unk = 1234;

console.log(any.length); // 왜 될까? << 모든 자료형을 포함하고 잇다고 판단하여 각종 메서드,프로퍼티를 모두 사용할수 있따.
// console.log(unk.length); //  왜 안될까? << 자료형을 모른다고 판단하여 각종 메서드,프로퍼티를 사용할수없다

let numUnd: number | undefined = undefined;
numUnd = 1234;
// |를 사용해서 type을 여러개 사용할수있다.
// 앞의것이 아니면 뒤의 것으로 적용된다.

if (typeof unk === "string") {
  //Type을 확인후에 해당 타입에 대한 메서드, 키를 사용할수 있다 .
  console.log(unk.length);
}

let obj: { a: number; b?: string } = { a: 1 };
// ?는 undefined를 포함한다 b는 스트링에 들어가는게 맞지만 undefined도 포함 ? 빼면 오류남 b없어서

obj.b = "1234";

let arr: Array<number> = [1, 2, 3];
// arr.push("asdf");
let arr1: [number, string] = [1, "1"];
// arr1.push(1);
let arr2: string[] = ["1", "a", "b"];
//문자열의 배열 숫자넣으면 에러

//let arr3:Array<any>=[undefined,null,1,"asdf"] 쓰면 안될부분

function funcA(): void {
  //retrun이 없기때문에 void(비어있다) type을 사용한다 .
  console.log("funcA");
}

const funcB = function (): number {
  return 11;
};
// 자료형 따로선언안하면 any로 처리된다.

const funcC = (): string => {
  return "asdf";
};

//함수의 return에 대한 type은 () 뒤에 붙인다.

function sumA(a: number, b: number): number {
  // 매개변수에도 타입을 지정해야한다
  return a + b;
}

console.log(sumA(1, 2));

const sumB = function (numbers: { a: number; b: number }): number {
  return numbers.a + numbers.b;

  //객체 받아서사용
};

const sumcC = ({ a, b }: { a: number; b: number }): number => {
  // ;자체는 type줄때 사용하는 방법
  //
  return a + b;
};

interface INumbers {
  a: number;
  b: number;
}

function sumD({ a, b }: INumbers): number {
  //위에 정의해두고 밑에서 그대로 가져다썼다
  return a + b;
}
//any는 안쓰는게 최대한 좋은거다
