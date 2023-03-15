// basic types
let a : number = 1;
let b : string = "hello";
let c : boolean = true;
let numArr : number[] = [1, 2, 3];
let strArr : string[] = ["hi", "hello", "bye"]
let d : undefined = undefined;
let e : null = null;

// object type 지정
const player1: {
    name: string,
    age?: number
} = {
    name: "bitkunst",
}


// type Alias (별칭)
type Name = string
type Age = number
type Player = {
    readonly name: Name,
    age?: Age
}

const ingoo: Player = {
    name: 'ingoo'
}

const bitkunst: Player = {
    name: 'bitkunst',
    age: 20
}

// readonly 속성은 수정이 불가하다.
// ingoo.name = 'ingoo2'