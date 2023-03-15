// Spread Operator
// 스프레드 연산자
// 깊은복사를 하기 위해 존재

// spread 연산자가 생겨난 이유는 자바스크립트 특성 때문이다.
// 무슨 특성 때문이지??

console.log({} === {})  // output : false
// 객체라는 것은 생성될 때마다 새로운 메모리에 생성된다.
// 객체가 생성될 때마다 메모리에 새로운 공간을 만든다.
// 메모리 공간의 주소가 달라서 false 값이 나오는 것

let a = {
    name: 123
}

let b = a;

console.log(a === b)  // output : true;

b.name = 124;
console.log(a.name)  // output : 124



// a, b 라는 객체를 따로따로 조작하고 싶은 경우가 생길 때
// b에 a의 주소값을 저장하는 것이 아닌, a의 값 자체를 저장하고 싶을 때 사용하는 것이 spread 연산자.

let c = {...a}  // 깊은 복사

console.log(a === c)  // output : false

let obj = {
    name: 123,
    name2: 1234,
    name3: 12345
}

// obj 속성을 3개 -> 4개로 만들기 (name4: 123456)
let obj2 = {
    ...obj,
    name4: 123456
}
console.log(obj2)




