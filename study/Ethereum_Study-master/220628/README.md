# web3

## ganache-cli

Listening on 127.0.0.1:8545
<br>
로컬 이더리움 네트워크 생성
<br>

```shell
$ # -X : 요청 메소드
$ # -H : 요청 헤더 내용
$ # --data : 바디 내용 / -d : 바디 내용

$ curl -X POST -H "content-type:application/json" --data '{name: "ingoo"}' http://localhost:3000

```

## 이더리움 RPC 통신

이더리움 네트워크 상에서의 요청은 아래와 같은 형식을 띤다.
<br>
request method : POST
<br>
헤더 내용의 content-type : application/json
<br>

-   Request Body

체인 아이디 1 : 메인넷
<br>
체인 아이디 2, 3, 4, 5 : 테스트넷
<br>
1337은 가나쉬가 제공해주는 체인 아이디
<br>
jsonrpc : JSON으로 인코딩된 원격 프로시저 호출
<br>
하나의 함수만 실행해서 하나의 결과물만을 얻겠다는 목적
<br>
method : 이더리움 클라이언트에서 구현되어 있는 메소드명
<br>
params : 메소드의 인자값
<br>
특정 함수만 실행시켜서 그 결과물만을 return 받겠다는 뜻.

```json
{
    "id": 1337, // 체인 아이디, 선택
    "jsonrpc": "2.0", // 필수
    "method": "eth_accounts", // 필수
    "params": [] // 메소드의 인자값
}
```

https://ethereum.github.io/execution-apis/api-documentation/

<br>

### < 계정 가져오기 >

요청 보낸 노드가 관리하는 계정 정보만 가져온다.

```shell
$ curl -X POST \
    -H "Content-type: application/json" \
    --data '{ "jsonrpc": "2.0", "method": "eth_accounts", "params": [] }' \
    http://localhost:8545
```

<br>

### < 잔액 조회 >

인자값 2개 : 계정주소(address)/필수 , Block/옵션
<br>
latest 블록까지의 tx 조회
<br>

```shell
$ curl -X POST \
    -H "Content-type: application/json" \
    --data '{ "jsonrpc": "2.0", "method": "eth_getBalance", "params": ["0xCE3c05be302b50314C1f82116771f88Cd6C0dD4E", "latest"] }' \
    http://localhost:8545
```

모든 블록체인 클라이언트들은 위와 같은 rpc 통신을 할 수 있다.
<br>
<br>
메소드 종류

-   evm_snapshot [] : return 값 숫자
-   evm_revert ["0x1"] : 1번으로 돌아간다.
-   evm_mine ["timestamp"] : 블록 마이닝 (매개변수는 timestamp)

<br>
이더리움 클라이언트에서 rpc 통신을 사용해 블록체인 네트워크에 요청을 보낸다.
<br>
이러한 요청을 쉽게 보낼 수 있게 해주는 것이 web3 라이브러리

```shell
npm install web3
```

<br>

# web3

환경설정

```shell
$ npm init -y

$ npm install -D jest
```

<br>

**package.json**

```json
"scripts": {
    "test": "jest"
}
```

**jest.config.js**

```js
const config = {
    verbose: true,
    testMatch: ['<rootDir>/**/*.test.js'],
};

module.exports = config;
```

**web3.test.js**

```js
describe('web3 테스트 코드', () => {
    it('테스트', () => {
        console.log('hello web3');
    });
});
```

**web3 설치**

```shell
$ npm install web3
```

```shell
$ npm install ethereumjs-tx
$ # Transaction 객체를 Ethereum Client가 이해할 수 있게 만들어주는 라이브러리 + tx 내용으로 서명까지 만들어준다.
```
