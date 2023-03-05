// SPDX-License-Identifier: MIT
pragma solidity >= 0.7.0 < 0.9.0;

contract Lec14{

    event numberTracker(uint256 num, string str);
    event numberTracker2(uint256 indexed num, string str);
    // 예를들어 1~10개이벤트가있으면 indexed를 적어주면 원하는 이벤트를 필터해서 특정 하나만 가져올수있다

    uint256 num=0;
    function PushEvent(string memory _str) public{
        emit numberTracker(num,_str);
        emit numberTracker2(num,_str);
        num++;
    }

}

// getPastEvents공부하기