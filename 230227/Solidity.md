# EVM

- Ethereum Virtual Machine
- 스마트 컨트랙트를 실행하기 위한 가상 컴퓨터
- 블록체인 네트워크 노드(peer)에 포함되어 항상 실행.
- 여기서는 geth에서 제공하는 EVM이다

  - 노드(peer)끼리의 합의에 사용
  - ByteCode 실행에 사용

  # Solidity

  - 스마트 컨트랙트 프로그래밍 언어
  - 컴파일 하여 ByteCode를 생성
  - ByteCode는 트랜잭션의 data로 저장되어 스마트 컨트랙트 실행시 사용

  # geth 새롭게 개인 네트워크 생성

  ```json
  {
    "difficulty": "200000",
    "gasLimit": "3200000",
    "alloc": {},
    "config": {
      "chainId": 816323187896126,
      "homesteadBlock": 0,
      "eip150Block": 0,
      "eip155Block": 0,
      "eip158Block": 0,
      "byzantiumBlock": 0,
      "constantinopleBlock": 0
    }
  }
  ```

- 추가된 밑에 두개옵션은 스마트컨트랙트를 실행하기위한 옵션
  - 합의 방법이 달라지면서 필요하게 되었다.

-sudo vi ./newGenesis.json 로 파일 만들어서 i누르고 위에붙여넣고 esc :wq!(강제로 저장하고 나간다)

# geth 실행

```sh
geth --datadir ~/newGeth --http --http.port 8888 --http.corsdomain "*" --http.api "admin,miner,txpool,web3,personal,eth,net" --allow-insecure-unlock --syncmode full --networkid 816323187896126 -ws --ws.port 7777 --ws.origins "*" --nodiscover --unlock "0,1" --password ./newGeth/password
```

- unlock : accounts에서의 인덱스
- password: 비밀번호가 저장된 파일
- 줄바꿈으로 입력된 unlock 인덱스들과 맞춰야한다

- nodiscover : 남이 내 노드(peer)를 못찾게 한다
- === maxpeers 0

# 계정 생성

```sh
geth --datadir ~/newGeth account new
```

personal이랑 같은 계정생성

# Geth 실행 시 unlock```````

```sh
echo 위에서 생성한 지갑 비밀번호 >> ~/newGeth/password
```

```sh
echo 1234 >> ~/newGeth/password
```

- echo << cmd, bash, powerchell에서 사용하는 console.log
- ">>" : 해당 파일에 출력값을 저장
  echo==console.log라고 생각하면됨
  ehco sdf 하면 sdf가나옴
  ls는 파일보는거 vi는 그파일 상세보기
  비밀번호같아도 또만들어야하고 newGeth가서 vi password봐야함 추가됏는지

solidity설치

- npm init -y
  -y다 예스다

# Solidity 프리티어 설정

```sh
npm i -D prettier-plugin-solidity
```

```json
{
  "prettier.documentSelectors": ["**/*.sol"]
}
```

- "prettier.documentSelectors":["**/*.sol"]
- 이런 이름이 붙어있으면 프리티어 설정을 하겠다?

- setting.json에 해당 내용을 추가
  오른쪽위에 설정열기 눌러서 setting.json파일이 나옴 거기에 추가

톱니바퀴 누르고 확장설정

# Solidity 작성

```solidity
// SPDX-License-Identifier: MIT
// 라이센스 표기 << 어떤 라이센스사용하는가 ? 필요함 주석처리를 햇지만 주석처리가 아님
pragma solidity ^0.8.15;

// 솔리디티 버전 설정, 크립토좀비

contract Test {
  // contract : javascript에서의 class와 같다
  string text;

  constructor() {
    text = "Hi Block7";
  }

  function getText() public view returns (string memory) {
    // public : 외부에서 사용가능한 데이터
    // view : 읽기 전용 데이터 처리 / pure(없어도됨)
    // returns : 반환하는 데이터
    // memory : 함수 내에서만 변수 사용, 데이터를 외부에 저장하지 않음(지역 변수 처리)( 없어도 됨)
    return text;
  }

  function setText(string memory _value) public {
    text = _value;
  }
}
```

