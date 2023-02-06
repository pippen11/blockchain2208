var 이름 = ["kim", "park"];
var 이롬 = { name: "kim" };
//객체는 보통 ?넣어줌 들어올수도있고 안들어올수도있고
var test = 123;
var 테스트 = 1234;
function 함수(x) {
    return x * 2;
}
// 이함수는 파라미터로 number, return 값으로 number
함수(123);
var john = [123, true];
var jone = { name: "kim" };
var User = /** @class */ (function () {
    function User(name) {
        this.name = name;
    }
    return User;
}());
/////////////////////////////////////////////
var car = "bmw";
var age = 30;
var isAdult = true;
var a = [1, 2, 3];
var a2 = [1, 2, 3];
var week1 = ["mon", "tue", "wed"];
var week2 = ["mon", "tue", "wed"];
//week1처럼 쓰나 week2처럼쓰나 같다
// 튜플(Tuple)
var b;
b = ["z", 1];
// b = [1, "z"];
//밑에처럼쓰는건 순서가 안맞아서 안됨
// void , never
function sayHello() {
    console.log("hello");
}
function sayHello1() {
    throw new Error();
}
//오류를 반환하거나
function sayHello2() {
    while (true) { }
}
// 끝나지않는 함수를 반환
// enum
var Os;
(function (Os) {
    Os[Os["window"] = 3] = "window";
    Os[Os["Ios"] = 4] = "Ios";
    Os[Os["Android"] = 5] = "Android";
})(Os || (Os = {}));
// emnum은 수동으로 값을 주지않으면 자동으로 0부터 1씩늘어남
var myOs;
(function (myOs) {
    myOs["window"] = "win";
    myOs["Ios"] = "ios";
    myOs["Android"] = "and";
})(myOs || (myOs = {}));
var mytest;
// 이렇게 타입을주면
mytest = myOs.window;
//이런식으로 쓸수있음
// null , undefined
var c = null;
var d = undefined;
// interface
var user;
user = {
    name: "xx",
    age: 30,
};
// gender에 물음표 붙여주면 밑에안써도됨(있어도 없어도되는 프로퍼티)
var users = {
    name: "xxx",
    age: 31,
    birthYear: 2000,
    1: "A",
    2: "B",
};
