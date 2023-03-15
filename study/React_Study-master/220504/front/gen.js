function* gen() {
    console.log(1)
    yield
    console.log(2)
    yield
    console.log(3)
    yield
}
// 함수를 실행시켰을 때 yield 위치에서 커서가 멈춘다.
// const aa = gen()
// aa.next()  <-  이런 형태로 gen() 함수를 실행시킨다.
// aa.next() 의 return 값은 {value:'', done: boolean}

function* gen2() {
    while(true) {
        yield '무한'
    }
}

function* gen3() {
    let a = yield
    console.log(a)
    let b = yield
    console.log(b)
    yield 1
    yield 2
    yield 3
}
// const aa = gen3()
// aa.next('hi')  ->  a 변수에 'hi'가 들어가고 yield를 만나서 커서가 멈춘다.

function* middle() {
    console.log('이 함수를 바라볼거야')
    while (true) {
        const action = yield
        if (action.type === 'ingoo') {
            console.log('안녕 인구야')
        }
    }
}

const ingoo = middle()
// ingoo.next()
// next() 의 인자값이 yield로 치환된다.
