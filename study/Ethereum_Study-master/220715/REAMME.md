# Token 만들기

```typescript
interface Block {
    nonce: number
    hash: string
    ...
}

```

interface : 객체를 담을 모양을 본 뜬 내용
<br>
토큰을 만들기 위해서도 이러한 interface가 기본적으로 탑재되어 있다.
<br>

```typescript
interface balance {
    address: string;
    amount: number;
}

interface token {
    name: string;
    symbol: string;
    balances: balance[]; // Solidity에서는 mapping
}
```

```typescript
token {
    name: 'ingoo',
    symbol: 'ink',
    balances: [ // balances에는 UTXO 처럼 내용이 담겨있다.
    // 해당 계정의 남은 금액만 배열로 쭉 담는다.
        {
            address: '0x58...',
            amount: 1000
        }
    ]
}
```

ERC-20 : 함수명을 정해놓자라는 규격 자체를 ERC라 표현
<br>
ERC-20은 토큰을 숫자(integer)로 표현 , ERC-721은 토큰의 형태를 객체로 표현
<br>
함수명이 정해진 데로 숫자만 채워넣으면 토큰이 된다.

<br>
특정 변수에 특정 값을 담으면 생성하고자 하는 토큰의 정보가 된다.
<br>
토큰을 만들기 위해서는 정해진 규격을 따라야 한다.
<br>
토큰이라는 것을 만들 때 정해진 규격으로 만들어야 하고 변수명 역시 정해진 데로 만들어야 한다.
<br>

```solidity
mapping(string=>uint256) public balances;
// 데이터 타입 / 접근 제한자 / 변수명

mapping(uint256=>string)
// 자바스크립트적으로 표현하자면 객체이다.
// 앞자리가 객체의 속성명, 뒷자리가 속성값(value)
{
    0: "asdf"
}

```

Solidity에는 address라는 데이터 타입이 존재한다.
<br>
address는 string을 다룰 수 있는 20byte 짜리 변수
<br>
개인키 => 64글자 , 32byte (1byte당 2글자)
공개키 => 64글자
주소/계정 => 40글자, 20byte
<br>
계정 혹은 주소를 저장할 수 있는 데이터 타입인데 string으로 20byte를 저장할 수 있는 공간.
<br>
address 는 계정을 저장하는 데이터 타입

```solidity
address public user
address = 20byte
```

```solidity
mapping(address=>uint256) public balances;
{
    "0x01..": 1000,
}
```

어떤 계정이 얼마를 가지고 있다는 표현
<br>
public이기 때문에 getter 함수 만들어짐
<br>
balances["0x01.."] == 1000
<br>
<br>

```js
txObject = {
    from: '보낼 사람',
    to: CA
    data: '0x....00000000000000000000x123847'  // 함수에 인자값이 있다면 0을 기준으로 구분값을 줘서 표현한다.
}

```

SimpleStore.json -> bytecode

0x6080604052348015600f57600080fd5b5060405160e338038060e38339818101604052810190602d9190606f565b80600081905550506097565b600080fd5b6000819050919050565b604f81603e565b8114605957600080fd5b50565b6000815190506069816048565b92915050565b60006020828403121560825760816039565b5b6000608e84828501605c565b91505092915050565b603f8060a46000396000f3fe6080604052600080fdfea2646970667358221220c10c0ae99145639f0608c91d4cecc7e6b82fe445fc82efb4834e618105f3bdd564736f6c634300080f0033

web3.eth.getTransaction('')

0x6080604052348015600f57600080fd5b5060405160e338038060e38339818101604052810190602d9190606f565b80600081905550506097565b600080fd5b6000819050919050565b604f81603e565b8114605957600080fd5b50565b6000815190506069816048565b92915050565b60006020828403121560825760816039565b5b6000608e84828501605c565b91505092915050565b603f8060a46000396000f3fe6080604052600080fdfea2646970667358221220c10c0ae99145639f0608c91d4cecc7e6b82fe445fc82efb4834e618105f3bdd564736f6c634300080f0033000000000000000000000000000000000000000000000000000000000000000a

인자값을 0을 사용해 구분한다.

### truffle console

> SimpleStore.deployed().then(it=> instance=it)

# Solidity 구조체

<br>
구조체는 TypeScript의 interface와 흡사하다.
<br>
interface는 객체를 생성하는 능력은 없었다. 하지만 구조체는 가능.
<br>

솔리디티의 contracts는 클래스와 비슷하다. 싱글톤으로 하나의 인스턴스를 생성한다.
<br>
솔리디티의 interface와 같은 역할을 하면서도 객체를 생성하는 것이 가능하다. interface와 클래스를 합쳐놓은 개념?
<br>

구조체 특징

1. 상태변수가 없다.
2. 상속이 안된다.

특정 메소드의 인자값을 객체로 전달할 때 구조체를 이용하면 효율적.
<br>
간단하게 객체를 만들고 싶을 때 사용하는 것.
<br>
<br>

# Solidity 정적 배열, 동적 배열

```typescript
const arr: string[] = [];
```

정적배열은 크기를 fix 하는 것 <- 메모리 공간을 fix해주기 때문에 가스비 측면에서 효율적
동적배열은 정해진 크기가 없다.

```solidity
contracts SimpleStore {
    string[5] public arr; // 5개까지 담을 수 있는 공간 생성

}
```

상태변수를 보여주는 것은 view 함수
<br>
상태변수 이외의 값을 건드리는 건 pure 함수,
<br>
구분값은 상태변수
<br>
