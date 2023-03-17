// SPDX-License-Identifier: MIT

pragma solidity ^0.8.15;

contract Subscribe{
    uint256 public sub_price = 1 ether;
    // uint256 public sub_price3 = 2.5 ether;
    // uint256 public sub_price6 = 5 ether;

    mapping(address => uint) public subscribeTime;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Subscribed(address indexed user, uint startTime, bool state);

    function setSubscribe(address _user, uint _time) internal {
        subscribeTime[_user] = _time;
    }

//구독
    function subscribe() public payable{
        require(msg.value >= sub_price, "lack of balance, need to charge");
        // require(subscribeState[msg.sender] != false , "already subscribed");
        payable(address(this)).transfer(msg.value);
        setSubscribe(msg.sender, block.timestamp);
        emit Subscribed(msg.sender, block.timestamp, true);
    }

//재구독.
    function reSubscribe() public payable {
        require(block.timestamp > subscribeTime[msg.sender]+30 days, "You already subscribed." );
        require(msg.value >= sub_price, "lack of balance, need to charge");
        payable(address(this)).transfer(msg.value);
        setSubscribe(msg.sender, block.timestamp);
        emit Subscribed(msg.sender, block.timestamp, true);
    }

   
//구독취소
    function cancelSubscribe() public payable{
        require(subscribeTime[msg.sender] + 7 days >= block.timestamp , "not required to cancel");
        // require(block.timestamp > subscribeTime[msg.sender], "")
        payable(msg.sender).transfer(sub_price);
        emit Subscribed(msg.sender,block.timestamp, false);
    }

    

    function getSubsribeState(address _user) public view returns(uint){
        return subscribeTime[_user];
    }
 
    receive() external payable{
    }
}