"use strict";
//자바는 유연한언어라서 이거쓰고시작하는거 추천 엄격하게잡아줌

console.log("hello");

//2.variable 변수 , rw(read/write)
//let ( added in Es6)

let glo = "global name";
//이런건 글로벌스콥 어디서나 불러오기가능
//글로벌한아이들은 항상메모리에탑재
//그래서 메모리먹으니 최소한으로쓰는게좋고 if for등에서쓰는게좋다?
{
  let name = "ellie";
  //name이라는 변수에 ellie라는 값을 저장 할당
  console.log(name);
  name = "helloo";
  console.log(name);
  console.log(glo);
} //block scope:블록밖에서는 안에내용을 볼수없게됨
//블록안에 정의된거 밖에서못씀
//hoisting이란 어디서 선언했느냐에 상관없이 항상제일위로 선언을 끌어올려주는것을 말함
console.log(name);
console.log(glo);

//3.constant const:한번선언하면 값이 절대바뀌지않음
//let은 값을 변경할수있지만 const는 한번값을 할당하면 변경불가

//변수선언은 mutable타입의 let immutable타입의  const가 있다

// 4.variable types

const infinity = 1 / 0;
const negativeinfinity = -1 / 0;
const nAn = "not a number" / 2;
console.log(infinity);
console.log(negativeinfinity);
console.log(nAn);
//이런식으로 각 숫자의 타입이 중요

//boolean
//false: 0, null, undefined, NaN, ''
//true: any other value

//null은 텅텅 비어있는값으로 지정

//undefined은 비어있는지 값이있는지 지정되지않은상태

//symbol은 고유한 식별자를 만들때사용

//dynamically typed language이다 값의 타입이 유연하게변함 프로그램이 실행될때 타입이 변경될수있따
let text = "hiru";
console.log(text.charAt(0));

//object란 일상생활에서 볼수있는 물건과 물체를 대표할수있다
