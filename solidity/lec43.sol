// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 < 0.9.0;

contract MoneyBox {
    event WhoPaid(address indexed sender, uint256 payment);
    address ownwer;
    
    mapping (uint256=> mapping(address => bool)) paidMemberList;
    
    uint256 round = 1;
    
    constructor(){
        ownwer = msg.sender;
    }
   
    receive() external payable {
        require(msg.value == 0.01 ether, "Must be 0.01 ether.");
        // 0.01이더는 10000000000000000 wei이다 총 0이 16개
        require(paidMemberList[round][msg.sender] == false, "Must be a new player in each game.");
        
        paidMemberList[round][msg.sender] = true;
        
        emit WhoPaid(msg.sender,msg.value);
        
        if(address(this).balance == 0.03 ether){
            (bool sent,)= payable(msg.sender).call{value:address(this).balance}("");
            require(sent,"Failed to pay");
            round++;
        }
        
        
    }

    
    function checkRound() public view returns(uint256){
        return round;
    }
    
    function checkValue() public view  returns(uint256){
        require(ownwer==msg.sender, "Only Onwer can check the value");
        return address(this).balance;
    }
    


}