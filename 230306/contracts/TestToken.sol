// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract TestToken {
  mapping(address => uint256) public balances;
  // balances각 지갑 계정대한 잔액
  string public name = "dog";
  // 토큰 이름
  string public symbol = "DG";
  // 토큰 단위
  uint8 public decimals = 18;
  //   - decimals : 소수점의 개수(10 -몇승인가?, wei와 ether의 관계)
  // - wei는 ether기준 마이너스 몇승인가
  uint public totalSupply = 1000 * 10 ** decimals;

  // - totalSupply : 총 발행량

  //10 ** decimals; 이런식으로 꼭적어야함 wei기준이라
  // 1000DG가 된다 1000에 10이 18승곱해야 1000
  //msg.sender 트잭을 보낸사람

  constructor(string memory _symbol) {
    // memory는 _symbol을 constructor에서 한번쓰고 버린다
    balances[msg.sender] = totalSupply;
    // 스마트컨트랙트 배포한 지갑 계정주소잔액으로 총발행량 넣어준다
    symbol = _symbol;
  }

  function balanceOf(address _owner) public view returns (uint balance) {
    return balances[_owner];
  }

  //- view : 함수에서 변수를 호출하지만 수정하진 못한다(js의 const변수로 사용하는 느낌)
  function transfer(address _to, uint _value) public returns (bool success) {
    require(balances[msg.sender] >= _value);
    // 보내는value값이 더 작아야됨
    //     - require : 조건을 확인하여 에러를 발생하거나 코드를 계속 진행한다.
    // - 첫번째 매개변수로 조건을 전달하며 해당조건이 true면 계속진행
    // - false면 중단한다.
    // - 두번째 매개변수로 에러발생시 출력할 로그를 전달한다.
    balances[msg.sender] -= _value;
    // 문제가없을시 트랜잭션 보낸사람에게서 value만큼 돈을뺀다
    balances[_to] += _value;
    // to , 즉 받는 사람에게 value만큼 돈을 더한다.
    return true;
  }
}

// - 이건 토큰 데이터 자체(만들어만둔 데이터쪼가리) 구현한거 가스비는 여기서는 이더에서나간다

// - ganache계정가져오고 토큰가져오기로 토큰계약주소에 CA넣으면
// - 토큰 가져오기 볼수있다 DG 1000개(배포한주소기준) 아니면 0개
