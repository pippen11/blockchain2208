// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

// JwToken 배포 -> Tx , CA
// JwToken 먼저 배포하고 JwToken의 CA를 사용해 EthSwap 배포
// EthSwap 배포 -> Tx
    // JwToken의 CA를 인자값으로 전달하여 함수 실행
    // EthSwap 공간 안에서 JwToken 함수를 호출
    // CA.balanceOf() : call 함수
    // CA.transfer() : send 함수
// 서로 간에 상호작용을 하기 위해서는 CA가 필요

contract EthSwap {

    // CA 계정을 받을 변수 지정
    ERC20 public token;  // ERC20 타입 지정 가능 이유 : import 해왔기 때문 + ERC20.sol 파일 안에 ERC20 이라는 컨트랙트가 존재하기 때문
    // 데이터 타입. 접근제한자. 변수명

    uint public rate = 100;

    // 배포한 ERC-20의 CA를 인자값으로 받는다.
    constructor(ERC20 _token) {
        token = _token;
    }

    // EOA -> EthSwap (Contract) -> getToken() -> return JwToken CA 
    function getToken() public view returns (address) {
        // token은 ERC20 타입이기 때문에 address로 형 변환
        return address(token); // JwToken CA
    }

    // EOA -> EthSwap -> getSwapBalance() -> JwToken -> balanceOf()
    // balanceOf()는 JwToken 컨트랙트에 있는 함수
    // EthSwap이라는 컨트랙트에서 JwToken 컨트랙트에 요청을 보내 결과를 가져온 것 
    function getSwapBalance() public view returns (uint) {
        return token.balanceOf(msg.sender);
    }

    function getThisAddress() public view returns (address) {
        return address(this); 
        // 여기서 this는 해당 컨트랙트를 의미 (this == EthSwap)
        // address(this) == EthSwap의 CA
    }

    function getMsgSender() public view returns (address) {
        return msg.sender;
        // msg.sender == EthSwap을 실행시킨 사람
        /*
            txObject = {
                from: from에 들어가는 사람이 msg.sender 
                to:
                value:
                data:
            }
        */
    }

    function getTokenOwner() public view returns (address) {
        return token._owner();
    }

    // JwToken owner
    // JwToken CA
    // JwToken msg.sender

    // EthSwap CA
    // EthSwap msg.sender

    // EthSwap에게 요청을 보내 위의 내용들을 조회할 수 있어야 한다.


    // ETH -> TOKEN buy
    // 1 ETH 당 몇 개의 토큰을 줄 것인가  // 1 ETH : 100 TOKEN
    function buyToken() public payable {
        // buyToken
        // send({from: , to: CA, value: })
        uint256 tokenAmount = msg.value * rate;  // 1ETH 전송시 tokenAmount == 100
        require(token.balanceOf(address(this)) >= tokenAmount, "error [1]");
        token.transfer(msg.sender, tokenAmount);  // from: EthSwap CA, to: msg.sender
    }

    // TOKEN -> ETH sell
    // from: account1 , amount
    function sellToken(uint256 _amount) public payable {
        // ethSwap에서 transfer 함수를 호출하면 from이 ethSwap이 된다. 
        // account1이 되어야 하는데,,, from이 address(this)가 되어버리는 문제 발생

        // token.transfer(address(this), _amount, {from: account1}); // 불가능 
        // 컨트랙트 안에서는 tx 객체를 조작할 수 없다.
        // CA -> CA 가스비 X

        // account1에 대한 balanceOf
        require(token.balanceOf(msg.sender) >= _amount); // msg.sender == account1
        uint256 etherAmount = _amount/rate; // 50/100 == 0.5 이더

        require(address(this).balance >= etherAmount); // ethSwap이 가지고 있는 이더가 0.5 이더보다 많은가?
        token.transferFrom(msg.sender, address(this), _amount);  // accoun1 -> ethSwap token 50개 받고
        payable(msg.sender).transfer(etherAmount); // ethSwap -> account1 0.5 이더
    }

}