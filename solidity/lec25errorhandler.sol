// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

// 에러 핸들러: require, revert, assert ,try/catch

// 0.4.22~ 0.7.x  이버전기준 
//assert : gas를 다 소비한후 , 특정한 조건에 부합하지않으면(false일때) 에러를 발생시킨다
// revert: 조건없이 에러를 발생시키고, gas를 환불 시켜준다
// require: 특정한 조건에 부합하지않으면(false일때) 에러를 발생시키고 , gas를 환불시켜준다.


contract lec25{

//2978936 gas 가스비용 다 소비
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
