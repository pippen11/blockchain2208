// abstract class 와 interface 합치기

abstract class Userss {
    constructor(
        protected firstName: string,
        protected lastName: string
    ) {}  // protected는 추상 클래스로부터 상속받은 클래스들이 property에 접근할 수 있도록 해준다.

    abstract sayHi(name: string): string
    abstract fullName(): string
}
// abstract class를 통해서 다른 클래스가 따라야 할 청사진(설계도)를 제시한다.
// 만약 Userss 클래스를 상속한다면, sayHi() 와 fullName()을 구현해야만 한다.

// abstract class는 그것으로부터 인스턴스를 만들 수 없다.
// 하지만 JavaScript에는 abstract class라는 개념이 없다. 
// JavaScript로 변환되었을 때 abstract class로 작성된 클래스들은 일반적인 class가 되어버린다. 
// 이때 사용하는 게 interface 이다. 인터페이스는 컴파일했들 때 JavaScript로 바뀌지 않고 사라진다. 

class Playerss extends Userss {
    sayHi(name: string) {
        return `Hello ${name}. My name is ${this.fullName()}`
    }

    fullName() {
        return `${this.firstName} ${this.lastName}`
    }
}