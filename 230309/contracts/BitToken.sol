// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./ERC20.sol";

contract BitToken is ERC20 {
  address public owner;
  // 토큰 등록자
  uint256 public ethCanBuy = 100;

  // 토큰의 가격 1ETH=100(내토큰)

  constructor(string memory _name, string memory _symbol, uint256 _amount) {
    owner = msg.sender;
    name = _name;
    symbol = _symbol;

    mint(_amount * 10 ** decimals);
    // 등록자가 최초로 토큰을 받는다
  }

  // CA주소에 이더보내면 value만 보내는거다
  receive() external payable {
    // 익명함수이다
    require(msg.value != 0);
    // 트랜잭션에 value(여기서는 eth)가 없으면 멈춘다.
    uint amount = msg.value * ethCanBuy;
    // 받은 Ether를 토큰으로 변환한다(amount가됨)

    require(balances[owner] >= amount);
    // 주인이갖고잇는게 많은지(스마트컨트랙트발행한사람만 토큰발행가능)
    // 발행자의 지갑계정에서 트랜잭션 보낸 지갑 계정에 토큰을 보낸다
    balances[owner] -= amount;
    // 발행자지갑계정에서 빠지고
    balances[msg.sender] += amount;
    // 받는지갑계정에서는 토큰양이 추가된다

    // 스마트컨트랙트 주소로 새롭게 발행
    if (msg.sender == owner) {
      //만약 발행자가 트랜잭션을 보냈다면 토큰을 추가로 발행한다
      mint(amount);
    }
    emit Transfer(owner, msg.sender, amount);
  }
}
