
// Alias type
type Id = string
type Pw = number
type User = {
    userid: Id,
    userpw?: Pw
}

// 인자값과 return 값의 타입 지정하기
function userMaker(userid: string): User {
    return {
        userid
    }
}

const nico = userMaker("nico")
nico.userpw = 1234

console.log(nico)

// arrow function
const userMaker2 = (userid: string): User => ({userid})


// call signature
type Add = (a: number, b: number) => number
const add: Add = (a, b) => a + b


type Config = {
    path: string,
    state: object
}

// function overloading
type Push = {
    (path: string): void
    (config: Config): void
}

const push: Push = (config) => {
    if (typeof config === 'string') { console.log(config) }
    else {
        console.log(config.path, config.state)
    }
}

// call signature들의 파라미터 개수가 다른 경우
type Multiple = {
    (a: number, b: number): number,
    (a: number, b: number, c: number): number
}

const multi: Multiple = (a, b, c?: number) => {
    if (c) return a * b * c 
    return a * b
}