# 컴파일(파일생성프로그램)

```sh
npm i solc
npx solc --bin --abi ./test.sol
```

- solc : Solidity Compiler
- --bin : binary, transaction에 저장되는 실제 ByteCode
- Solidity 등 우리가 작성한 코드를 EVM에서 실행할수 있는 ByteCode로 변환(컴파일 한다)
- 해당 ByteCode는 트랜잭션에 저장
- 해당 코드를 Receipt 내의 ContractAddress로 찾음(다른컴퓨터에서 찾을때? git pull등하니까 그주소가 ContractAddress라고생각하면됨)
- EVM이 알아서 코드를 실행
- --abi : Application Binary Interface, 스마트 컨트랙트내의 함수와 매개변수 등을 json형식으로 표기
- abi는 데이터의 정확한 매칭(인코딩)을 위해서 사용
- 어떤어떤 데이터(변수, 함수 ,메서드, 프로퍼티)가 있는지 미리 정해두고 맞춘다.

# 스마트 컨트랙트를 트랜잭션으로 보내기

1. 편의를 위해 변수 선언

```js
data = "0x60806040...8130033";
// solc로 생성된 bin파일 내의 모든 데이터
// data="" ""사이에 넣어준다
txObj = { from: eth.accounts[0], data, gas: 1000000 };
```

2. 트랜잭션 보내기

```sh
eth.sendTransaction(txObj)
# "0x9941642abdb93585062261fc5ae3420698f1e9a16be1c91cc71d441621e4af45" 스마트컨트랙트에 등록한 트랜잭션의 해시값임
// setetherbase하고
miner.start()
miner.stop()
채굴하기
```

3. 트랜잭션 확인하기

```sh
eth.getTransaction("0x9941642abdb93585062261fc5ae3420698f1e9a16be1c91cc71d441621e4af45")
eth.getTransactionReceipt("0x9941642abdb93585062261fc5ae3420698f1e9a16be1c91cc71d441621e4af45")

```

// nonce: 0,
r: "0x4520cdb033b9140a8780f6347a17a6942a40c5e4a74f6266c47e0424b44c7cf6",
s: "0x491e8fa871f87caafcce3c56ad8bc24e5f2e2b663e17d0e90d5639070cf0db20",
to: null,
transactionIndex: 0,
type: "0x0",
v: "0x5cce21b45dea0",
value: 0
//

- getTransactionReceipt: 채굴 후에 확인 가능
- getTransaction도 마이닝을 해야하고 txpool에서 찾을수있다

```js
   eth.getTransactionReceipt("0x9941642abdb93585062261fc5ae3420698f1e9a16be1c91cc71d441621e4af45")
{
  blockHash: "0x579ad698b50ecc0f5e5a9e143f0e7bd297f89fba055309a4e0b2f557b6307dd1",
  blockNumber: 101,
  contractAddress: "0x4bf8c872a63433b9c5a5da26c6250c8f1775231b",
  cumulativeGasUsed: 565399,
  effectiveGasPrice: 1000000000,
  from: "0x246e648805c6698b3f7f8252222ca84a927e4550",
  gasUsed: 565399,
  logs: [],
  logsBloom: "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  status: "0x1",
  to: null,
  transactionHash: "0x9941642abdb93585062261fc5ae3420698f1e9a16be1c91cc71d441621e4af45",
  transactionIndex: 0,
  type: "0x0"
}
```

- contractAddress : CA
- CA : 스마트 컨트랙트에 대한 주소
- EOA : Externally Owned Accounts, : 지갑주소 , 메타마스크/Geth내의 지갑 등을 뜻한다.
- CA/EOA 둘 다 계정으로 분류된다.

//transactionIndex: 블록내에서 몇번째 트랜잭션이냐

4. 컨트랜트 생성(연결)

