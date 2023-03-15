class Students {
    // 파라미터를 작성하기만 하면 TypeScript가 알아서 Constructor 함수를 만들어 준다.
    constructor(
        private firstName: string,
        private lastName: string,
        public nickname: string
    ) {}
}

const web7722 = new Students("ingoo", "JJang", "ing")

// private은 클래스 외부에서 접근 불가.
// web7722.firstName


// Abstract Class
abstract class Users {
    constructor(
        protected firstName: string,
        protected lastName: string,
        protected nickname: string
    ) {}
    
    getFullName() {
        return `${this.firstName} ${this.lastName}`
    }

    // Abstract Method
    abstract getNickName(): void
}

class Players extends Users {
    // Users를 상속받는 Players는 Users의 추상 메소드인 getNickName()을 구형해야만 한다.
    getNickName() {
        console.log(this.nickname)
    }
}

const ingooJJang = new Players("ingoo", "JJang", "ing")