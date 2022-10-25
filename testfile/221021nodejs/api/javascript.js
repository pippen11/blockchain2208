// javascript는 prototype이다.
// 변수는 저장할 데이터의 이름이다.
// const , let ,var
// var는 hoisting(호이스팅)이 가능하다.
// 저장한 데이터의 이름이기 때문에 호출하면 저장된 데이터를 가져온다 , 출력한다, 사용한다
// const는 변경 불가능하다. << 재정의가 불가능하다.
// let은 같은 이름을 사용하지 못한다. << 재선언이 불가능하다.
// let은 다른 데이터를 다시 저장할수있다.<<
//변경이 가능하다.<< 재정의가 가능하다
// var는 마음대로 마구잡이로 사용 가능하다.<< 같은 이름을 사용할수있다 << 재선언이가능하다.

// console.log(constA);<< hoisting불가능
// console.log(letA);<< hoisting불가능
console.log(varA); // <<hoisting 가능

const constA = 1;
// constA = 2; // 재정의가 불가능하다
// const constA = 3; << 재선언이 불가능하다
let letA = 1;
letA = 2;
// let letA = 3; << 재선언이 불가능하다
var varA = 1;
varA = 2;
var varA = 3;

// 자료형
// string, number , boolean, Array, null , Fucntion, Object, undefined, Symbol
//string: 문자열
// number: 숫자
// boolean: 참거짓
// Array: 배열
// null: 비어있는값/ 비어있다고 정의한값
// Function : 함수
// Object: 객체
// undefined: 선언은 했는데 그냥 빈값(정의하지 않았다.)
//Symbol: 절대적으로 중복되지 않는 값 <<  "asdf"를 2개를 선언했다 . 두값은 같은 값일까?

console.log("asdf" == "asdf");
console.log(Symbol("asdf") == Symbol("asdf")); //<<false 다르다고나옴

const constB = 1;
console.log(constA == constB); // true같다고나옴

("constTest"); //<<뭘까? string/ const
1; // << number / const
console.log(typeof constA.toString());
console.log(typeof 1);
console.log(typeof (1).toString());
console.log("asdf".toUpperCase()); //전부 대문자

console.log(typeof "123");
console.log(typeof +"123");
console.log(typeof parseInt("123")); //정수화
console.log(typeof Math.floor("123"));
console.log(typeof Number("123"));
console.log(typeof parseFloat("123")); //실수로바꿈

console.log((123).toString());
console.log(Boolean(123));
console.log(!!123);

console.log([1].push(10)); //<< 왜 1이나올까? push는 제일 뒤에 아이템을 추가한다 push는 length를 반환한다.
console.log([1, 2, 3, 5, 4].pop()); // 왜 4가나올까? pop은 맨뒤의 아이템을 제거한다 뭘제거했는지 보여주기위해 제거한 아이템을 반환한다
console.log([1].unshift(4)); // 제일 앞에 아이템을 추가한다.
console.log([10, 1].shift()); // 제일 앞에서 아이템을 제거한다.
// pop과 마찬가지로 제거한 아이템을 반환한다.

//[].join() << 아이템을 string으로 연결 , 매개변수로 받은 string을 중간에 삽임
//[].filter() <<  거름막 << 내가원하는 데이터만 배열로 반환한다.
//[].find() << 찾다 깊이 찾다.객체내의 데이터들을 확인하여 찾을때 사용한다 찾은 아이템을 반환한다
//[].findIndex()<<  찾다 깊이 찾다.객체내의 데이터들을 확인하여 찾을때 사용한다 찾은 아이템의 index를 반환한다
//[].indexOf() << 찾다 << 얕게 찾다 . 데이터 자체를 찾아 그아이템의 index를 반환한다. 객체일 경우에 그객체 자체로 찾아야한다.

//[].forEach() << for문
//[].map()<< 배열의 아이템을 변화시키고 싶을때 사용한다 .
// 각 아이템에 대해서 매개변수 함수를 실행하고 그 반환 값을 배열에 넣어서 반환한다
//[].slice() << 자르기
//[].splice()<< 자르기(원본훼손)
//[].sort() << 정렬
//[].reverse() << 순서 뒤집기
//[].reduce() << 합하기(join메서드는 단순하게 string이지만 reduce는 내맘대로 할수있다(모든 학생의 과학점수를 합할수있다.<< 모든학생이라는 말은 학생들의 배열/
//과학점수 라는 말은 각 학생이 여러점수를 갖고잇는데
//그중에 과학 점수만을 뜻함(점수가 객체로 저장되어있다.)/ 합할수 잇다라는 말은 객체내의 프로퍼티(키)를 각 값을 더할수있다. ))
//[].concat()=>[...A,...B]  << 스프레드써서 하나로 합침? << 배열 합치기

