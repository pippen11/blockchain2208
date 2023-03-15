// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

contract ingToken {

    mapping(address => uint256) public balances;  // 속성명이 address, 속성값이 uint256인 객체
    // 값이 없을 경우 undefined 나 에러나 나는 것이 아니라 디폴트 값인 0이 나온다.

    // 상태변수의 이름은 규격을 맞춰줘야 한다. 
    string public name = 'ingToken';
    string public symbol = 'ITK';
    uint8 public decimals = 18;
    uint256 public totalSupply = 10000000000 * 10 ** decimals;

    // 10000000000 / 10 ** 18

    event Transfer(address _from, address _to, uint256 _value);

    constructor() {
        balances[msg.sender] = totalSupply; // 배포를 진행한 EOA에게 총 발행량 지급
        // constructor() 함수 안에서는 실행시킨 사람이 곧 배포한 사람이다.
    }

    function balanceOf(address _owner) public view returns(uint256 balance){
        // 다른사람의 계정 잔액을 조회하는데도 사용되어야 하기 때문에
        // 계정 정보를 인자값으로 받는 형태로 규격화 되어 있다.

        // 메타마스크에서 자동으로 연결된 계정을 balanceOf() 함수의 인자값으로 전달한다.
        return balances[_owner];
    }

    // transfer() 함수가 있어야만 계정 간 토큰 전송이 가능하다.
    // transfer() call 함수가 아니라 send 함수이다.
    // 클라이언트 입장에서 call을 하면 read 함수 , 클라이언트 입장에서 send를 하면 write 함수
    // 가지고 있는 데이터를 보여주는 것이 view 함수
    // _to : 누구에게 , _value : 보낼 금액
    function transfer(address _to, uint256 _value) public returns(bool success) {

        // Solidity에서 require는 종료함수, 조건이 만족되지 않으면 함수 실행 종료
        // 조건문 처럼 동작
        // require(true) : 실행
        // require(false) : 종료
        require(balances[msg.sender] >= _value);
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        
        return true;
    }
}

// 상태변수에 public을 달면 getter 함수를 만들어 준다.

/**
ERC-20 규격

7개
name() : 토큰의 이름
symbol() : 토큰의 단위
decimal() : 소수점 자릿수
totalSupply() : 총 발행량
balances() : 토큰을 소유한 계정의 잔액들
transfer() : 토큰 전송
balanceOf() : 해당 계정의 잔액 조회
*/

// ERC-20은 함수명이 정해져 있기 때문에 abi 파일이 필요 없다.
// abi 파일이 동일하기 때문에 CA 값만 전달하면 된다.
// 함수명이 같아서 abi 파일이 필요 없다.

// 이벤트를 등록해서 transfer 기록을 로그로 남긴다.
