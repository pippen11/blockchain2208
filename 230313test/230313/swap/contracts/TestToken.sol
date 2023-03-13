// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Solidity에서는 import를 해오면 전체 코드를 가져오게 된다.(파일 전체를 불러오는 것)
// import ERC20
import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

// ERC20을 상속 받아 JwToken 컨트랙트 작성
contract testToken is ERC20 {
  string public _name = "testToken";
  string public _symbol = "Test";
  uint256 public _totalSupply = 5000 * (10 ** decimals());

  constructor() ERC20(_name, _symbol) {
    // _mint() : 컨트랙트를 배포한 사람에게 토큰 발행
    _mint(msg.sender, _totalSupply);
  }
}
