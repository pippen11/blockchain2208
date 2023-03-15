// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

contract ZombieFactory {

    // 이벤트 등록
    event NewZombie(uint zombieId, string name, uint dna);

    uint dnaDigits = 16;
    uint dnaModulus = 10 ** dnaDigits; // uint === uint256

    struct Zombie {
        string name;
        uint dna;
    }

    Zombie[] public zombies;

    // 배열 전체를 조회하기 위해서는 getter 함수를 추가적으로 만들어줘야 한다.
    // 배열의 길이를 return 하는 함수를 만들고 for문을 통해 반복문을 돌면서 값을 하나하나 가져와야 한다.
    function ZombiesLength() public view returns (uint256) {
        return zombies.length;
    }

    /*
        view : 상태변수를 사용은 한다. 하지만 값을 바꾸지는 않는다. (상태변수를 return만 하는 경우도 해당)
        pure : 상태변수를 사용도 안하고 바꾸지도 않는 경우. 어떠한 데이터에 접근하지도 않는다.
        없을 경우 : 상태변수를 사용하고 내용을 바꿀 경우 
    
    */

    function _createZombie(string memory _name, uint _dna) public {
        zombies.push(Zombie(_name, _dna));  // zombies.push() -> 상태변수를 바꾸는 코드
        uint id = zombies.length - 1;
        emit NewZombie(id, _name, _dna);
    }

    // private일 경우에는 호출을 할 수 없기 때문에 테스트 코드 작성을 위해 public으로 바꿔 놓고 작업.
    function _generateRandomDna(string memory _str) public view returns (uint) {
        // 'ingoo' => 16자리 내용으로 uint 값을 얻고 싶다.
        // hash 함수를 내부적으로 사용 가능 (내장) -> keccak256
        // keccak256 => 입력 스트링을 랜뎜 256비트 16진수로 매핑 / 256bit == 32byte , 16진수 64자리
        uint rand = uint(keccak256(abi.encodePacked(_str))); // uint로 형 변환 진행
        // hash 함수를 쓸 때 내장함수를 사용하여 인코딩 한 내용을 넣어주어야 한다.
        return rand % dnaModulus;
    }

    // view , pure 가 없다는 것은 상태변수의 내용을 바꿨다는 뜻
    function createRandomZombie(string memory _name) public {
        uint randDna = _generateRandomDna(_name);
        _createZombie(_name, randDna); // 상태변수 내용 바꿈.
    }

}