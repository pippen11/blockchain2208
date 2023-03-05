// SPDX-License-Identifier:GPL-30
pragma solidity >= 0.7.0 < 0.9.0;

contract lec4{
    uint256 public a = 3;
    //1. 파라미터와 리턴값이 없는 함수
    function cahngeA1() public{
        a = 5;
    }

    //2. 파라미터는 있고, 리턴값이 없는 function

   function changeA2(uint256 _value) public{
       a = _value;
   }

   //3. 파라미터는 있고, 리턴값이 있는 function
function changeA3(uint256 _value) public returns(uint256){
    a = _value;
    return a;
}
}