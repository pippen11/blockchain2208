// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Test {
  int public num;
  string public text;
  int[] public numArr;
  string[] public textArr;
  address public owner;

  mapping(string => uint) public balance;

  constructor(string memory _text, int _num) {
    //매개변수전달할때 meomory나 storage쓴다
    num = _num;
    // num = 1;
    // text = "testing"; 매개변수로 전달하면서 필요없어졌다
    text = _text;
    owner = msg.sender;
  }
}
