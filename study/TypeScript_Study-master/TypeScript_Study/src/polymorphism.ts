// Polymorphism

// 배열을 받고 배열의 요소를 하나씩 출력해주는 함수.
// 3 call signatures
type SuperPrint = {
    // <> 안에 원하는 generic 이름을 넣어준다.
    <TypePlaceholder>(arr: TypePlaceholder[]): void
}

const superPrint: SuperPrint = (arr) => {
    arr.forEach(v => console.log(v))
}

// generic을 이용해서 call signature를 만들면,
// 타입스크립트가 인자값을 보고 타입을 유추한다.
superPrint([1, 2, 3, 4])
superPrint([true, false, true])
superPrint(["hi", "hello", "bye"])
superPrint([1, 2, true, false, "hello"])
// 타입스크립트는 placeholder를 타입스크립트가 알아낸 타입으로 대체해준다.

// generic을 사용해서 return값의 타입을 지정.
type SuperPrint2 = {
    <T>(arr: T[]): T
}

const superPrint2: SuperPrint2 = (arr) => arr[0]
const aa = superPrint2([1, 2, "hi", true])


// generic 추가하기
type SuperPrint3 = <T, M>(a: T[], b: M) => T
const superPrint3: SuperPrint3 = (arr) => arr[0]
const bb = superPrint3([1, 2, 3], "xx")


/*******************************************************/


type Student<E> = {
    name: string,
    extraInfo: E
}

type StudentExtra = {
    favFood: string
}

// type들끼리 재사용이 가능하다.
type StudentDev = Student<StudentExtra>

const dev: StudentDev = {
    name: 'bitkunst',
    extraInfo: {
        favFood: 'chicken'
    }
}

// 대부분의 기본적인 타입스크립트의 타입들은 generic으로 만들어져 있다.
type ArrNum = Array<number>

let nums: ArrNum = [1, 2, 3]

