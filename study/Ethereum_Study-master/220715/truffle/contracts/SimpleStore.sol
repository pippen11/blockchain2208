// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

contract SimpleStore {
    uint256 public value;
    address public owner;
    
    constructor(uint256 _value) { // 생성자
        value = _value;
        owner = msg.sender;  // 배포시에는 배포를 실행한 사람의 EOA. 
    }
    // 이후에는 컨트랙트를 실행시킨 사람의 계정

    function getAddress() public view returns (address) {
        return msg.sender;
    }

    // 배포한 사람이 실행했는지 다른 사람이 실행했는지 구분 가능
    // function check() public view returns (uint256) {
    //     if (owner === msg.sender) {

    //     }

    //     return 1;
    // }
}

// constructor는 생성자 함수로써 인스턴스를 생성할 때 인자값을 넣어줄 수 있다.
/**
    인스턴스는 딱 한번만 생성 된다. 언제? 배포할 때(블록에 담길 때)
    그렇다면 생성자 함수의 인자값은 언제 넣어줘야 하는가?
    배포하기 전에, 즉 블록에 담기기 전에 인자값을 넣어줘야 한다.
*/

// Solidity에는 이더리움 네트워크 안에서만 사용할 수 있는 변수가 있다.
// 스마트 컨트랙트를 실행한 사람의 account를 가져오는 예약어 존재