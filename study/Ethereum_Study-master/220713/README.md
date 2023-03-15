# 스마트 컨트랙트로 Counter 만들기

디렉토리 구조

-   truffle
-   front

front

```sh
$ npx create-react-app front
```

truffle

```sh
$ npx truffle init
```

ganache 열기

```sh
$ npx ganache-cli
```

<br>
<br>

## 메타마스크

네트워크 추가 및 계정 추가

<br>
<br>

## truffle

contracts/ 디렉토리 안에 Counter.sol 파일 작성
<br>
배포를 진행해서 작성된 스마트 컨트랙트 확인
<br>
truffle-config.js networks 설정
<br>

```sh
$ npx truffle compile

$ npx truffle migration
```

migration으로 배포를 진행.
<br>
가스비를 지불해야하기 때문에 ganache 계정에서 가스비만큼 금액이 차감된다.
<br>

```sh
$ npx truffle console
```

truffle 콘솔창에 들어가서

```sh
$ Counter.deployed().then( instance => it = instance )
```

```sh
$ it.current.call()
```

결과물이 BN
<br>
솔리디티의 integer는 숫자가 큰 경우가 많다. 기본적으로 1 ETH만 하더라도 10^18
<br>
실제로 1ETH의 내용을 저장하기 위해서는 10^18이라는 숫자를 저장하고 있어야 한다.
<br>
엄청나게 큰 숫자를 저장해야 하는 경우가 많기 때문에 자바스크립트에서 call()을 하거나 할 때 BN으로 오는 경우가 많다.
<br>
BN : Big Number (큰 숫자를 관리하는 객체)
<br>
자바스크립트가 큰 숫자를 객체 형태로 쪼개서 표현한 것이라고 생각하면 된다.
<br>
<br>

```sh
$ it.increment()
```

상태변수 변경하는 함수 실행
<br>
스마트 컨트랙트를 실행시켰기 때문에 트랜잭션이 발생
<br>
<br>

CA : '0xB275b8A06f34d9428CB34e5c1be036c863215db8'
<br>
truffle에서는 배포가 완료되면 build 디렉토리의 json 파일에 CA 값을 업데이트 해준다.
