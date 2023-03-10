```shell
cd 230309
npm init -y
npm i truffle
npm i -D prettier-plugin-solidity
npx truffle init
```

- shell, sh , bash

# ERC20 토큰 구현

- 오늘 수업! javascript에서 blockchain 구현했을때와 같다.

## interface 구현

- 표준에 지키기 위해서 선언을 먼저 해두자.
- typescript에서 했던것과 마찬가지로 정의를 하지 않고 선언만

- erc20토큰 만들때 함수명같은거 이더리움측에서 정해줌

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IERC20 {
  //함수명은 이거랑 동일해야한다
  function totalSupply() external view returns (uint);

  // 토큰(코인)의 총 수량

  function balanceOf(address account) external view returns (uint);

  // 지갑 계정의 잔액(토큰)

  function transfer(address recipient, uint amount) external returns (bool);

  // 토큰(코인) 보내기

  function allowance(address owner, address spender) external returns (uint);

  // 권한을 위임받은 토큰을 관리하는 데이터 공간

  function approve(address spender, uint amount) external returns (bool);

  //권한을 위임하는 메서드

  function transferFrom(
    address spender,
    address recipient,
    uint amount
  ) external returns (bool);

  // 권한을 위임 받은 토큰에대해 거래(보내기)

  event Transfer(address indexed from, address indexed to, uint amount);
  // 거래 시 기록하는 이벤트
  event Approval(address indexed owner, address indexed spender, uint amount);
  // 권한 위임시 기록하는 이벤트
}
```

- totalSupply() : 토큰의 총 수량 반환

- balanceOf(account) : 지갑 계정(account)의 잔액 반환

- transfer(recipient, amount) : 수령인(recipient)에게 n(amount)개의
  토큰을 보낸다. 트랜잭션 발생

- allowance(owner,spender): 현재 지갑 계정(owner)이 다른 누구(다른 지갑 계정 | CA)에게 얼마의 토큰에 대한 권한을 줬는지 반환

- approve(spender,amount) : allowance에서 확인할수 있는 권한 위임을 실행하는 메서드, 누구(spender)에게 얼마(amount)만큼의 토큰에 대한 권한을 위임

- transferFrom(spender, recipent,amount): 위임 받은 지갑 계정(spender)이 누구(recipient)에게 얼마(amount)만큼의 토큰을 보낸다.

- Transfer(from, to, amount) : 누가(from) 누구(to)에게 얼마(amount)만큼의 토큰을 보냈는지 기록

- Approval(owner, spender, amount) : 누가(owner) 누구(spender)에게 얼마만큼(amount)의 토큰에 대한 권한을 위임 했는지 기록

## 추가 설명

- 메서드 옵션
  -external : 해당 스마트 컨트랙트 내부에서 호출하지못하고 외부에서만 호출할수있도록 설정
  -internal: 해당 스마트 컨트랙트 외부에서 호출하지못하고 내부에서만 호출할수있도록 설정

  - external과 internal은 가시성이라고 부르고 외부에서 보이는지,
    내부에서 보이는지를 설정
    -view : 해당 스마트 컨트랙트의 변수(데이터)를 사용할수잇지만 수정하지 못하도록 설정
    -pure : 해당 스마트컨트렉트의 변수(데이터)를 사용할수도 수정할수도 없도록 설정

    - Javascript로 예제

    ```js
    let aa = 1;
    let bb = 2;
    function add(a, b) {
      // pure의 메서드이다.
      return a + b;
    }
    add(aa, bb);
    ```

  - view와 pure는 외부에서 호출시 gas를 소모하지않는다.
  - function 이름(매개변수) (public | private | external | internal)( | view | pure)( | virtual & override){}
  - 접근제한자 안쓰면 함수는 public 변수는 private

- event 옵션
- indexed : 이벤트를 받아올 시 검색 또는 필터링 할수 있도록 설정

  - mySQL에서의 index와 같다

  ### interface 원칙

  - They cannot inherit from other contracts, but they can inherit from other interaces.
  - 상속 가능(인터페이스끼리는 가능)
  - All declared functions must be exteranl in the interface, even if they are public in the contract.
  - 외부에 있어야함 (external만 사용가능)
  - They cannot declare a constructor.
  - 생성자 불가
  - They cannot declare state variables.
  - 변수 불가
  - They cannot declare modifiers.
  - 한정자(modifier) 불가

## ERC20 구현

- IERC20 을 상속받아 구현

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./IERC20.sol";

// IERC20을 가져온다

contract ERC20 is IERC20 {
  // is는 상속 받는 옵션, extends와 동일
  string public name;
  string public symbol;
  uint8 public decimals = 18;

  uint public override totalSupply;
  // 함수를 변수로 덮어썻다
  // 인터페이스에서 선언된 함수는 기본적으로 virtual옵션을 갖는다.(생략되어있음)
  //virtual 옵션이 있는 메서드를 상속받을경우 override옵션을 추가해야한다.
  // 상속할때 상속받는 컨트렉트에서 메서드를 다시 작성하여 덮어 쓸 경우 상속하는 메서드는 virtual, 상속받는 메서드는 override 옵션을 가져야한다.
  mapping(address => uint) public balances;
  mapping(address => mapping(address => uint)) public override allowance;
  // { address: {address : uint} }
}

// 토큰을 보내는거
 function transfer(
    address recipient,
    uint amount
  ) external override returns (bool) {
    balances[msg.sender] -= amount;
    balances[recipient] += amount;
    emit Transfer(msg.sender, recipient, amount);
    return true;
  }

// 이건 쓰고싶은만큼 써라 카드를 주는거라고생각
function approve(
  address spender,
  uint amount
) external override returns (bool) {
  allowance[msg.sender][spender] = amount;
  emit Approval(msg.sender, spender, amount);
  return true;
}
// amount로 지정된 만큼만 쓸수있게 한을 준다

// msg.sender, 트랜잭션을 보낸 지갑 계정의 토큰을 spender에게 amount만큼 사용할수있도록 권한을 위임한다
- allowance(카드)라고생각하면됨(권한) ->대신팔아달라는느낌이다
// 엄카 받기 -> 위임하면 이미 차감됐다고 뜬다. 거래완료되면 위임해준사람한테 간다

function transferFrom(
  address sender,
  address recipient,
  uint amount
) external override returns (bool) {
  require(allowance[sender][msg.sender] >= amount);
  allowance[sender][msg.sender] -= amount;
  balances[sender] -= amount;
  emit Transfer(sender, recipient, amount);
  return true;
}
// approve 메서드를 토큰에 대해 권한을 부여받은 지갑 계정(spender)가  위임받은 토큰을 다른계정에 보낼때 사용하는 메서드
// - approve 메서드의 msg.sender => transferfrom 메서드의 sender
// - approve 메서드의 spender => transferfrom 메서드의 msg.sender


function mint(uint amount) internal {
    // 토큰 발행 메서드
    balances[msg.sender] += amount;
    // 트랜잭션을 보낸지갑 계정에 원하는 만큼 토큰 추가
    totalSupply += amount;
    //총 수량에 추가
    emit Transfer(address(0), msg.sender, amount);
    // address(0)는 주소에서의 null을 뜻한다(처음생성했다)->채굴했다고 보면된다.
  }

  function burn(uint amount) external {
    // 토큰 삭제 메서드, 소각한다고 말한다.
    balances[msg.sender] -= amount;
    totalSupply -= amount;
    emit Transfer(msg.sender, address(0), amount);
  }
```

