// type 키워드를 이용해 타입스크립트에서 만들고 싶은 무수히 많은 종류의 타입을 설명할 수 있다.

// 타입을 지정된 옵션으로만 제한할 수도 있다.
// 타입이 string 전체가 아니라 특정 값을 가지도록 한다.
type Team = "red" | "blue" | "yellow"
// string과 같은 concrete type을 쓰는 것이 아니라 concrete type의 특정 값을 쓰는 것도 가능하다.
type Win = 1 | 2 | 3

// interface 키워드를 사용해서 object의 모양을 결정할 수 있다.
interface Gamer {
    nickname: string,
    team: Team,
    wins: Win
}

const nick: Gamer = {
    nickname: 'ingoo',
    team: "blue",
    wins: 2
}

/**************************************/

interface Teacher {
    name: string
}

interface Teacher {
    age: number
}

// interface는 class처럼 상속이 가능하다.
interface Member extends Teacher {

}

const poo : Member = {
    name: "nico",
    age: 30
}

// cf) type 키워드에서 상속
/*

    type Teacher = {
        name: string
    }

    type Member = Teacher & {

    }

    const poo: Member = {
        name: "nico"
    }

*/

