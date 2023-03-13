// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract EthSwap {
  ERC20 public token;
  // ERC20의 CA 값을 받을 변수 지정
  // 기존에 만든 토큰(오픈제플린라이브러리)을 저장하여 사용
  // 여기서 ERC20은 데이터 타입
  uint public rate = 100;

  // 1 Ether = 100 token

  // 배포한 ERC20의 CA를 인자값으로 받는다.
  constructor(ERC20 _token) {
    // ERC20 토큰 생성 시 CA를 받아서 바로 생성할수있다.
    token = _token;
    // deployer.deploy('token','CA 전달')
  }

  function getToken() public view returns (address) {
    // 토큰을 받아온다.
    return address(token);
    // 토큰의 CA를 반환한다.
    // token은 ERC20 타입이기 때문에 address로 형 변환
  }

  function getSwapBalance() public view returns (uint) {
    // 트랜잭션 보낸 계정의 토큰잔액을 확인한다.
    // EOA -> EthSwap -> getSwapBalance() -> Token -> balanceOf()
    // balanceOf()는 Token 컨트랙트에 있는 함수
    // EthSwap이라는 컨트랙트에서 Token 컨트랙트에 요청을 보내 결과를 가져온 것
    return token.balanceOf(msg.sender);
  }

  function getThisAddress() public view returns (address) {
    // 현재 스마트 컨트렉트(EthSwap)의 CA를 반환한다.
    // 여기서 this는 해당 컨트랙트를 의미 (this == EthSwap)
    // address(this) == EthSwap의 CA
    return address(this);
  }

  function getMsgSender() public view returns (address) {
    // 트잭보낸사람 반환
    // msg.sender == EthSwap을 실행시킨 사람
    /*
        txObject = {
            from: from에 들어가는 사람이 msg.sender 
            to:
            value:
            data:
        }
    */
    return msg.sender;
  }

  function getTokenOwner() public view returns (address) {
    // 토큰 배포자를 반환한다. 즉 , 토큰에 대한 스마트 컨트랙트 등록자
    return token._owner();
  }

  function buyToken() public payable {
    // Ether로 토큰을 산다.
    uint256 tokenAmount = msg.value * rate;
    // 1eth 전송시 토큰 100개 지급
    // 보낸 Ether => 토큰으로
    require(token.balanceOf(address(this)) >= tokenAmount);
    // 현재 컨트렉트에 토큰이 트랜잭션 보낸계정에 줄 만큼 있는지 확인
    token.transfer(msg.sender, tokenAmount);
    // 토큰 보내기
    // from: EthSwap CA , to: msg.sender
  }

  function sellToken(uint256 _amount) public payable {
    // 토큰으로 Ether를 산다
    // EthSwap에서 token.transfer() 함수를 호출하면 from이 EthSwap이 된다.
    require(token.balanceOf(msg.sender) >= _amount);
    //// account1에 대한 balanceOf()
    // 트랜잭션 보낸 계정의 토큰 잔액을 확인
    uint256 etherAmount = _amount / rate;
    // 토큰을 기준으로 Ether를 계산
    // ex) 50/100 == 0.5 이더

    require(address(this).balance >= etherAmount);
    // EthSwap이 가지고 있는 이더가 etherAmount보다 많은가?
    // 현재 컨트렉트에 충분한 Ether가 있는지 확인
    token.transferFrom(msg.sender, address(this), _amount);
    //여기서 _amount는 코인
    // account1 -> EthSwap token 전송
    // 토큰을 트랜잭션보낸 계정에서 컨트랙트로 전송
    payable(msg.sender).transfer(etherAmount);
    // etheramount는 토큰기준 이더계산한 이더
    // Ether 트랜잭션 보낸 계정에게 전송
    // EthSwap -> account1 이더 전송
  }
}
