# TypeScript
JavaScrip에서는 코드가 실행되고 나서야 에러를 확인할 수 있다. 
<br>
이렇게 실행할 때 발생하는 에러를 "런타임에러"라고 한다. 그리고 런타임 에러를 마주하는 것은 실제 사용자가 된다. 
<br>
코드가 실행되기 이전에 에러를 잡아주고 싶을 경우, 타입스크립트를 사용하면 된다. 개발자를 도와주는 보호장치 같은 존재이다. 
<br>
타입스크립트는 프로그래밍 언어이다.
<br>
공식 홈페이지에서는 타입스크립트를 강타입 프로그래밍 언어라고 소개하고 있다. C#, Java, GO, RUST 와 같은 언어를 사용했던 사람들은 프로그래밍 언어라는 말을 듣고 컴파일러를 떠올릴 것이다.
<br>
위에서 언급한 언어들은 코드를 다 작성하고 나면 코드를 컴파일해서 0101과 같이 컴퓨터가 알아들을 수 있는 언어로 바꿔준다. (0과 1로 바꿔준다는 뜻)
<br>
타입스크립트의 경우에는 작성한 코드가 자바스크립트로 변환된다.
<br>
타입스크립트로 코드를 작성하면 타입스크립트가 일반 자바스크립트를 생성한다. 자바스크립트로 변환하는 이유는 브라우저가 이해하는 것은 타입스크립트가 아니라 자바스크립트이기 때문이다.
<br>
타입스크립트에서의 컴파일은 그저 타입스크립트로 작성된 코드를 일반적인 자바스크립트로 바꿔주는 것이다.
<br>
<br>

타입스크립트가 제공하는 보호장치는 타입스크립트 코드가 자바스크립트로 변환되기 전에 발생한다.
<br>
타입스크립트가 먼저 작성된 코드를 확인한 다음에 변환된 자바스크립트 안에서 실수가 일어나지 않게 확인을 해준다.
<br>
일단 타입스크립트 코드를 작성해서 그 코드를 컴파일하면, 일반적인 자바스크립트 코드가 된다. 하지만 타입스크립트 코드에 에러가 있으면 그 코드는 자바스크립트로 컴파일 되지 않는다. 타입스크립트가 에러가 발생할 것 같은 코드를 감지하면 자바스크립트로 컴파일되지 않는다.
<br>
타입스크립트의 이러한 보호장치는 사용자가 코드를 실행하는 런타임에서 발생하는 것이 아니다. 사용자는 일반적인 자바스크립트 코드를 사용할 뿐이다.
<br>
만약 타입스크립트가 성공적으로 컴파일돼서 자바스크립트 코드를 반환하면 타입스크립트 코드도 제대로 작성된 것이고 데이터 타입에도 문제가 없었다는 뜻이다. 즉, 자바스크립트 코드에 버그가 전혀 없다는 뜻이 된다. 
<br>
<br>

## TypeScript Project in VSCode
```powershell
npm install -g typescript

tsc --version

tsc --init
```
<br>
디렉토리 구조

```
MyTypeScriptProject
├── src
│   └── main.ts
└── tsconfig.json
```


# Type systems in TypeScript
C나 C++ 같은 프로그래밍 언어에서는 모든 것의 타입을 정해줘야만 한다.
<br>
만약 변수를 생성한다면 그것이 어떤 타입인지 정해줘야 한다. 만약 1이 들어있는 변수를 만든다면 그 변수가 number라는 것을 정해줘야 한다.
<br>
TypeScript는 두가지 접근방식을 결합했다. 데이터와 변수의 타입을 명시적으로 정의할 수도 있고 그냥 JavaScript처럼 변수만 생성하고 넘어가도 된다. 
<br>
변수의 타입을 명시적으로 정의하지 않고 그냥 넘어갈 경우 TypeScript가 타입을 추론해준다.
<br>
<br>

# Types of TS
> basic types
```typescript
let a : number = 1;
let b : string = "hello";
let c : boolean = true;
let numArr : number[] = [1, 2, 3];
let d : undefined = undefined;
let e : null = null;
```
<br>

> optional types
```typescript
const player: {
    name: string,
    age?: number
} = {
    name: "bitkunst"
}
// name 속성은 필수, age 속성은 옵션
```
<br>

> type Alias
```typescript
type Player = {
    name: string,
    age?: number
}

const bitkunst: Player = {
    name: 'bitkunst',
    age: 20
}

```
<br>

