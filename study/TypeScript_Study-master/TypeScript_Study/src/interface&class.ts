interface User2 {
    firstName: string,
    lastName: string,
    sayHi(name: string): string,
    fullName(): string
}

interface Human {
    health: number
}

// 클래스에서 interface를 상속받기 위해서는 implements 키워드를 사용한다.
// interface를 상속받을 때에는 property가 public으로만 가능하다.
class Player2 implements User2, Human {
    constructor(
        public firstName: string,
        public lastName: string,
        public health: number
    ) {}

    sayHi(name: string) {
        return `Hello ${name}. My name is ${this.fullName()}`
    }

    fullName() {
        return `${this.firstName} ${this.lastName}`
    }
}

// 인터페이스를 타입으로 쓰는 것도 가능하다.
function makeHuman(human: Human) {
    return "hi"
}

makeHuman({
    health: 10
})

