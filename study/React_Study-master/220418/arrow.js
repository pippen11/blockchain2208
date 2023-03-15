const fn2 = () => {
    console.log('hello world')
}

// arrow 함수는 호이스팅이 되지 않는다.
arrow()
const arrow = () => {
    fn2()
}

function fn() {
    fn2()
}