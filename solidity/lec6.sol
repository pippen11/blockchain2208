// SPDX-License-Identifier: GPL-30
pragma solidity >= 0.7.0 < 0.9.0;

// function get_a() view(pure) external returns(uint256){}
// function get_a() external view(pure) returns(uint256){} 접근제한자 앞뒤로가능


// view: function 밖의 변수들을 읽을수 있으나 변경 불가능
// pure: function 밖의 변수들을 읽지못하고 변경도불가능
// view 와 pure 둘다 명시 안할때 : function 밖의 변수들을 읽어서 , 변경을 해야함

contract lec6{
//1. view
 uint256 public a = 1;

 function read_a() public view returns(uint256){
     return a+2;
 }
 // a값은 변경되지않는다

//2.pure : 함수안의 내용만 읽을수있다
function read_a2() public pure returns(uint256){
    uint256 b = 1;
    return 4+2+b;
}

//3. pure, view 둘다안쓸때
function read_a3() public returns(uint256){
    a=13;
    return a;
}

 }