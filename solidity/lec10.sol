// SPDX-License-Identifier: GPL-30
pragma solidity >= 0.7.0 < 0.9.0;

contract Father{
  string public familyName="kim";
  string public givenName="Jung";
  uint256 public money = 100;


  constructor(string memory _givenName) public {
      givenName=_givenName;
  }

  function getFamilyName() view public returns(string memory){
      return familyName;
  }

  function getGivenName() view public returns(string memory){
      return givenName;
  }

  function getMoney() view public returns(uint256){
      return money;
  }
}

contract Son is Father("James"){
// Son은 Father의 함수와 변수까지 상속받는다
//Father("James")는 constructor()안에 들어가서 givenName의 값을 변경시킨다

}