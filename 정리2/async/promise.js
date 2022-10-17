"use strict";

//promise is a javascript object for 비동기적수행(콜백대신 유용)

//상태: 하는중인지 실패인지 성공인지 이해
//제공하는사람과 제공을쓰는사람의 견해를 이해

//state: pending -> fulfilled or rejected
//producer vs consumer

//1.producer
// when new promise is created, the executor runs automatically

const promise = new Promise((resolve, reject) => {
  //promise를 만드는순간 excuter콜백함수(여기서는 resolve?)가 바로실행
  // doing some heavy work( network,read files)
  console.log("doing something...");
  setTimeout(() => {
    // resolve("ellie");
    // reject(new Error("no network"));
  }, 2000);
});

//2.consumers: then, catch , finally
//promise
promise
  .then((value) => {
    console.log(value);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    console.log("finally");
  });

// 3.promise chaining
const fetchNumber = new Promise((resolve, reject) => {
  setTimeout(() => resolve(1), 1000);
});

fetchNumber
  .then((num) => num * 2)
  .then((num) => num * 3)
  .then((num) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(num - 1), 1000);
    });
  })
  .then((num) => console.log(num));
