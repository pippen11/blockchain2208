// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

contract Counter {
    
    uint256 private _count;

    // 상태변수가 private 이기 때문에 getter 함수를 직접 만들어줘야 한다.
    function current() public view returns(uint256) {
        return _count;
    }

    // 상태변수 변경 함수
    function increment() public {
        _count += 1;
    }

    function decrement() public {
        _count -= 1;
    }
}