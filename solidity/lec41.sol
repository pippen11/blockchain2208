// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 < 0.9.0;

import "./lec41_1.sol";

// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v3.4/contracts/math/SafeMath.sol";
// nft나 erc20토큰등 라이브러리제공?

contract lec41 is HiSolidity{
    using SafeMath0 for uint8;
    uint8 public a; 
    // uint256 public maximum = 2 ** 256 -1;
    function becomeOverflow(uint8 _num1,uint8 _num2) public {
        a = _num1.add(_num2);
       
    } 
    
}