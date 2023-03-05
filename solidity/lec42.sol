

// pragma solidity >=0.7.0 < 0.9.0;

// /*
// 1. 1이더만 내야한다
// 2. 중복해서 참여 불가( 단 , 누군가 적립금을 받으면 초기화)
// 3. 관리자만 적립된 이더 볼수있다.
// 4. 3의 배수 번째 사람에게만 적립 이더를 준다.
// */

// contract MoneyBox{
//     event WhoPaid(address indexed sender, uint256 payment);
//     // 누구인지, 얼마를 줬는지

//     address ownwer

//     mapping(uint256=>mapping( address=>bool)) paidMemberList;
//     //mapping(address=>bool) payMemberList2; 이렇게 적으면 누군가 적립금 받으면 초기화 시키기가 어렵다 mappping에는 완전히 모든것을 삭제하는것이 없다->일일이 false로변경해야함
//     // bool이 이더내면 true로 바뀜 처음엔 false이다

// /*
// 1 round: A : true, B: ture ,C : true paidMemberList
// 2 round : E, R, D paidMemberList
// 3 round : A, R ,B paidMemberList
// 4 round : All false

// */


//     uint256 round = 1;
//     // moneybox에는 1라운드 2라운드 등 라운드가 여러개이다

//     constructor(){
//         ownwer = msg.sender;
//         // monybox의 배포자
//     }

//     receive() external payable{
//         // 스마트컨트랙이 이더받아야해서 receive payable로만들어준다
//         require(msg.value==1 ehter, "Muse be 1 ether.");
//         require(paidmemberList[round][msg.sender]==false,"Must be a new player in each game")
//         // round 1부터 msg.sender은 이더준사람 처음엔 다 false이다 true로바뀌면 이미 이더준사람임
//         paidMemberList[round][msg.sender]=true;

//         emit WhoPaid(msg.sender,msg.value);

//         if(address(this).balance==3 ether){
//             //address(this)는 moneybox자체임 3의배수마다 주니까 그사람에게 전달해줌
//             (bool sent,)=payable(msg.sender).call{value:address(this).balance}("");
//             //msg.sender은 스마트컨트랙에 돈을 준 사람, address(this)는 moneybox 스마트컨트랙 주소
//             require(send,"Failded to pay");
//             round++;
//         }
//     }

// function checkRound() public view returns(uint256){
//     return round;
// }

// function checkValue() public view returns(uint256){
//     require(ownwer==msg.sender, "Only Owner can check the value");
//     return address(this).balance;
// }

// }

// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 < 0.9.0;

/*
1. 1 이더만 내야한다
2. 중복해서 참여 불가 (단, 누군가 적립금을 받으면 초기화)
3. 관리자만 적립된 이더 볼 수 있다.
4. 3의 배수 번째 사람에게만 적립된 이더를 준다.

*/
contract MoneyBox {
    event WhoPaid(address indexed sender, uint256 payment);
    address ownwer;
    
    mapping (uint256=> mapping(address => bool)) paidMemberList;
    
    uint256 round = 1;
    
    constructor(){
        ownwer = msg.sender;
    }
   
    receive() external payable {
        require(msg.value == 1 ether, "Must be 1 ether.");
        require(paidMemberList[round][msg.sender] == false, "Must be a new player in each game.");
        
        paidMemberList[round][msg.sender] = true;
        
        emit WhoPaid(msg.sender,msg.value);
        
        if(address(this).balance == 3 ether){
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