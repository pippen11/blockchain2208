// SPDX-License-Identifier: GPL-30
pragma solidity >= 0.7.0 < 0.9.0;


// 오버라이딩: 상속받은 함수를 덮어쓰기
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

  function getMoney() view public virtual returns(uint256){
      return money;
  }
}
// override하려면 그함수를 virtual을써야함
contract Son is Father("Janmes"){

// constructor() Father("James"){

// }// 이런식으로 적거나 contract Son is Father("James") 이렇게적거나

  uint256 public earning = 0;
  function work() public{
      earning += 100;
  }
// 오버라이딩을 써줌으로써 아버지 contract의 money와 earning이  getmoney함수 호출하면 더해져서 나온다 
  function getMoney() view override public returns(uint256){
      return money+earning;
  }

}