// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/*
Call vs Delegate call
DeLegate call:
1. msg.sender 가 본래의 스마트 컨트랙 사용자를 나타낸다
2. deLegate call이 정의된 스마트 컨트랙(즉 caller)이 외부 컨트랙의 함수들을 마치 자신의 것처럼 사용(실질적인 값도 caller에 저장)
조건
외부 스마트 컨트랙과 caller 스마트 컨트랙은 같은 변수를 갖고 있어야 한다.

why?
upgradable smart contract용도
*/

// 배포한 내용이 변경되었을때 다시 배포하면 이전데이터값을 블록체인에서 가져오는데 비용이 만만치않고 복잡해져서
// delegate call을 하여 사용자들이 알고있는 스마트컨트랙트는 냅두고 그주소를 바뀐스마트컨트랙트 주소를 넣어줘서 연결시켜준다

contract add{
    uint256 public num=0;
    event Info(address _addr,uint256 _num);
    function plusOne() public{
        num=num+1;
        emit Info(msg.sender,num);
    }
}

contract caller{
    uint256 public num=0;
    function callNow(address _contractAddr) public payable{
        (bool success,)=_contractAddr.call(abi.encodeWithSignature("plusOne()"));
        require(success,"failed to transfer ether");
    }
    function delegateCallNow(address _contractAddr) public payable{
        (bool success,)=_contractAddr.delegatecall(abi.encodeWithSignature("plusOne()"));
        // 여기서의 num값은 add에 저장이된다?
        // 본래의 스마트컨트랙 사용자 주소가나옴, call과 다르게 add스마트컨트랙이아닌 caller의 num이 증가
        require(success,"falied to transfer ether");
    }
}