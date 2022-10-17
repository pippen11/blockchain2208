// const { AsyncFunction } = require("util/types");

function testFunc(num, time, func) {
  setTimeout(() => {
    console.log(num);
    if (func) func();
  }, time);
}

// setTimeout(() => {
//   console.log(1);
// }, 1000);
// setTimeout(() => {
//   console.log(2);
// }, 2000);
// setTimeout(() => {
//   console.log(3);
// }, 3000);

// testFunc(1, 1000, () => {
//   testFunc(2, 2000, () => {
//     testFunc(3, 3000, () => {
//       testFunc(4, 4000);
//     });
//   });
// });

// //위코드 보기가 불편해서 밑에처럼 씀 동시에 실행이아님 원래 셋타임함수는 동시에실행 위처럼적으면 기다리고 기다리고 실행

// //프로미스는 개발자가 보기 편하고 쉽게?쓰기위해?
function testPromise(num) {
  return new Promise((resolve, reject) => {
    // resolve는 완료했을때
    //reject는 에러 발생시
    try {
      if (num > 10) reject({ data: "숫자가 너무 커" });
      console.log(num);
      setTimeout(() => {
        resolve(num + 1);
      }, num * 1000);
    } catch (error) {
      reject(error);
    }
  });
}

testPromise(9)
  .then((data) => {
    return testPromise(data);
  })
  .then((data) => {
    return testPromise(data);
  })
  .then((data) => {
    //then : 완료했을때 resove(num+1)
    //28번째 줄의 num+1이 data에 정의된다.
    //28번째 줄의 resove의 매개변수 (num+1)가 data에 정의된다.
    console.log("data:" + data);
  })
  .catch((err) => {
    // catch :에러 발생시
    //25번째 31번째 줄의 reject매개변수가 err에 정의된다
    console.log(err);
  });

// async function asyncFunc() {
//   // async: promise를 기다리기 위해서 ( 동기처럼 사용하기 위해서)사용한다.
//   try {
//     let temp = await testPromise(1);
//     temp = await testPromise(temp);
//     temp = await testPromise(temp);
//     temp = await testPromise(temp);
//     temp = await testPromise(temp);
//     temp = await testPromise(temp);
//     temp = await testPromise(temp);
//     //await + promise: promise를 기다려서 resove값을 반환받는다. await는 프로미스를 기다리는 함수 이전게 끝날때까지 기다림
//     console.log("temp:" + temp);
//     //[].map().join()
//     //''.split().map().join()등처럼 이어진다
//   } catch (err) {
//     console.log(err);
//   }
// }
// asyncFunc();