```sh
contract=eth.contract([{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"getText","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_value","type":"string"}],"name":"setText","outputs":[],"stateMutability":"nonpayable","type":"function"}])
```

- 매개변수로 abi로 추출된 데이터를 입력한다

5. 컨트랙트에 CA(컨트랙트어드레스) 연결

```sh
instance=contract.at("0x4bf8c872a63433b9c5a5da26c6250c8f1775231b")
```

- at 메서드를 호출하여 ContractAddress를 매개변수로 전달
- 앞으로 스마트 컨트랙트 실행 시 instance 변수를 사용

- 스마트컨트랙트 계정이 따로있다 get set 메서드등을 찾는다 그걸 기준을 contractadress기준으로 찾는다
- solidity로 코드화 시켜서 스마트컨트랙트에 nft얼마에 팔겟다 그런거 buy라는 메서드만들어서 그런걸처리
- 그사람이 사더라도 중간단계에서 스마트컨트랙트가 처리 블록내용이 추가 그럼 그 계정에 추가

6. 컨트랙트 실행하여 확인

```sh
instance.getText.call()
```

- Solidity에서 작성해둔 getText 메서드를 호출

```sh
instance.setText("why so serious",{from:eth.accounts[0]})
```

// {}안에 트랜잭션 내용 아무거나 들어갈수있음 gas던 등등
// 두번째매개변수 from은 무조건 넣어야함 누가보냈는지 알아야하니(잔액이있는 계정이여야함-> 채굴한놈이여야함 뭐 할때매다 가스비 드니까)

- 첫 매개변수로 값을 보내고 두번째 매개변수로 트랜잭션의 내용을 전달한다
- 데이터가 바뀌었기 때문에 채굴을 통해서 블록을 생성하여 적용한다

# EVM은 무료일까?

- 유료이기 때문에 Gas(수수료)가 필요
- EVM은 왜 유료일까? => 잦은 변경을 막기 위해서, 남의 컴퓨터 쓰는데
  무료로 쓸수 있을까?
- 이더리움 블록체인 네트워크에 노드(peer)가 하나일까?

  - 해킹이 참 쉬워진다.

  - 블록안에 트랜잭션 트랜잭션안에 스마트컨트랙트 스마트컨트랜트 안에 우리가 만든 함수들

# 과제

- ganache 사용
- 가나슈는 자동마이닝이라 트랜잭션보내고 바로된다

```sh
npm i -g ganache
```

우분투쪽에 설치한다

global로 깔았으니 그냥 ganache치면 실행된다

- geth attach http://localhost:8545 로접근

eth.chainId()

"0x539"

1. data = "0x60806040...8130033"; 0x뒤에 bin파일내용 넣어줌
2. txObj = { from: eth.accounts[0], data, gas: 1000000 }; 계정 0번째로 txobj를 정의
3. eth.sendTransaction(txObj) 하면
   "0x24069d93aae9d80715b9216ecde80cd500bd0213524cd57a0433af56af9e9014" 그트랜잭션의 hash가나옴
   채굴후에(가나슈는 자동채굴) receipt로 ca받아올수있따 contract adress
   4.eth.getTransactionReceipt("0x24069d93aae9d80715b9216ecde80cd500bd0213524cd57a0433af56af9e9014")

4. contractadress를 변수로 지정
   ca="0x6e891852b443303ca167573becefcc39feacff79"
   abi=[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"getText","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_value","type":"string"}],"name":"setText","outputs":[],"stateMutability":"nonpayable","type":"function"}]
   abi를 이걸로지정
   contract=eth.contract(abi) -> 컨트랙트 생성(연결)(컨트랙트 틀을 abi를 이용해서 만든다)

instance=contract.at(ca)->컨트랙트에 CA(컨트랙트어드레스) 연결
이거 치고 나오는거 트랜잭션 hash다

instance.getText.call() 하면 test.sol에 함수내용나옴

instance.setText("why so serious",{from:eth.accounts[0]})
하면 why so serious로 값을 바꿔줌
