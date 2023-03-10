// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract lec32{
    /*
    Payable
    Payable은 이더/토큰과 상호작용시 필요한 키워드라고 생각하면 간단하다
    즉, send, transfer, call 을 이용하여 , 이더를 보낼때 Payable이라는 키워드가 필요하다
    이 Payable은 주로 함수, 주소 , 생성자에 붙여서 사용된다

    msg.value
    msg.value는 송금보낸 코인의 값이다

    이더를 보내는 3가지
    1.send: 2300 gas를 소비 , 성공여부를 true 또는 false로 리턴한다
    2.transfer: 2300 gas를 소비 , 실패시 에러를 발생
    3.call: 가변적인 gas소비 (gas값 지정 가능) , 성공 여부를true 또는 false를 리턴
     재진임(reentrancy) 공격 위험성있음, 2019이후 call사용을 추천
    */

// _to는 스마트컨트랙 주소도 가능, 즉 스마트 컨트랙트 이더를 받을수있다

    event howMuch(uint256 _value);
    function sendNow(address payable _to) public payable{
        bool sent= _to.send(msg.value); //  send는 성공여부를 return true or false
        // 이함수가 false면 밑에 require에 걸리고 true면 안걸리고 emit
        require(sent,"Faliled to send either");
        emit howMuch(msg.value);
    }

    function transferNow(address payable _to) public payable{
        _to.transfer(msg.value); //transfer자체는 실패하면 에러가나옴
        emit howMuch(msg.value);
    }

    function callNow(address payable _to) public payable{
        // _to 이더받을사람의 주소 함수가 이더를 보낼거기때문에 payable붙이고 받을사람도 이더받으니까 payable

        // ~0.7
        // (bool sent,)=_to.call.gas(1000).value(msg.value)("");
        // require(sent,"Failed to send Ether");

        //pure와 view를 붙이실 필요가 없으세요 :) emit 이라는것 자체가 블록에 값을 저장하기 때문이죠 ;)
       

        //0.7~
        // 가스 지정해주면 안될수도있음
        (bool sent,)=_to.call{value: msg.value,gas:1000}("");
        require(sent,"Failed to send Ether");
        emit howMuch(msg.value);
    }
}