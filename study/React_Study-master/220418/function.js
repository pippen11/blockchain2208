// 고차함수

// 선언과 호출

// 선언
function a() {
    console.log('hello world')
}

// 호출
a()

const 더하기 = (a, b) => a + b
const 함수 = (callback, a, b) => callback(a, b)

// 사용 방법
const result = 함수(더하기, 1 , 2)
console.log(result)
// 콜백에는 호출이 아닌 선언 값으로 들어가야 한다.
// 함수 내부적으로 호출을 해주기 때문에 선언문으로 들어가야 한다.

// example
// function handleClick() {
//     console.log('hello world')
// }

// const btn = document.querySelector('#btn')
// btn.addEventListener('click', handleClick)

// 고차함수
// 함수 안에 함수를 만들어서 콜백함수가 인자값을 받을 수 있도록 해줄 수 있다.
function 돌아라2(value) {

    function init() {
        console.log(value)
    }

    return init
}

setTimeout(돌아라2('hello ingoo'), 1000)

// console.log(돌아라2())

돌아라3 = (value) => () => {
    console.log(value)
}

setTimeout(돌아라3('돌아라아~'), 2000)