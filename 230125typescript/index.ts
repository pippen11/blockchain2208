let a = "sdf";
let b: boolean = false;

const player = {
  name: "nico",
};

// player.name=1

let c: number[] = [1];
let d: string[] = ["i1"];
let e: boolean = true;
let f = [1, 2]; // 이렇게해줘도 배열의 숫자number인지 알고있음

type Age = number;
type Name = string;
type Player = {
  readonly name: Name;
  age?: Age;
};
//readonly는 수정못하게막는다?

const Nico: Player = {
  name: "nico",
};
//위에처럼적어도되고 밑에처럼 적어도됨
//age안적어줄꺼면 ?적어줘야 에러안남 number나 undifiend임

const Lynn: {
  name: string;
  age?: number;
} = {
  name: "lynn",
  age: 12,
};

function playerMaker(name: string): Player {
  return {
    name,
  };
}
//콜론뒤에 타입을 무조건 적어줘야하고 그에맞게 적어야함
const playerMakers = (name: string): Player => {
  {
    name;
  }
};
const nico = playerMaker("nico");
nico.age = 12;
// nico.name="lad" 위에서 막아서안됨

const numbers: readonly number[] = [1, 2, 3, 4];

// numbers.push(1) readonly때문에 원본배열을 바꿔서 안됨 map,filter등은 원본배열손상안시켜서 가능
// readonly Tuple?

const players: [string, number, boolean] = ["nico", 1, true];
// players[0] = 1; 이건 안되는게 0번째가 string이여야하는데 숫자넣어서안됨 readonly붙이면 아무것도안됨

let g: unknown;
// 변수의 타입을 미리 알지못할때 unknown을 사용

if (typeof g === "number") {
  let g = 2 + 1;
}

if (typeof a === "string") {
  let h = a.toString();
}

function hello(): void {
  console.log("x");
}
// return이 없으면 void 보통은 void안써줘도됨
//void는 비어있다 -> 아무것도없다

function hellos(): never {
  throw new Error("xxx");
}
// 리턴하지않고 오류발생

function test(name: string | number) {
  // 파라미터를 stirng이나 number로
  if (typeof name === "string") {
    name;
  } else if (typeof name === "number") {
    name;
  } else {
    name;
  }
}

// function add(a: number, b: number) {
//     // 매개변수옆에 안적어도 number로나옴
//   return a + b;
// }

// const add = (a: number, b: number) => a + b;

// type Add = (a: number, b: number) => number;
// call signature 이렇게 따로 타입 지정뺄수있음 파라미터와 리턴타입이뭔지

type Add = {
  (a: number, b: number): number;
  (a: number, b: string): number;
};
// overloading?은 여러 call signatures가 있는함수
// Add는 두가지모양으로 부를수있음
//call signature또다른방법

const add: Add = (a, b) => {
  if (typeof b === "string") return a;
  return a + b;
};

type Config = {
  path: string;
  state: object;
};

type Push = {
  (path: string): void;
  (config: Config): void;
};
// void를 리턴해서 아무것도리턴안함
const push: Push = (config) => {
  if (typeof config === "string") console.log(config);
  else {
    console.log(config.path, config.state);
  }
};

type Addf = {
  (a: number, b: number): number;
  (a: number, b: number, c: number): number;
};
//파라미터개수가 안맞을때

const addff: Add = (a, b, c?: number) => {
  if (c) return a + b + c;
  return a + b;
};

//이거처럼써야함

////////////////////////
// type SuperPrint = {
//   (arr: number[]): void;
//   (arr: boolean[]): void;
//   (arr: string[]): void;
// };
// 위에는 일반적방법
type SuperPrint = {
  <T, M>(arr: T[], b: M): T;
};
// 제네릭은 발견하게된 타입으로 만들어줌 타입이 배열이될것이라고는 인지하고 그타입중 하나를 리턴해줌
// 제네릭은 내가 요구한대로 signature 를 생성해줄수있는도구이다

const superPrint: SuperPrint = (arr) => arr[0];

const ab = superPrint([1, 2, 3, 4], "x");
superPrint([true, false, true], 1);
superPrint(["a", "b", "c"], false);
const abs = superPrint([1, 2, true, false, "heelo"], []);
//이런식으로 적을때 여러개를 조합할때 하나하나 타입 위에서 설정안하려고 generic을 쓴다

function superPrints<V>(a: V[]) {
  return a[0];
}

const abss = superPrints([1, 2, 3, 4]);

superPrints([true, false, true]);
superPrints(["a", "b", "c"]);
const absss = superPrints([1, 2, true, false, "heelo"]);

// type Playerd<E> = {
//   name: string;
//   extraInfo: E;
// };

// type NicoExtra = {
//   favFood: string;
// };

// // type NicoPlayer = Playeree<NicoExtra>;

// const lynn: Playred<null>=>{

// }

type A = Array<number>;
// 제너릭 형식임

let n: A = [1, 2, 3, 4];
