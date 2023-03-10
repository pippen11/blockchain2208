// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./IERC20.sol";

contract ERC20 is IERC20 {
  string public name;
  string public symbol;
  uint8 public decimals = 18;
  // 소수점자리수 지정 10의 18승 wei가 1이더라서

  uint public override totalSupply;
  mapping(address => uint) public balances;
  mapping(address => mapping(address => uint)) public override allowance;

  //지갑 계정의 잔액(토큰)
  function balanceOf(address account) external view override returns (uint) {
    return balances[account];
  }

  // msg.sender가 recipient한테 보내는내용
  // 그냥 토큰 코인 보내기
  function transfer(
    address recipient,
    // recipient 수령인
    uint amount
  ) external override returns (bool) {
    balances[msg.sender] -= amount;
    // msg.sender 보내는사람
    balances[recipient] += amount;
    emit Transfer(msg.sender, recipient, amount);
    return true;
  }

  // allowance는 권한 위임받는 토큰을 관리하는 데이터 공간이다
  function approve(
    address spender,
    uint amount
  ) external override returns (bool) {
    allowance[msg.sender][spender] = amount;
    // 권한을 위임받는(spender사람) 양
    emit Approval(msg.sender, spender, amount);
    return true;
  }

  //   // msg.sender, 트랜잭션을 보낸 지갑 계정의 토큰을 spender에게 amount만큼 사용할수있도록 권한을 위임한다
  // - allowance(카드)라고생각하면됨(권한) ->대신팔아달라는느낌이다
  // // 엄카 받기 -> 위임하면 이미 차감됐다고 뜬다. 거래완료되면 위임해준사람한테 간다

  // 권한을 위임받는 토큰에대해 거래(보내기)
  function transferFrom(
    address sender,
    address recipient,
    uint amount
  ) external override returns (bool) {
    // approve의 msg.sender(권한위임하는사람)가 여기서는 sender이다
    // approve의 spender(위임받는사람)가 여기서는 msg.sender이다
    require(allowance[sender][msg.sender] >= amount);
    // amount값보다 크거나 같아야 보내줄수있어서 권한받은게 크거나 같아야함
    allowance[sender][msg.sender] -= amount;
    //  위임받는사람의 위임받는잔액에서 amount를 빼고
    balances[sender] -= amount;
    //  위임하는사람의 잔액에서 amount가나감
    balances[recipient] += amount;
    // 받는사람의 잔액에서 amount가 추가됨
    emit Transfer(sender, recipient, amount);
    return true;
  }

  // 토큰 발행 메서드
  function mint(uint amount) internal {
    balances[msg.sender] += amount;
    // 트잭 보낸 지갑계정에 원하는만큼 토큰 추가
    totalSupply += amount;
    // 총 수량에 추가
    emit Transfer(address(0), msg.sender, amount);
    // address(0)는 주소에서의 null을 뜻한다(처음생성했다)->채굴했다고 보면된다.
  }

  function burn(uint amount) external {
    // 토큰 삭제 메서드 , 소각한다고 말함
    balances[msg.sender] -= amount;
    // 트잭 보낸지갑계정에서 토큰뺌
    totalSupply -= amount;
    // 총 수량에서 뺌
    emit Transfer(msg.sender, address(0), amount);
    // address(0)는 주소에서의 null을 뜻한다(처음생성했다)->채굴했다고 보면된다.
  }
}