> tuple
```typescript
const player: [string, number, boolean] = ["bitkunst", 20, true]
```
Tuple은 array를 생성할 수 있게 하는데 최소한의 길이를 가져야 하고 특정 위치에 특정 타입이 있어야만 한다. 
<br>
Tuple을 사용하면 항상 정해진 개수의 요소를 가져야만 하는 array를 지정할 수 있다. 또한 지정된 순서에 맞는 타입을 가져야 한다.
<br>
<br>

> any
```typescript
let a : any[] = [1, 2, "hi"]
```
any는 TypeScript로부터 빠져나오고 싶을 때 쓰는 타입이다. TypeScript의 보호장치들로부터 빠져나오고 싶다면 any를 사용하면 된다. any는 TypeScript의 모든 보호장치를 비활성화 시킨다.
<br>
any는 말 그대로 아무 타입이나 될 수 있다. 
<br>
TypeScript 설정에서 any의 사용을 막기위해 추가할 수 있는 몇가지 규칙이 있다.
<br>
<br>


> unknown
```typescript
let a : unknown;
```
TypeScript에서 중요한 포인트는 Type Checker와 소통하는 것이다.
<br>
그렇다면 어떤 type인지 모르는 변수는 TypeScript에게 어떻게 말해줘야 할까?
<br>
만약 API로부터 응답을 받았는데 그 응답의 타입을 모른다면 "unknown"이라는 타입을 쓸 수 있다.
<br>
변수의 타입을 미리 알지 못할 때 unknown을 사용한다.
<br>
type을 unknown으로 지정하면 TypeScript로부터 일종의 보호를 받게 된다.
<br>
어떤 작업을 하려면 이 변수의 타입을 먼저 확인해야 하는 방식으로,,
<br>

```typescript
if (typeof a === 'number') {
    let b = a + 1;
}
```
<br>

> void
```typescript
function hello() {
    console.log('hi')
}
```
void는 '비어 있는 것'을 말하는데 아무것도 return 하지 않는 함수를 대상으로 사용한다.
<br>
void는 아무것도 return하지 않는 함수이다. 보통의 경우 void를 따로 지정해줄 필요는 없다. 
TypeScript는 해당 함수가 아무것도 return 하지 않는다는 것을 자동으로 인식한다.
<br>
<br>

> never
```typescript
function hello() : never {
    throw new Error('xx')
}
```
never는 함수가 절대 return 하지 않을 때 발생한다. 예를 들어 함수에서 exception(예외)이 발생할 경우에 사용.
<br>
위와 같이 return 하지 않고 오류를 발생시키는 함수에서 사용된다. 또한 never는 타입이 두가지일 수도 있는 상황에서 발생할 수 있다.

```typescript
function hello(name: string|number) {
    if (typeof name === "string") {
        name  // name의 타입은 string
    } else if (typeof name === "number") {
        name  // name의 타입은 number
    } else {
        name  // name의 타입은 never
    }
}
```
<br>
<br>

# call signature
인자(arguments)의 타입과 함수의 반환(return) 타입을 알려주는게 call signature 이다.
<br>
call signature를 만들어서 함수를 어떻게 선언할 것인지 알려줄 수 있다.

```typescript
// 인자값 a 와 b는 number 타입, return값도 number 타입
// 함수의 call signature
type Add  = (a: number, b: number) => number 

const add: Add = (a, b) => a + b
```
call signature를 사용하면 함수의 타입을 만들어서 함수가 어떻게 작동하는지 서술해둘 수 있다. 
<br>
코드를 구현하면서 타입을 선언하는 것이 아니라,
<br>
먼저 함수의 타입을 설명하고, 그리고나서 코드를 구현하게 되는 방식으로 과정을 분리해서 구현할 수 있다.
<br>
<br>

# overloading
함수에서 인자값을 받을 때 한 종류의 타입이 아닌, 여러 종류의 타입을 받을 수 있는 경우가 있다.
<br>
Function Overloads는 동일한 이름에 매개 변수와 매개 변수 타입 또는 리턴 타입이 다른 여러 버전의 함수를 만드는 것을 말한다. TypeScript에서는 오버로드 signatures을 작성하여 "다양한 방식으로 호출할 수 있는 함수"를 지정할 수 있다.
<br>
오버로딩은 함수가 서로 다른 여러개의 call signature를 가지고 있을 때 발생시킨다.
<br>
다시말해, 오버로딩은 여러 call signature가 있는 함수일 뿐이다.

