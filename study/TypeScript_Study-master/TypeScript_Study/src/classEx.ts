
type Words = {
    // 제한된 property 혹은 key를 가지는 타입을 정의해주는 방법.
    // property에 대해서 미리 알지 못하지만 타입만 알고 있을 때 사용.
    [key: string]: string
    // Words 타입이 string 타입만을 property로 가지는 object라는 뜻.
}

class Dict {
    private words: Words
    // property가 constructor부터 바로 초기화되지 않을 경우 
    constructor() {
        // 수동으로 초기화 시켜준다.
        this.words = {}
    }

    // 클래스를 타입처럼 사용하는 것이 가능.
    add(word: Word) {
        if (this.words[word.term] === undefined) {
            this.words[word.term] = word.def
        }
    }

    def(term: string) {
        return this.words[term]
    }
}

class Word {
    constructor(
        // 값을 보여주고 싶지만 수정은 불가능하게 하고 싶을 경우 readonly를 사용하면 된다.
        public readonly term: string,
        public readonly def: string
    ) {}
}

const kimchi = new Word('kimchi', '한국음식')
const dict = new Dict()

dict.add(kimchi)
dict.def("kimchi")