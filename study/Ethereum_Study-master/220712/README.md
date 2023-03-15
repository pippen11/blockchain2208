**스마트 컨트랙트 프레임워크 종류**

-   트러플 (Truffle) : web3 라이브러리 사용
-   하드햇 (HardHat) : ethers 라이브러리 사용

<br>

```sh
$ npm install keythereum web3

```

ethereumjs-tx <- 서명

자바스크립트로 스마트 컨트랙트를 배포하기 위해서는 트랜잭션을 발생시켜야 하는데 (1교시 24분,,)
<br>
트랜잭션 안에는 서명이 들어가야 한다.
<br>
서명을 만들기 위해서는 개인키가 필요.
<br>
UTC-- 파일 => 개인키로 만들어서 사용할 예정
<br>
keythereum 라이브러리를 사용해 UTC-- 파일을 복호화 할 수 있다.
<br>

-   keythereum -> 개인키
-   web3 복호화 -> 개인키

<br>
<br>

## getter / setter

```typescript
class Chain {
    private chain: Block[];

    constructor() {
        this.chain = [genesisBlock];
    }

    // getter
    public getChain() {
        return this.chain;
    }

    // setter
    public setChain(_block: Block) {
        this.chain.push(_block);
    }
}
```

-   getter : 상태변수를 가져오는 것을 getter라고 한다.
-   setter : 내용을 넣어주는 것을 setter라고 한다.

<br>
typescript와 다르게 solidity에서는 public으로 상태변수를 만들면 알아서 getter 함수를 만들어준다.
<br>
public일 경우, 어디에서든 사용이 가능하기 때문에
<br>
상태변수에 public이 붙냐 안 붙냐에 따라 getter 함수를 만들어주냐 안 만들어주냐가 된다.
<br>
<br>

## 스크립트로 컴파일하기

JavaScript로 solc를 사용해 컴파일 진행.
<br>
<br>

## JavaScript 코드 작성해서 배포 진행

<br>
<br>

# Truffle

스마트 컨트랙트 개발에 많이 사용하는 프레임워크
<br>
web3 라이브러리를 가지고 스마트 컨트랙트 트랜잭션을 좀 더 쉽게 만들 수 있다.
<br>
스마트 컨트랙트 관련 코드를 web3로 작성해보고 트러플 학습
<br>

```sh
$ npm install truffle
$ npm install -g truffle
```

버전 확인

```sh
$ npx truffle version
```

truffle init

```sh
$ npx truffle init
```

**_Truffle의 역할 : Solidity 작성 & 배포 관리_**

-   build/ : 솔리디티 코드 컴파일된 내용이 들어감
-   contracts/ : 솔리디티 코드를 작성하는 디렉토리
-   migrations/ : deploy 관련 코드를 컨트랙트 별로 모아놓은 디렉토리 (배포는 한번만 실행하면 된다.)
-   test/ : 배포된 컨트랙트를 실행시켜보는 공간
-   truffle-config.js : 네트워크에 대한 설정값 등등 작성 (Truffle 환경 설정)

<br>

constracts 디렉토리 안에 솔리디티 코드 파일을 넣고 아래의 명령어 실행
<br>

**컴파일**

```sh
$ npx truffle compile
```

<br>

**배포**

1. truffle-config.js 파일 안에서 네트워크 설정값 조작.
2. migrations 디렉토리 안에서 배포 코드 작성

    - [번호]\_내용\_Contract이름 형태로 파일명 만들기

3. 배포

```sh
$ npx truffle migration
```

4. 재배포

```sh
$ npx truffle migration --reset
```

**배포된 내용 확인**

1. truffle console
2. test 코드

```sh
$ npx truffle console
```

Geth JS console과 비슷한 것

truffle로 배포한 이후에 스마트 컨트랙트 내용이 컨트랙트명의 변수 형태로 저장되어 있다.

```sh
$ HelloWorld.deployed()
$ # 배포된 내용을 가지고 온 것
```

**hello 변수에 instance 할당**

```sh
$ HelloWorld.deployed().then(instance => hello = instance)
```

HelloWorld == new client.web3.eth.Contract(abi, CA)
<br>
HelloWorld.address == hello.address

-   hello.address : CA 계정

deployed() : 배포된 이후
<br>
<br>

**상태변수 값 가져오기**

```sh
$ hello.value()
```

**상태변수 값 변경하기**

```sh
$ hello.setValue('Hello Truffle!!')
```
