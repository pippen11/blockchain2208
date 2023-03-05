// SPDX-License-Identifier: GPL-30
pragma solidity >= 0.7.0 < 0.9.0;

contract lec13{


    event info(string name, uint256 money);

    //event 이벤트의이름 (쓰고자하는 타입과 이름);
    // event info가 블록안에 각인이된다 언제든지 info값을 가져와서 쓸수있다

    function sendMoney() public {
        emit info("KimDaejin", 1000);
        //즉 emit 이벤트이름 (이벤트 파라메터 값넣어주기) 
    }
}