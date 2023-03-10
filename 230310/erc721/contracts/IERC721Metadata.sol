// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IERC721Metadata {
  function name() external view returns (string memory);

  function symbol() external view returns (string memory);

  function tokenURI(uint tokenId) external view returns (string memory);
}
// 여기서 메타데이터는 이름,심볼,토큰유알아이
