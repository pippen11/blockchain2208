230306파일에

```bash
npm init -y
npm i truffle
npm i -D prettier-plugin-solidity
npx truffle init
npx truffle compile
npx truffle migration
npx truffle console
```

# Solidity 문법

-타입(자료형)

- int : 정수
- string : 문자열
- \*\*\*[] : 배열
- address : 주소(지갑 계정 주소 | CA)

- msg.sender: 보낸 지갑 계정

- mapping : javascript의 객체와 비슷하다
- 형식은 mapping(키 => 값) 매핑이름
- hashMap, 키는 저장되지 않는다.
- hashMap은 키를 hash화하여 해당 메모리 주소에 저장한다.
- 키를 해시화해서 어떤곳에 넣는다고생각
- hash 방식은 keccak256을 사용

```js
let test = [];
test[2414231] = "asdfsdf";
test["키의 hash"] = "값";
test["키의 hash"] = "값1";
```

- contructor에 매개변수 전달 -함수의 매개변수 저장 위치

  - 옵션 명
  - 안쓰면안됨
  - storage : 블록체인 네트워크에 저장하여 공유된다
  - memory : 함수 내에서만 사용하고 버린다.
  - 구조체(struct), 배열(array), 매핑(mapping)에 사용해야한다
  - int 는 정수형 타입으로 배열로 나타낼수 없다
  - string은 문자열로 배열과 같이 메모리를 사용한다.
  - 1_deploy_Test.js에서 매개변수 전달

- 안주면 터진다

```js
deployer.deploy(Test, "asdf", 123);
```

- asdf는 contructor(\_text)의 매개변수 넘겨주려고 썼다.
- compile은 sol파일 수정햇을때만
- truffle-config 이부분 주석풀고 배포
- development: {
  host: "127.0.0.1", // Localhost (default: none)
  port: 8545, // Standard Ethereum port (default: none)
  network_id: "\*", // Any network (default: none)
  },

  constructor 초기값 설정해주기위한 함수라 생각하면된다
  instance생성될때 생성,

  - 스마트컨트랙트 소유자는 coinbase지갑이다(ganache기준)

  - 배포한 지갑 주소 확인하기

  ```bash
  npx truffle console
  Test.deployed().then(instance => test = instance)
  test.owner()
  web3.eth.getTransactionReceipt("0x7b7e18aef80278b066f38fd2873eafcab1c8c7a0539280db487f168f18d2d894")
  ```

  Test.deployed().then(instance => test = instance)
  test는 변수명임 aaa로하면 aaa.owner()로 할수있음
  Receipt안의 ""는 transaction의 hash이다

  - web.eth.getTransactionReceipt('트랜잭션 해시')

```js
const deployed = new web3.eth.Contract(abi, CA);
//deployed, 이미 배포된 스마트 컨트랙트 정보를 가져온다.
```

- Test객체가 이미 abi와 CA를 갖고있다.
- Test의 deplyed 메서드를 호출하면 위의 JS 코드처럼 배포된
  스마트 컨트렉트 정보를 가져온다. 단, Promise형식이다.
- Promise 형식에 따라 then을 사용하여 배포된 스마트 컨트랙트를
  가져오는데 성공하면 가져온 객체를 test에 정의한다
- 이후 test로 스마트컨트렉트의 메서드,변수들을 호출할수있다.

## MIT 라이센스

- 미국 매사추세츠 공과대학교(MIT)에서 학교 학생들을 돕기위해 개발한 라이센스

# 간단한 토큰 구현

- 토큰은 Ethereum 기반이다.
- ERC20, ERC721, ERC1155 << 많이알려진 토큰
- ERC20(FT)
- ERC721은(NFT) : 하나의 NFT는 하나의 소유자를 갖는다.
- ERC1155(NFT) : 하나의 NFT는 다수의 소유자를 갖는다.
- ERC223, ERC621, ERC777
- 가장 기본적인 토큰으로 ERC20이라고 한다.
- Ethereum Request for Comment 20
- 이더리움 블록체인 네트워크에서 정한 표준 토큰
- 스마트 컨트랙트로 생성
- FT / NFT
- FT : Fungible Token / 대체 가능한 토큰
- NFT : Non Fungible Token / 대체 불가능한 토큰
- 아래의 코드는 내용을 최소화하여 완벽히 작동되지는 않는다.

```solidity
    mapping(address => uint256) public balances;
    string public name;
    string public symbol;
    uint8 public decimals;
    uint public totalSupply;
```

- balances : 각 지갑 계정에 대한 잔액
- name : 토큰 이름(Ether)
- symbol : 토큰 단위(ETH)
- decimals : 소수점의 개수(10 -몇승인가?, wei와 ether의 관계)
- wei는 ether기준 마이너스 몇승인가
- totalSupply : 총 발행량

```solidity
function balanceOf(address _owner) public view returns (uint balance) {
  return balances[_owner];
}
```

- view : 함수에서 변수를 호출하지만 수정하진 못한다(js의 const변수로 사용하는 느낌)

- 잔액 보내기

```solidity
function transfer(address _to, uint _value) public returns (bool success) {
  require(balances[msg.sender] >= _value);

  balances[msg.sender] -= _value;
  // 문제가 없을시 트랜잭션을 보낸 사람에게서 value만큼 돈을빼고
  balances[_to] += _value;
  // to , 즉 받는 사람에게 value만큼 돈을 더한다.
  return true;
}
```

- require : 조건을 확인하여 에러를 발생하거나 코드를 계속 진행한다.
- 첫번째 매개변수로 조건을 전달하며 해당조건이 true면 계속진행
- false면 중단한다.
- 두번째 매개변수로 에러발생시 출력할 로그를 전달한다.

- 이건 토큰 데이터 자체(만들어만둔 데이터쪼가리) 구현한거 가스비는 여기서는 이더에서나간다

- ganache계정가져오고 토큰가져오기로 토큰계약주소에 CA넣으면
- 토큰 가져오기 볼수있다 DG 1000개(배포한주소기준) 아니면 0개
