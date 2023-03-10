// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

//payable을 생성자에 넣을때
// 특정 주소에게만 권한 주기

contract MobileBanking{

   address owner;
   constructor() payable{
       // payable넣으면 배포가 빨간색 : 그말은 이더를 받을수있다는말
       // 스마트 컨트랙트주소에 이더보내면 들어간다
    owner=msg.sender;
    // 이말은 배포를할때 배포한주소를 owner에넣는다는말
   }
// 배포한 주소가 owner가 된다
modifier onlyOwner{
    require(msg.sender==owner,"Only Owner!");
    _;
}


    event SendInfo(address _msgSender, uint256 _currentValue);
    event MyCurrentValue(address _msgSender, uint256 _value);
    event CurrentValueOfSomeone(address _msgSender, address _to, uint256 _value);

    function sendEther(address payable _to) public onlyOwner payable{
        // modifier적어놓으면 이런식으로 각각 적어주면 적용
        //  require(msg.sender==owner,"Only Owner!");
        require(msg.sender.balance>=msg.value,"Your balance is not enough");
        _to.transfer(msg.value);
        emit SendInfo(msg.sender,(msg.sender).balance);
    }

    function checkValueNow() public onlyOwner{
        emit MyCurrentValue(msg.sender,msg.sender.balance);
    }

    function checkUserMoney(address _to) public onlyOwner{
        emit CurrentValueOfSomeone(msg.sender,_to,_to.balance);
    }
}