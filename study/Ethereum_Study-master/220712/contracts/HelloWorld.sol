// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15; // 버전

// HelloWorld 라는 컨트랙트 생성
contract HelloWorld {
    // public을 적을 경우 getter 함수를 만들어준다.
    string public value; // 상태 변수
    // 상태 변수에 public이 붙어 있다면 getter 함수를 자동으로 만들어준다.
    constructor() {
        value = 'Hello World!';
    }

    // 함수를 작성할 때는 function 키워드 필수
    // 디폴트는 public (외부에서 접근 가능)
    // view 함수
    // 상태변수를 그대로 출력하는 함수
    function getValue() public view returns(string memory) {
        return value;
    }

    // 인스턴스에 있는 상태변수를 바꾸는 함수
    function setValue(string memory _v) public {
        value = _v;
    }

    // abi 파일에 내용이 없다는 것은 사용자가 호출할 수 없다는 뜻.
    // private을 쓸 경우 abi 파일에서 해당 내용이 제외된다. 
}