```typescript
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
        console.log(config.path)
    }
}
```

# Polymorphism (다형성)
many(poly) + structure(morphos) : 여러가지 다른 구조들.
<br>
concrete type : number, boolean, string, void, unknown
<br>

## generic type
generic이란 타입의 placeholder 같은 것이다. concrete type을 사용하는 것 대신 쓸 수 있다. 타입스크립트로 placeholder를 작성할 수 있고 그게 뭔지를 추론해서 함수를 사용하는 것이다. 
<br>
generic은 기본적으로 placeholder를 사용해서 우리가 작성한 코드의 타입을 기준으로 바꿔준다.

## generic을 사용하는 이유
call signature를 작성할 때, 인자로 들어올 값의 확실한 타입을 모를 때 generic을 사용한다.
<br>
코드를 작성하고 함수를 구현하고 사용할 때는 물론 concrete type을 사용해야 한다. 하지만 call signature를 작성하는 데에는 concrete type을 알 수 없을 때도 있다. 그런 경우에 generic을 사용한다.
<br>

## 사용법
타입스크립트에게 generic을 사용하고 싶다고 알려준다.
```typescript
type SuperPrint = {
    // <> 안에 원하는 generic 이름을 넣어준다.
    <TypePlaceholder>(arr: TypePlaceholder[]): void
}

const superPrint: SuperPrint = (arr) => {
    arr.forEach(v => console.log(v))
}

// 타입스크립트가 유추해낸 타입으로 placeholder를 대채해준다.
superPrint([1, 2, 3, 4])
superPrint([true, false, true])
superPrint(["hi", "hello", "bye"])
superPrint([1, 2, true, false])
```
generic은 함수에 타입을 입력하는 것을 허용한다. 하지만 타입들을 일일이 작성할 필요가 없게끔 해준다.
<br>
placeholder는 작성된 코드를 기반으로 call signature를 생성해준다.
<br>
위의 예시처럼 함수의 call signature를 입력할 때 placeholder를 사용하는 방식이 바로 polymorphism(다형성)이다.
<br>
any를 사용하지 않고 generic을 사용하는 이유는 타입스크립트가 함수의 call signature를 만들어주기 때문이다. 따라서 any를 사용할 때와 다르게  타입스크립트로부터 보호를 받을 수 있다.
<br>
any와 같은 개념이 아니다. 우리가 하는 요청에 따라 call signature를 생성한다는 뜻이다.
<br>

## generic 추가하기
```typescript
type SuperPrint2 = <T, M>(a: T[], b: M) => T
const superPrint2: SuperPrint2 = (arr) => arr[0]
const bb = superPrint2([1, 2, 3], "xx")
```
타입스크립트는 generic이 처음 사용되는 지점을 기반으로 해당 타입이 무엇인지 알게 된다.
<br>
타입스크립트는 generic을 처음 인식했을 때와 generic의 순서를 기반으로 generic의 타입을 알게 된다.
<br>
<br>

# Class
파라미터를 작성하기만 하면 TypeScript가 알아서 Constructor 함수를 만들어 준다. 필드가 어떠한 보호 등급인지(접근제한자), 이름, 그리고 타입을 작성해주기만 하면 된다.

```typescript
class Students {
    constructor(
        private firstName: string,
        private lastName: string,
        public nickname: string
    ) {}
}
```
타입스크립트에서는 클래스 멤버를 접근하는 범위를 지정하는 접근제한자(access modifier)를 가지고 있는데 public, protected, private 등 3가지의 접근제한자를 갖는다. 

- public : public은 객체의 내,외부에서 해당 멤버(속성/메소드)를 모두 접근할 수 있다는 것을 표시한다. 타입스크립트의 클래스 멤버들은 디폴트로 모두 public이다. 별도로 접근제한자를 지정하지 않으면 public 멤버가 된다.
- protected : protected로 지정된 멤버는 해당 클래스와 그 클래스로부터 파생된 서브클래스들에서 사용될 수 있다. property가 외부로부터는 보호되지만 다른 자식 클래스에서는 사용되기를 원한다면 protected를 사용하면 된다.
- private : private으로 지정된 멤버는 해당 클래스 내에서만 사용될 수 있다. private property들은 인스턴스 밖에서 접근할 수 없고 다른 자식 클래스에서도 접근할 수 없다.
- 참고 ) private 및 public은 property 뿐만 아니라 method에서도 작동한다.
- property를 private으로 만들었다면 클래스를 상속 받았을지라도 접근할 수 없다.

