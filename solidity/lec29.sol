// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract lec29{

    function add(uint256 _num1,uint256 _num2) public pure returns(uint256){
        uint256 total = _num1 + _num2;
        // 리턴명이 없으면 이렇게 정의를 해줘야하고
        return total;
    }

    function add2(uint256 _num1, uint256 _num2) public pure returns (uint256 total){
        // 리턴명이 있으면 이렇게만 해도된다
        // 리턴할게많아질수있으니 리턴명을 적어주는게 좋다
        total = _num1 + _num2;
        return total;
    }
}