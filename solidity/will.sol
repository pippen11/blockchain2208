pragma solidity ^0.5.7;

contract Will {
    address owner;
    uint fortune;
    bool deceased;
    //address가 변수의 특정 타입
    // 변수들 정적 타입 설정
    // 상태변수이다

//public: 계약 안이나 밖에서도 함수 호출가능하게함
//payable: 함수가 이더를 받고 보낼수있게한다
// 밑에 계약을 배포하기위해 생성자를 작성
    constructor() payable public{
        owner = msg.sender;
        //msg 메세지이다
        // owner라는 변수가 address를 호출하는 이를 대변한다
        // 호출하는게 누구든간에 함수를 호출하는 address를 대표한다
        // 보다시피 생성자 함수에서 상태 변수에 접근할수있다
        fortune = msg.value;
        // mas.value도 내장된 글로벌 메서드 이때 value는 전송하는 이더의 양
        deceased = false;

     }

// modifier함수의 확장자? 제어자를 함수에 더할수있다
modifier onlyOwner{
  require(msg.sender == owner); // 조건  조건에안맞으면 함수실행안한다
  _;    
}

modifier mustBeDeceased{
  require(deceased == true); // 조건  조건에안맞으면 함수실행안한다
  _;    
}
// 제어자(modifier)를 생성해서 조건에따라 다르게 만든다 1. 계약을 호출할수있는 유일한 사람이 owner이고 돌아가셨을때만 자금 배분
// _;  밑줄문자는무엇일까 밑줄 문자를 입력하면 함수가 계속되게 된다 위제어자를 실행하고 함수로 이어지라는것
// 처음 false는 살아계서서 그럼 돌아가시면 true


  address payable[] familyWallets;
  // address로 설정후 falimilyWallets로 인스턴스화했다
  // familyWallet들을 빈배열에 주소저장 리스트를 갖게됨

  // mapping을 한다는건 키-값 저장소를 반복한다는 의미이다.

  mapping(address => uint) inheritance;
  // address가 키 uint가 값
  // 키와 값을 쌍으로 설정
  // address모든주소가 uint값을 가지게한다 유산에 매핑을 설정함
  // inheritance에 각 address를 정수로 설정
  // 주소별로 추적이 가능한 특수 저장 값을 갖는다

  //이제 각 주소에 유산을 정한다

// 제어자 onlyOwner를 사용하여 소유자만 실행할수있게했다
  function setInheritance(address payable wallet, uint amount) public onlyOwner {
      familyWallets.push(wallet);
      inheritance[wallet] = amount;
      // 객체에 또다른 접근하는방법? mapping은 키와 값이니까 wallet의 변수를 넣어줘서 그키를 amount값으로 설정?

  }

  // 가족 구성원지갑주소에 각각 지급
// payout은 유산을 각지갑으로 전송할수있는 함수를 만드는것이다
  function payout() private mustBeDeceased{
     for(uint i=0;i<familyWallets.length;i++){
         familyWallets[i].transfer(inheritance[familyWallets[i]]);
         // 게약 주소에 있는 자금을 수신자 주소로 전송
         // 각지갑에 이체하는건 inheritance(각 지갑에 대한 금액을 매핑한 키-값 저장소)가된다
         // falmilyWallets 내 지갑을 인덱스따라 inheritance에 각각 설정
         // 순서가 setInheritance 함수가 address를 설정하고 2. 각 address에대해 amount를 매핑으로 설정 그다음 payout함수가 이를 기반으로 지급
         // familyWallets[i] 인덱스에 있는지갑이 inheritance에서 해당지갑에대한 금액을 찾아 이체한다
     }
  }
  //이함수는 mustBeDeceased제어자 deceased == true 일때만 실행된다 private로 공개로하지않는다
  // 가족 구성원의 지갑의 수만큼 실행된다
  //transfer() 항상 금액을 인수로 가진다

// oracle switch simulation
// 할아버지가 돌아가시면 값이 참으로 바뀌고 함수실행
// function hasDeceased() public onlyOwner {
//   deceased = true;
//   payout();
// }

}
