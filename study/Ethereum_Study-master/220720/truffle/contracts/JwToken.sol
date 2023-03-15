// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import './ERC20.sol';

contract JwToken is ERC20 {
    
    address public owner;
    uint256 public ethCanBuy = 100; // 1 ETH 당 100개를 주겠다.

    constructor(string memory _name, string memory _symbol, uint256 _amount) {
        owner = msg.sender;
        name = _name;
        symbol = _symbol;

        mint(_amount * (10 ** uint256(decimals)));
    }

    // 익명함수
    // 스마트 컨트랙트 발동시 필요한 조건
    /*
        {
            from: 보내는 사람,
            to: CA,
            data: 0x...,
            value: 10000000000
        }

        data 값이 없을 때 발동되는 함수 -> 익명함수
        (ETH만 전송할 때, 컨트랙트 함수 호출 X)
        실행시킬 함수가 정해져 있지 않을 때 익명함수가 실행됨.


        fallback 과 receive 모두 익명함수

        // 이더를 주면서 함수를 실행시켰는데 컨트랙트 내에 없는 함수일 때 => fallback() 함수로 떨어진다.
        // try catch 문의 catch문 같은 기능

        fallback() : 이더를 받지만 돈을 보내는 행위
            // fallback 함수는 호출되는 함수가 없을 때 실행되는 함수.
            // fallback payable : 돈을 보낼 수 있게 된다. (payable 설정 해줬을 시)
            // payable 이 옵션
            // value가 있든 없든 실행된다.

        receive() : 이더를 받는 경우
            // 호출되는 함수가 없을 때 실행되는 함수. 단 value가 있을 때만 실행.
            // payable 이 필수
            // payable이 있다는 뜻은 돈을 보내거나 받는게 가능하다.

        // 돈에 관련된 건 receive를 쓰고 
        // 잘못된 호출에 관한 처리 등은 fallback
    */

    // CA 에게 돈을 줄 때는 payable 필요
    // receive는 payable을 반드시 써줘야 한다. 
    // receive는 돈만 관련된 함수
    receive() external payable {
        
        require(msg.value != 0);
        uint amount = msg.value * ethCanBuy; // 트랜잭션에 보낸 value를 알 수 있다. (wei 단위)

        require(balances[owner] >= amount);
        balances[owner] -= amount;
        balances[msg.sender] += amount;

        if (msg.sender == owner) {
            mint(amount);
        }

        emit Transfer(owner, msg.sender, amount);
    }

    // fallback() 에서는 돈을 보내는 행위 필요

}