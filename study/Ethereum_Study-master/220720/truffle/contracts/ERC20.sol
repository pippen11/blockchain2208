// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import './IERC20.sol';
// interface 상속 받아서 함수 안에 기능 구현

contract ERC20 is IERC20 {

    string public name;
    string public symbol;
    uint8 public decimals = 18;

    uint public override totalSupply;
    mapping(address => uint) public balances;
    mapping(address => mapping(address => uint)) public override allowance;  // 데이터를 저장하는 형태일 뿐
    // allowance[account1][account3] = 3000;
    /*
        {
            "0x0000": 10,
        }

        {
            "0x0000": {
                "0x0001": 10
            }
        }
    */

    // 상속 받은 것 중에 같은 내용이 있다면 override 
    // override가 적혀있음으로 해서 interface에 있는 내용임을 알 수 있다.
    function balanceOf(address account) view override external returns (uint) {
        return balances[account];
    }

    function transfer(address recipient, uint amount) external override returns (bool) {
        balances[msg.sender] -= amount;
        balances[recipient] += amount;
        emit Transfer(msg.sender, recipient, amount);
        return true;
    }

    // 위임
    // A가 B에게 5000 위임
    // msg.sender : A
    // spender : B
    // amount : 5000
    // 함수 실행 주체 : A
    // 토큰 관련 함수
    function approve(address spender, uint amount) external override returns (bool){
        allowance[msg.sender][spender] = amount;  // msg.sender가 spender에게 위임 권한을 주는 코드
        emit Approval(msg.sender, spender, amount);  // 로그 기록 / approve 성공시 발생되는 이벤트
        return true;
    }

    // 위임 받은 사람이 제 3자에게 돈을 보낼 때 실행하는 코드
    // A의 돈을 B가 사용

    // B -> C 1000원 보내기
    // msg.sender : B
    // sender : A (누구의 돈을 쓸 것인지)
    // recipient : C (누구에게 보낼 것인지)
    // amount : 1000
    // 함수 실행 주체 : B
    // 토큰 관련 함수
    function transferFrom(address sender, address recipient, uint amount) external override returns (bool) {

        require(allowance[sender][msg.sender] >= amount);

        allowance[sender][msg.sender] -= amount;
        balances[sender] -= amount;
        balances[recipient] += amount;
        emit Transfer(sender, recipient, amount);
        return true;
    }

    // mint (토큰 수령)
    function mint(uint amount) internal {
        balances[msg.sender] += amount;
        totalSupply += amount;
        emit Transfer(address(0), msg.sender, amount);
    }

    // 총발행량 지우는 함수 (소각)
    // address(0) == address 타입으로 null값 부여
    function burn(uint amount) external {
        balances[msg.sender] -= amount;
        totalSupply -= amount;
        emit Transfer(msg.sender, address(0), amount);
    }

}