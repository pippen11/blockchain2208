# Smart Contract

<br>

스마트 컨트랙트 실행 -> solidity 문법 순으로 학습할 예정
<br>
code -> byte code -> tx -> mining
<br>

1. 컴파일러를 통해 작성된 코드를 바이트 코드로 변환

2. 바이트 코드로 트랜잭션을 발생시켜야 한다.

3. 트랜잭션을 통해 이더리움 네트워크에 전송

<br>
<br>

## vsCode Extension

solidity 설치
<br>
<br>

## Solidity

확장자는 .sol
<br>
Compiler : 작성된 코드를 바이트 코드로 변환
<br>
EVM이 해석 가능하게 해주는 바이트 코드로 변환해주는 기계에도 버전이 있다.
<br>

```solidity

pragma solidity ^0.8.15;

contract HelloWorld {
    string text;

    constructor() {
        text = 'Hello World!';
    }

    // 함수를 작성할 때는 function 키워드 필수
    // 디폴트는 public (모두가 접근 가능)
    // view 함수
    // 상태변수를 그대로 출력하는 함수
    function getText() public view returns(string memory) {
        return text;
    }

    // 인스턴스에 있는 상태변수를 바꾸는 함수
    function setText(string memory value) public {
        text = value;
    }
}

```

솔리디티는 기본적으로 객체 지향적 언어
<br>
하나의 컨트랙트는 하나의 객체
<br>

```typescript
class HelloWorld {
    public text: string;

    constructor() {
        this.text = 'Hello World!';
    }

    getText(): string {
        return this.text;
    }

    setText(value: string): void {
        this.text = value;
    }
}

const obj = new HelloWorld();
console.log(obj.getText()); // Hello World!
```

<br>

## 스마트 컨트랙트 실행하기

1. Solidity 작성
2. Solidity Code Compile
    - 2.1 brew
    - 2.2 ...
    - 2.3 npm install solc (NodeJs 환경에서 컴파일 할 수 있는 라이브러리)

```shell
$ npm install solc
```

<br>

**컴파일 명령어**

```shell
$ npx solc --bin --abi [디렉토리/파일명]
```

<br>

**컴파일 진행 목적**

1. Bytecode 만들기 위해
2. ABI 만들기 위해 (Application Binary Interface)

<br>

이더리움 네트워크에 있는 특정한 함수, 특정한 값을 불러올 때 이더리움 네트워크가 가지고 있는 것은 바이트 코드이다. 트랜잭션에 내용을 넣을 때 코드 전체를 넣는 것이 아니라 컴파일을 진행한 바이트코드를 담아서 이더리움 네트워크 상에 올리는 것. 바이트 코드이기 때문에 데이터를 어떻게 보내줘야 하는지에 대한 이슈가 발생한다.
<br>
즉, 이더리움 네트워크 상에 데이터는 존재하지만 어떻게 전달해야 하는지에 대한 이슈.
<br>
abi 라는 파일은 사용자가 이더리움 네트워크에 요청을 해서 데이터를 보내줄 때 어떠한 형태의 객체 형태로 보내줄 것인지에 대한 결정 파일.

<br>

**실행파일 & abi 생성**

```shell
$ npx solc --bin --abi ./Contracts/HelloWorld.sol
```

<br>

-   배포 : 이더리움 네트워크 상에 바이트 코드를 올리는 행위
-   abi : 사용자가 이미 이더리움 네트워크 상에 올라가 있는 스마트 컨트랙트 코드를 호출할 때 사용

<br>

**스마트 컨트랙트 배포**

```shell
personal.sendTransaction({from: '', data: ''})

```

스마트 컨트랙트의 배포에 있어서는 누가 어떤 코드를 배포할 것인지가 중요하기 때문에 to, value 속성이 필수요소가 아니다.
<br>
<br>

geth 디렉토리 안의 keystore 라는 곳에 암호화 되어 있는 계정 정보 파일이 존재.
<br>
단방향 암호화가 아니기 때문에 복호화가 가능. UTC-... 파일을 가지고 복호화를 진행하면 개인키가 나온다. 이 때 필요한 것이 계정을 생성할 때 작성했던 password. 개인키를 날 것 그대로 저장하면 보안상 취약할 수 있기 때문에 암호화를 진행해서 개인키를 저장한 것이라 생각하자.
<br>
unlock 이라는 기능을 만들어서 password를 알고 있는 사용자만 account의 개인키를 사용할 수 있게끔 하였다.
<br>

```shell
eth.unlockAccount('', '')
eth.sendTransaction()
```

1. Geth 실행

```shell
$ geth --datadir node --http --http.addr "0.0.0.0" --http.port 9000 --http.corsdomain "*" --http.api "admin,eth,debug,miner,net,txpool,personal,web3" --syncmode full --networkid 2371 --port 30300 --ws --ws.addr "0.0.0.0" --ws.port 9005 --ws.origins "*" --ws.api "admin,eth,debug,miner,net,txpool,personal,web3" --allow-insecure-unlock --unlock "0,1" --password "./node/password"
```

-   --allow-insecure-unlock --unlock "0, 1" --password "./node/password"
-   --unlock 의 값은 eth.accounts 기준 인덱스 값
-   --password 경로 : "./node/password"

<br>

2. Geth JavaScript Console 창

```shell
$ geth attach ws://127.0.0.1:9005
```

