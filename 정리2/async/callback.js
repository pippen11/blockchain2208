"use strict";

//자바스크립트는 동기적인 아이다
//호이스팅이 된이후부터 하나하나씩 동기적으로 실행
// hoisting: var이랑 함수같은 선언들이 제일위로 올라가는것이 특징
//callback함수:우리가 전달에준함수를 나중에불러줘
function printImmediately(print) {
  print();
}
//밑에적어도 호이스팅때문에 위로감

//비동기
function printWithDelay(print, timeout) {
  setTimeout(print, timeout);
}
//호이스팅때문에 위로감

console.log(1);
//동기
setTimeout(() => {
  console.log(2);
}, 1000);
//비동기

console.log(3);
//동기

// 즉각 콜백
// function printImmediately(print) {
//   print();
// }
printImmediately(() => console.log("hello"));
//언제 실행될지 모르는 콜백

//두가지

//비동기 콜백
// function printWithDelay(print, timeout) {
//   setTimeout(print, timeout);
// }

printWithDelay(() => console.log("async callback"), 2000);

//callback Hell example

class UserStorage {
  loginUser(id, password, onSuccess, onError) {
    setTimeout(() => {
      if (
        (id === "ellie" && password === "dream") ||
        (id === "coder" && password === "academy")
      ) {
        onSuccess(id);
      } else {
        onError(new Error("not fount"));
      }
    }, 2000);
  }

  getRoles(user, onSuccess, onError) {
    setTimeout(() => {
      if (user === "ellie") {
        onSuccess({ name: "ellie", role: "admin" });
      } else {
        onError(new Error("no access"));
      }
    }, 1000);
  }
}

//콜백체인의 문제점: 가독성이떨어진다.
const userStorage = new UserStorage();
const id = prompt("enter your id");
const password = promt("enter your password");
userStorage.loginUser(
  id,
  password,
  (user) => {
    userStorage.getRoles(
      user,
      (userWithRole) => {
        alert("hello ${user.name}, you have a ${user.role} role");
      },
      (error) => {
        console.log(error);
      }
    );
  },
  (error) => {
    console.log(error);
  }
);