## 내 토큰 구현

- ERC20을 상속받아 구현

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./ERC20.sol";

contract BitToken is ERC20 {
  address public owner;
  // 토큰 등록자

  uint256 public ethCanBuy = 100;

  // 토큰의 가격
  // 1 ETH = 100 내토큰

  constructor() {
    owner = msg.sender;
    name = "BitToken";
    symbol = "Bitcoin";

    mint(5000 * 10 * decimals);
    // 등록자가 최초로 토큰을 받는다.
  }

  receive() external payable {
    // 익명 함수이다.
    require(msg.value != 0);
    // 트랜잭션에 value가 없으면 멈춘다.
    uint amount = msg.value * ethCanBuy;
    // 받은 Ether를 토큰으로 변환한다..

    require(balances[owner] >= amount);
    // 발행자의 지갑계정에서 트랜잭션 보낸 지갑 계정에 토큰을 보낸다
    // 주인이갖고잇는게 많은지
    balances[owner] -= amount;
    balances[msg.sender] += amount;

    if (msg.sender == owner) {
      //만약 발행자가 트랜잭션을 보냈다면 토큰을 추가로 발행한다
      mint(amount);
    }
    emit Transfer(owner, msg.sender, amount);
  }
}
```

- 익명함수
- 받은 트랜잭션 내에 data가 없을때 실행된다. => 토큰을 보내는 트랜잭션일때 , 오류 트랜잭션일때
- sendTransaction({from:from, to:to, value:value})<< Ether 보낼때
- sendTransaction({from:from,data:data})<< 스마트 컨트랙트 실행때
  -fallback() : 기존의 익명함수, value의 유무와 관계없이 실행된다.(data가 없으면)
  -receive() : 추가된 익명함수 value가 있을때 실행된다.
