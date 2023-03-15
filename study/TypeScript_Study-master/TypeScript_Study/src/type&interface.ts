//type

type PlayerA = {
    name: string
}

type PlayerAA = PlayerA & {
    lastName: string
}

const playerA: PlayerAA = {
    name: 'nico',
    lastName: 'xxx'
}

// interface

interface PlayerB {
    name: string
}

interface PlayerBB extends PlayerB {
    lastName: string
}

// 인터페이스에 property 추가
interface PlayerBB {
    health: number
}
// 타입은 새 property를 추가하기 위해 다시 선언될 수 없지만 인터페이스는 항상 상속이 가능하다.

const playerB: PlayerBB = {
    name: 'nico',
    lastName: 'xxx',
    health: 10
}