<br>

## Abstract Class (추상 클래스)
```typescript
abstract class Users {
    constructor(
        private firstName: string,
        private lastName: string,
        public nickname: string
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
```

추상클래스는 다른 클래스가 상속받을 수 있는 클래스이다. 하지만 추상클래스는 직접 새로운 인스턴스를 만들 수 없다. 즉, 추상클래스는 오직 다른 곳에서 상속받을수만 있는 클래스이다. 추상클래스를 상속 받을 수만 있고 추상클래스를 사용해서 직접적으로 인스턴스를 만들지는 못한다.

### Abstract Method (추상 메소드)
추상 메소드는 구현이 되어있지 않은 메소드이다. 
<br>
추상 클래스 안에서는 추상 메소드를 만들 수 있다.
<br>
하지만 메소드를 구현해서는 안 되고 대신 메소드의 call signature만 적어둬야 한다.
<br>
추상 메소드는 추상 클래스를 상속 받는 모든 것들이 구현해야 하는 메소드를 의미한다. 즉, 추상 메소드가 있는 경우 추상 클래스를 상속받는 클래스에서 추상 메소드를 구현해 줘야만 한다.
<br>
<br>

# Interface (인터페이스)
object의 모양을 설명하는 다른 방법인 인터페이스에 대해 알아보자.
<br>
인테페이스는 오직 한가지 용도만을 가지고 있다. 그리고 그건 object의 모양을 특정해주기 위한 것이다. 
<br>
타입스크립트에게 object의 모양을 알려주는 방법에는 두가지가 있다. 하나는 기존의 방법처럼 type 키워드를 사용하는 것이고 다른 하나는 아래와 같이 인터페이스를 사용하는 것이다.

```typescript
type Team = "red" | "blue" | "yellow"
type Win = 1 | 2 | 3

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
```
type 과 interface는 object의 모양을 결정한다는 점에서 같은 역할을 한다. 다른 점은 type 키워드는 interface 키워드에 비해 좀 더 활용할 수 있는게 많다는 것이다. 
<br>
interface는 오직 object의 모양을 타입스크립트에게 설명해주기 위해서만 사용되는 키워드이다. 인터페이스는 오로지 이 한가지 목적만을 갖는다.
<br>

## Interface 상속
```typescript
interface Teacher {
    name: string
}

// interface는 class처럼 상속이 가능하다.
interface Member extends Teacher {
}

const poo : Member = {
    name: "nico"
}
```
인터페이스를 이용해서 object의 속성을 상속받을 수 있다.
<br>
인터페이스의 또 다른 특징으로는 property들을 축적시킬 수 있다는 점이다. 인터페이스를 이용해서 다른 이름을 가진 property들을 쌓을 수 있다.
<br>

```typescript
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
```

## interface & abstract class
abstract class는 그것으로부터 인스턴스를 만들 수 없다.
하지만 JavaScript에는 abstract class라는 개념이 없다. 
<br>
JavaScript로 변환되었을 때 abstract class로 작성된 클래스들은 일반적인 class가 되어버린다. 
<br>
이때 사용하는 게 interface 이다. 인터페이스는 컴파일했들 때 JavaScript로 바뀌지 않고 사라진다. 
<br>
짚고 넘어가야할 포인트는 인터페이스를 쓸 때 클래스가 특정 형태를 따르도록 강제하는 방법이다. (abstract class에서 처럼,,)
<br>
타입스크립트에서는 implements 키워드를 사용해서 class가 interface를 상속받을 수 있도록 할 수 있다. 
<br>

```typescript
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
```
interface는 클래스의 모양을 알려준다는 점에서 고유한 사용처가 있는 셈이다. 그리고 JavaScript 코드로 컴파일 되지 않는다. 또한 한번에 여러개의 인터페이스를 상속받을 수도 있다.
<br>
인터페이스를 상속하는 것의 문제점 중 하나는 private, protected property들을 사용하지 못한다는 점이다.
<br>
타입스크립트 커뮤니티에서는 클래스나 object의 모양을 정의하고 싶으면 interface를 사용하고 다른 모든 경우에서는 type을 쓰라고 권장하고 있다.
<br>
<br>

