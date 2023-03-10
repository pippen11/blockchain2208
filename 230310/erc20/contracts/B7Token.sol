// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// ERC20 토큰 가져오기

contract B7Token is ERC20 {
  //상속하고
  constructor(
    string memory _name,
    string memory _symbol,
    uint256 _amount
  ) ERC20(_name, _symbol) {
    // ERC20의 constructor를 호출한다
    //Javascript에서의 super와 같다
    _mint(msg.sender, _amount * 10 ** 18);
  }
}
