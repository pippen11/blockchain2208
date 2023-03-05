pragma solidity >=0.7.0 <0.9.0;

contract Coin{
    //변수 public설정은 다른계약이 변수에 접근할수있게하기때문
    address public minter;
    mapping(address => uint) public balances;

event Sent(address from, address to, uint amount);

//계약을 배포할때만 생성자함수가 실행된다
constructor(){
    minter=msg.sender;
    //msg.sender은 전역변수로써 발신자가 계약을 요청한 호출자를 확인하는역할
}

//새로운코인을 만들고 주소로 보낸다
// 소유자만 해당코인을 보낼수있게한다
function mint(address receiver, uint amount) public {
 require(msg.sender==minter);
 balances[receiver]+=amount;
}

error insufficientBalance(uint requested, uint available);
// 잔액부족 요청금액,잔액

// 코인 송금 함수
function send(address receiver, uint amount) public {
    if(amount>balances[msg.sender])
    revert insufficientBalance({
        requested: amount,
        available: balances[msg.sender]
    });
    //트잭 관한 정보 제공(revert
    balances[msg.sender]-=amount;
    balances[receiver]+=amount;
    emit Sent(msg.sender, receiver, amount);
    //이벤트 발생은 emit쓴다
}

}