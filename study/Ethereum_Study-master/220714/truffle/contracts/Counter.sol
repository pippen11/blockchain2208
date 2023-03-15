// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

contract Counter {
    
    uint256 private _count;
    // 로그 만들기
    event Count(uint256 count);
    // 이벤트를 등록하겠다. (로그를 찍겠다.)
    // 서버 노드에 이벤트가 찍히고 그걸 전송하는 개념
    // 로그의 이름이 Count
    // 로그의 내용이 uint256 count
    // 이벤트를 등록했다면 어느 시점에 로그를 찍을 것인지 작성하면 된다.

    // 상태변수가 private 이기 때문에 getter 함수를 직접 만들어줘야 한다.
    function current() public view returns(uint256) {
        return _count;
    }

    // 상태변수 변경 함수
    function increment() public {
        _count += 1;
        emit Count(_count); // 현재 상태변수 값이 로그에 찍히게 된다.
    }

    function decrement() public {
        _count -= 1;
        emit Count(_count);
    }
}