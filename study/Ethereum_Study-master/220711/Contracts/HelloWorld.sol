// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15; // 버전

// HelloWorld 라는 컨트랙트 생성
contract HelloWorld {
    // 솔리디티는 세미콜론; 필수
    string text; // 상태 변수

    constructor() {
        text = 'Hello World!';
    }

    // 함수를 작성할 때는 function 키워드 필수
    // 디폴트는 public (외부에서 접근 가능)
    // view 함수
    // 상태변수를 그대로 출력하는 함수
    function getText() public view returns(string memory) {
        return text;
    }

    // 인스턴스에 있는 상태변수를 바꾸는 함수
    function setText(string memory value) public {
        text = value;
    }
}