# TypeScript 설정하기
```powershell
npm init -y

npm install -D typescript

npm install -D ts-node
```
ts-node를 사용하면 빌드 없이 타입스크립트를 실행할 수 있다. 프로덕션에서 사용하는 패키지가 아닌 개발 환경에서만 사용하는 패키지이다.
<br>
.ts 확장자로 typescript 파일 생성
<br>
tsconfig.json 파일 생성
<br>
```json
{
    "include": ["src"],
    "compilerOptions": {
        "outDir": "build",
        "target": "ES6",
        "removeComments": true,
        "lib": ["ES6", "DOM"],
        "strict": true,
        "allowJs": true
    }
}
```

- include : typescript가 src 디렉토리의 모든 파일을 확인한다는 것을 의미.
- outDir : javascript 파일이 생성될 디렉토리 지정.
- target : 어떤 버전의 javascript로 typescript를 컴파일 하고 싶은지 지정.
- removeComments : 컴파일시 주석제거
- lib : 합쳐진 라이브러리의 정의 파일을 특정해주는 역할을 한다. 타입스크립트에게 변환된 자바스크립트 코드가 어디에서 실행될지를 알려준다. 예를들어 브라우저 위에서 동작하는 자바스크립트일 경우 "DOM"을 넣어주면 된다. 타입스크립트에게 어떤 API를 사용할 것이고 어떤 환경에서 코드를 실행시킬지를 알려주는 것이라고 생각하면 된다.

<br>

## 자바스크립트 파일과 모듈을 위한 타입 정의 작성.
타입스크립트는 내장된 자바스크립트 API를 위한 기본적인 타입 정의는 가지고 있다.
<br>
타입 정의는 타입스크립트에게 몇몇 자바스크립트 코드와 API의 타입을 설명해주기 위해 사용하는 것이다.
<br>
타입 정의를 써야하는 이유는 타입스크립트를 사용하는 목적과 연결되어 있다. 대부분의 경우 우리는 다른 패키지나 프레임워크, 그리고 라이브러리를 사용한다.
<br>
하지만 이러한 패키지나 프레임워크, 라이브러리는 타입스크립트가 아닌 자바스크립트로 만들어져 있다. 따라서 자바스크립트로 만들어진 라이브러리를 타입스크립트 프로젝트에 사용하려 한다면 타입스크립트에게 우리가 불러올 자바스크립트 함수의 모양을 설명하기 위한 타입 정의가 필요하다.
<br>

**declaration file : 정의 파일**
<br>
정의 파일은 자바스크립트 코드의 모양을 타입스크립트에게 설명해주는 파일이다.
<br>

**myPackage.d.ts 파일 생성**
<br>
d.ts 파일에서는 call signature만 작성해주면 된다.
<br>
타입스크립트에게 타입에 대해 설명해주는 파일일 뿐이다.
<br>
lib 옵션을 수정하면 통합된 라이브러리의 정의 파일을 지정할 수 있게 된다.
<br>
<br>

## JSDoc
JSDoc은 쉽게 말해서 코멘트로 이루어진 문법이다. 함수 바로 위에 코멘트를 적어주면 된다. 코멘트를 제대로 작성하면 타입스크립트가 해당 코멘트를 읽을 수 있다.
<br>
타입스크립트가 작성된 코멘트를 읽고 타입을 확인해준다.
<br>
JSDoc을 활용해서 타입스크립트가 자바스크립트 파일을 확인해주게끔 할 수 있다.
<br>
production에서 사용중인 웹사이트이거나 서버에서 돌아가는 코드인데 타입스크립트의 보호는 받고 싶지만 고장날까봐 걱정중이라면,,
<br>
코멘트로 // @ts-check 만 더해주고 tsconfig.json 파일에서 "allowJs": true 만 설정해주면 된다.
<br>

```javascript

// @params : 파라미터의 이름과 타입 지정
// @returns : 리턴값의 타입 지정
// 해당 코드를 실제 웹사이트나 서버의 production 환경에서 사용 중이라면,
// 당장 코드에서 에러가 발생할 걱정을 하지 않아도 된다.
// 코드에 코멘트를 더하고 있을 뿐이기 때문이다.
// 코멘트일 뿐이지만 타입스크립트가 코멘트를 읽고 있는 것이다.

// @ts-check
/**
 * Initializes the project
 * @param {object} config
 * @param {boolean} config.debug
 * @param {string} config.url
 * @returns boolean
 */
export function init2(config) {
    return true
}

/**
 * 
 * @param {number} code 
 * @returns number
 */
export function exit2(code) {
    return code + 1
}
```