-   콘솔 창에서 변수 저장 가능.
-   bin 파일에 있는 내용 저장.
    -   bytecode="0x......" (0x 반드시 붙일 것, string으로 할 것)
-   abi 파일을 객체 형태로 저장.
    -   abi 파일 내용 그대로 abi 변수에 할당

<br>

3. 트랜잭션 발생시키기

-   from 속성과 data 속성만 넣어주면 된다.

```js
txObject = {
    from: eth.coinbase,
    data: bytecode,
};
```

unlock을 했기 때문에 eth.sendTransaction() 가능

```shell
eth.sendTransaction(txObject)
```

transaction hash : 0x106185a587177fad86589aa8147ce89e6a4cd879082c392086a92201f4f4f6af

<br>

**_트랜잭션 hash 값을 이용해 트랜잭션 내용 조회_**

```shell
eth.getTransaction('0x106185a587177fad86589aa8147ce89e6a4cd879082c392086a92201f4f4f6af')

eth.getTransactionReceipt('0x106185a587177fad86589aa8147ce89e6a4cd879082c392086a92201f4f4f6af')
```

input 이 있다면 스마트 컨트랙트와 관련된 트랜잭션이다.

-   eth.getTransaction() :
-   eth.getTransactionReceipt() : contractAddress 조회 가능

CA : 0xe6690c5af8e587294092adeee55d260b2283b5ad

<br>

## 계정의 종류

-   EOA
-   CA : CA 계정에 스마트 컨트랙트 내용이 담겨 있다. CA를 통해 스마트 컨트랜트 코드에 접근할 수 있다. (스마트 컨트랙트가 생성되었을 때 나오는 계정) 스마트 컨트랙트의 고유한 키 값이라고 생각하자. 스마트 컨트랙트 안의 함수를 호출하거나 값을 가져오거나 할 때 CA 사용.

<br>
스마트 컨트랙트에 접근하기 위해서는 CA 계정을 알아야 한다.
(배포한 스마트 컨트랙트의 고유한 키 값)
<br>
<br>

**eth 모듈에서 받아올 객체 형태를 지정한다.**

```shell
contract=eth.contract(abi)
```

abi를 이용해 바이트 코드로 변환된 컨트랙트 해석.
<br>
<br>

return 값이 object -> eth 객체에서 abi 속성값이 추가된 것.
<br>
at, getData, new 메소드 추가.
<br>

**해당 컨트랙트에 접근하겠다.**

```shell
instance=contract.at('CA')
instance=contract.at('0xe6690c5af8e587294092adeee55d260b2283b5ad')
```

생성된 인스턴스를 가져오겠다는 뜻.
<br>
<br>

**컨트랙트 실행**

```shell
instance.getText.call()
```

혹시 안된다면,,

```shell
instance.getText({from: eth.coinbase})
```

블록이 마이닝 될 때 트랜잭션 내용(바이트 코드)이 EVM에서 실행되면서 인스턴스가 생성됨.
CA를 이용해 생성된 인스턴스를 불러온 것.
<br>
인스턴스가 한번 밖에 생성되지 않는 싱글톤 객체이다. 하나의 컨트랙트는 인스턴스를 무조건 하나만 생성한다.
<br>
abi 파일이 있어야만 바이트 코드로 작성된 내용을 알 수 있다.
<br>
abi 파일은 컨트랙트 내용을 실행시킬 때 사용. (바이트 코드를 해석하기 위한 용도)
<br>
<br>

## call 과 send

call : 가지고 있는 데이터를 불러오는 행위
<br>
send : 값을 전달해서 상태변수를 바꾸는 행위
<br>
내용을 바꾼다는 것은 저장 공간이 달라지는 것을 의미
블록체인 네트워크 상의 저장 용량은 한계적, 따라서 추가 비용을 지불하고 저장 용량을 바꿔야 한다. (EVM을 돌리기 위한 비용을 지불하는 셈) 내용을 바꾸기 위해서는 트랜잭션으로 내용을 변경해야 한다. 내용을 불러오는 행위와 내용을 바꾸는 행위는 코드의 내용이 달라진다.

-   배포
-   스마트 컨트랙트의 상태를 바꾸는 행위 : send -> 수수료 지불
-   call : 비용 지불 할 필요 X

<br>
<br>

**배포**

```shell
contract=eth.contract(abi)

# 트랜잭션 배포
instance=contract.new(txObject)

instance.getText.call()
instance.setText('asdf')

```

1. 솔리디티 코드 재작성
2. 컴파일 다시 작업
3. abi 변수와 , bytecode 변수 재설정
4. txObject 만들기
5. contract 변수 만들기
6. instance 변수 만들기
7. 마이닝
8. instance 변수 확인
    - 8.1 setText 함수와 getText 함수 확인하기
9. instance.getText.call() 확인해보기
10. instance.setText('hello ingoo', {from: eth.coinbase}) // 상태 업데이트에서는 from 계정 정보 필요
11. txpool 확인하기
12. 마이닝
13. instance.getText.call() 확인해보기

transaction hash : 0x1fd467fab6b7c0ad3fbfd1cde81dbb1d2b042c291ec66907a234619343868f6c
<br>
CA : 0x499cd0cf67e39c71b2fb7d60a5f293c4d76bdcb2
<br>
<br>

위와 같은 프로세스를 자동적으로 해주는 프레임워크 존재
<br>

1. 프레임워크 - Truffle(web3 라이브러리 사용), HardHat(ethers 라이브러리 사용)
2. Remix IDE
