// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

contract Fundraising {
  uint256 public targetAmount;
  address public owner;
  mapping(address => uint256) public donations;

  uint256 public raisedAmount = 0;
  uint256 public finishTime = block.timestamp + 2 weeks;

  // block 객체는 컨트랙트를 배포할 때 EVM에 의해 정의될 객체이다.
  // block 객체는 컨트랙트를 업로드 하는 블록의 정보를 포함하고 있다.
  // 주간 단위인 weeks 역시 EVM에 의해 제공되는 단위이다.

  // constructor를 통해 컨트랙트를 배포할 때 초기화 하고 싶은 값을 설정할 수 있다.
  constructor(uint256 _targetAmount) {
    targetAmount = _targetAmount;
    owner = msg.sender;
    // msg 객체 역시 EVM 안에서 코드가 실행될 때 정의되는 객체이다.
  }

  // EOA에서 해당 컨트랙트로 돈을 송금하면 receive 함수가 실행된다.
  receive() external payable {
    // external 함수는 컨트랙트 외부에서만 호출할 수 있다.
    // require() : 조건이 참인지 여부를 확인
    // 조건이 참이 아닐 경우, 메시지와 함께 오류를 던지고 코드 실행을 중지한다.
    require(block.timestamp < finishTime, "This campaign is over");
    // 여기서 block.timestamp는 유저가 컨트랙트로 돈을 보낼 때 생성된 트랜잭션을 저장하는데 사용된 블록의 timestamp이다.
    donations[msg.sender] += msg.value;
    raisedAmount += msg.value;
    // msg.sender : 누가 컨트랙트에 돈을 보내고 있는지 알 수 있다.
    // msg.value : 컨트랙트에 보낸 금액을 알 수 있다.
  }

  // 캠패인 소유자에게 자금을 풀어주는 기능
  function withdrawDonations() external {
    require(msg.sender == owner, "Funds will only be released to the owner"); // 기부금 인출을 요청하는 사람은 계약의 소유자여야 한다.
    require(raisedAmount >= targetAmount, "The project did not reach the goal"); // 모금액이 목표액과 같거나 혹은 많아야 한다.
    require(block.timestamp > finishTime, "The campaign is not over yet"); // 캠패인이 종료되어야 인출을 요청할 수 있다.

    // payable 함수를 사용해 owner에게 자금을 방출
    payable(owner).transfer(raisedAmount);
  }

  // 기부한 사람들에게 환불해주는 기능 (캠패인이 끝났고 목표액에 도달하지 못한 경우)
  function refund() external {
    require(block.timestamp > finishTime, "The campaign is not over yet"); // 캠패인이 끝난 시점 이후에만 환불이 가능하다.
    require(raisedAmount < targetAmount, "The campaign reached the goal"); // 목표 금액에 도달하지 못해야만 환불이 가능하다.
    require(donations[msg.sender] > 0, "You did not donate to this campaign"); // 환불을 요청하는 사용자가 기부자 명단에 있어야만 한다.

    uint256 toRefund = donations[msg.sender];
    donations[msg.sender] = 0;

    // 기부액을 유저에게 송금하여 전액 환불.
    payable(msg.sender).transfer(toRefund);
  }
}
