// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

// import [변수명] from '../../HelloWorld.sol';
// Solidity에서는 import를 해오면 전체 코드가 오게 된다.(파일 전체를 불러온 것)

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
// ERC20 import 

// ERC20 상속 받기
contract JwToken is ERC20 {
    string public _name = "JwToken";
    string public _symbol = "JTK";
    uint256 public _totalSupply = 5000 * (10 ** decimals());

    // ERC20.sol 에서 이미 생성자 함수가 작성되어 있다.
    // class의 super()
    constructor() ERC20(_name, _symbol) {

        // mint() : 컨트랙트 배포한 사람에게 토큰 발행하는 함수
        _mint(msg.sender, _totalSupply);
        
    }
    
}

