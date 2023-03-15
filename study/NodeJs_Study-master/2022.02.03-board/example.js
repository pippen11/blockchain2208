// 전역변수(global) 와 지역변수(local)
// 어디에서나 사용 가능한 변수가 전역변수
// 코드 블록 { } 영역 안에서만 사용할 수 있는 변수가 지역변수

// 변수를 공유해서 사용하고 싶을 때는 전역변수로 설정해 주어야만 한다.
let a = 1;
function aa() {
    a = 0;
}
aa()
console.log(a)  // output : 0


// let, const를 사용하면 선언하겠다는 의미를 가진다.
// function bb() 가 있던 메모리 공간 안에 let b = 0; 이라는 변수를 저장한 것이다. 
// 함수 안에서 선언된 것은 함수 안에서만 사용할 수 있는 변수가 된다.
let b = 1;
function bb() {
    let b = 0;

    function cc() {
        let b = 2;
        return b
    }
    console.log( cc() )  // output : 2
}
bb()
console.log(b) // output : 1