-erc20폴더에
npm init -y
npm i truffle
npm i truffle @openzeppelin/contracts
npm i -D prettier-plugin-solidity
npx truffle init

-erc721폴더에

npm init -y
npm i truffle

npm i -D prettier-plugin-solidity
npx truffle init

# ERC20 토큰을 라이브러리로 만들기

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
// ERC20 토큰 가져오기

```solidity
contract B7Token is ERC20 {
constructor(
stirng memory \_name,
string memory \_symbol,
uint256 \_amount
) ERC20(\_name, \_symbol) {
// ERC20의 constructor를 호출한다
//Javascript에서의 super와 같다
\_ming(msg.sender, \_amount \* 10 \*\* 18);
}
}
```
