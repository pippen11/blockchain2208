// SPDX-License-Identifier:MIT
pragma solidity ^0.8.19;

import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract Minting is ERC721 {
  constructor(
    string memory _name,
    string memory _symbol
  ) ERC721(_name, _symbol) {}

  function _minting(uint _tokenId) public {
    _mint(msg.sender, _tokenId);
  }

  function tokenURI(
    uint _tokenId
  ) public pure override returns (string memory) {
    return
      "https://ipfs.io/ipfs/QmawVbLDQU4Mg3TLuRpac5AAY7ZtWAB5ak93qxrcPRRQ4i";
  }
}