// Object
//객체: 키와 값으로 이루어져있다. key: value
// 선언은 {}로 묵어서 선언한다.
const tempObj = { a: 1, b: 2 };
let a = 1;
let b = 2;
tempObj.a; //1
tempObj.b; //2
//사용함에 있어서 다른점: 객체의 프로퍼티(키값)이니까 tempObj를 붙여서 .을 통해서 찾아서 사용한다
//let a는 재정의 가능? o / tempObj.a는 재정의 가능? o
a = 3;
tempObj.a = 3;
// 프토퍼티(키값)는 간단하게 생각해서 {} 안에 잇는 변수이다.
// 객체 안에 프로퍼티로 객체가 가능?o
const tempObj1 = { data: { data: { list: 1 } } };
tempObj1.data.data.list;
tempObj1["data"]["data"]["list"];
const tempKey = "data";
console.log(tempObj1[tempKey][tempKey]);
console.log(tempObj1[tempKey][tempKey][tempKey]);
//tempObj1.data.data.data는 undefined이다 값이 없어서

//어디서 봤을까?<< node.js에서 express 서버를 생성하고 axios로 데이터를 응답 받았을때
//사용했다 . ex)data.data.list

// JSON은 객체를 데이터를 파일로 저장하기 위해서 사용한다.

//Array[Object]
const tempArr = [{ a: 1 }, { a: 2 }, tempObj, { a: 3 }, { a: 4 }];
console.log(tempArr.findIndex((item) => item.a === 1));
//깊게찾아서 0번째 있으니 0이나옴
console.log(tempArr.indexOf({ a: 1 }));
// 얖게찾아서 찾을수없다인 -1이나옴 우리가봤을땐 같은데 위에랑 다른객체로침
console.log(tempArr.indexOf(tempObj));
// 얖게찾는데 찾을수잇으니 2가나옴 0, 1, 2번째

console.log({ a: "asdf" } === { a: "asdf" });
//객체는 같아보여도 아예새로만들어지는거라 false다

const tempObj2 = tempObj;
console.log(tempObj2 === tempObj);
//true다

const tempObj3 = { ...tempObj, be: 1, a: 6 };
//...은 중괄호 없앤다
//{...tempObj,be:1,a:6} a가 덮어씌워져서 6으로바뀜

//객체는 객체안에서만 스프레드를 쓸수있다
console.log(tempObj3); // a:6 뒤에나온게 덮어씌워진다
console.log(tempObj);
console.log(tempObj3 === tempObj);

console.log([1, 2, 4, 3]);
console.log(...[1, 2, 4, 3]);
//스프레드가 앞에붙어있으면 배열을 없앤다
console.log(1, 2, 4, 3);

[1, 2, 3, 4].reduce((prev, curr) => prev + curr, 0);
//prev=0 , curr=1 , result=1->prev1 ,curr=2 result=3-> prv=3 ,curr=3 ,result=6 ->prev6
//curr=4 , result=10

console.log(
  [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }].reduce((prev, curr) => {
    const temptemp = prev.length ? prev[prev.length - 1] : { a: 0 };
    prev.push({ a: temptemp.a + curr.a });
    return prev;
  }, [])
);

//위두개 차이가 없게나온다

//Function
//함수 : 기능(코드)을 실행
//함수 선언문은 호이스팅이 가능하기 때문에 함수호출을 정상적으로 진행-1출력
funcAa(1);
function funcAa(b) {
  console.log(b);
}

funcAa(1);

// funcB("asdf");
// // 호이스팅이 안되기때문에 에러발생
// //표현식은 호이스팅이 안된다
let funcB = function (a) {
  console.log(a);
};

funcB("asdf");

// funcC("asdf");

// var funcC = function (a) {
//   console.log(a);
// };
//표현식은 호이스팅이 안된다

let funcD = (a) => {
  console.log(a);
}; //화살표 함수

let funcE = (a) => console.log(a);
// funcE("asdfsadf");

[1, 2, 3, 4].reduce((prev, curr) => prev + curr, 0);

let funcF = (a, b) => a + b;
//리턴값 없어도 a랑 b로 받아서씀
let funcG = (a, b) => {
  return a + b;
  //return이있어야함
};

console.log(funcF(1, 2));
console.log(funcG(1, 2));

console.log([1, 2, 3, 4].reduce(funcF, 0));

//[].forEach()
console.log([1, 2, 3, 4].forEach((item) => item)); //<< undefined

//[].map()
console.log([1, 2, 3, 4].map((item) => !!(item % 2)));

// 1 0 1 0 true false true false

console.log([1, 2, 3, 4].filter((item) => !(item % 2)));
//1은참이고 0은 거짓이다

// [1, 2, 3, 4].forEach();

console.log([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }].reverse().join());
