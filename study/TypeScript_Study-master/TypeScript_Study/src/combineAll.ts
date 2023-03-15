// polymorphism & generic & interface & class

// polymorphism(다형성)은 다른 모양의 코드를 가질 수 있게 해주는 것이다.
// 그리고 다형성을 이룰 수 있는 방법은 generic을 사용하는 것이다.

interface SStorage<T> {
    [key: string]: T
    // 위의 방식을 사용해 제한되지 않은 object를 정의할 수 있다.
}

class LocalStorage<T> {
    // generic을 상속하는 것이 가능하다.
    private storage: SStorage<T> = {}

    set(key: string, value: T) {
        this.storage[key] = value
    }

    remove(key: string) {
        delete this.storage[key]
    }

    get(key: string): T {
        return this.storage[key]
    }

    clear() {
        this.storage = {}
    }

}

const stringsStorage = new LocalStorage<string>()
stringsStorage.get("key")
stringsStorage.set("hello", "how are you")

const booleansStorage = new LocalStorage<boolean>()
booleansStorage.get("key")
booleansStorage.set("hello", true)