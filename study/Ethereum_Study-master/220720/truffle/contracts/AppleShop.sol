// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

contract AppleShop {

    mapping(address => uint) myApple;

    // payable 속성이 있을 때 CA는 ETH를 받을 수 있는 상태가 된다.
    // tx 객체의 value값에 ETH를 넣을 수 있다.
    function buyApple() public payable {
        myApple[msg.sender] += 1;
    }

    function sellApple(uint _applePrice) public payable {
        uint256 refund = myApple[msg.sender] * _applePrice;
        myApple[msg.sender] = 0;
        // address 타입을 인자값으로 전달
        // msg.sender 계정에 돈을 보내는 행위
        payable(msg.sender).transfer(refund);
    }

    function getApple() view public returns (uint) {
        return myApple[msg.sender];
    }

}