// // scope라는것이 있다
// // scope는 {}로 묶인것이다.
// // {} 스코프라고 부른다
// // 그래서 scope가 뭐냐?
// // 지역을 나타낸다
// // 지역이라는건 일종의 부분이라 생각

// let a = 0; /* 모든곳에서 사용할수잇는변수를 전역변수라한다 */
// console.log(a);
// {
//   a = 2;
//   //   지역 스코프 내에서 전역 변수가 다시 선언될경우 (재선언 ) 전역 스코프의 변수와는 다른변수가된다(같은 이름이지만 다른데이터를갖는다.)
//   let b = 1; /* 안에서 선언된 변수를 지역변수 */
//   //   지역 변수는 해당 스코프 내에서만 사용가능
//   console.log(a + b);
//   console.log(a);
// }
// // {}묶인 곳은 지역 스코프
// // scope는 저안에서만 활동하는애라 b는 밖으로 못나옴
// console.log(a);
// // console.log(b);
// // 바깥은 전역 스코프라고 부른다

// function addA(a) {

//   a++;
//   console.log(a);

// }
// // 매개변수 a는 안에서만 따로노는 a가 됐다

// let obj = {
//   a: 1,
//   func1: function () {
//     console.log("돼");
//   },
//   func: (fn, sn) => {
//     return fn + sn;
//   },
// };

// obj.func1();
// // 이렇게 호출함
// console.log(obj.func(1, 2));
// // 객체 안에 포함된 매서드라고 부른다
// // console 객체 안의 log매서드
// // Math 객체안의 random 매서드
// // obj 객체 안의 func1, func 매서드

// alert("경고!");

// // 오늘의 과제 : 숫자 선택 (2개)를 선택하고 + , - , * , / , % 중 하나를 누르면 계산된 값이 alert창으로 출력된다.

let obj = {
  a: 1,
  func1: function () {
    console.log("돼");
  },
  func: (fn, sn) => {
    return fn + sn;
  },
};

obj.func1();
// 이렇게 호출함
console.log(obj.func(1, 2));
// 객체 안에 포함된 매서드라고 부른다
// console 객체 안의 log매서드
// Math 객체안의 random 매서드
// obj 객체 안의 func1, func 매서드

alert("경고!");

// 오늘의 과제 : 숫자 선택 (2개)를 선택하고 + , - , * , / , % 중 하나를 누르면 계산된 값이 alert창으로 출력된다.
