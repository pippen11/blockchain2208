// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

// 에러 핸들러: require, revert, assert ,try/catch

contract lec26{

    //0.8.1~
    // assert: 오직 내부적 에러 테스트 용도 , 불변성 체크용도 assert가 에러를 발생시키면, Panic(uint256) 이라는 에러타입의 에러발생
    
    // 0.8.x버전부터 가스비환불받음
    // 190 gas
    function assertNow() public pure{
        assert(false);
        // test
    }

//258 gas 가스환불해줘서 위에보다 적다
    function reverNow() public pure{
        revert("error!"); // if or require(if+revert)
    }
    //	274 gas  false라서 에러발생
    function requireNow()public pure{
        require(false,"occurred");
    }

    function onlyAdults(uint256 _age) public pure returns(string memory){
        if(_age < 19){
            // 만약 18세같이 여기 조건에 걸리면 리벌트작동 if안이 true일때 require은 조건 false일때
            revert("You are not allowed to pay for the cigarette");
        }
        return "Your payment is scceeded";
    }

    function onlyAdults2(uint256 _age) public pure returns(string memory){
        require(_age>19,"You are not allowed to pay for the cigarette");
        // 위에랑 같은데 조건이 false일때 에러발생
        return "Your payment is scceeded";
    }
}