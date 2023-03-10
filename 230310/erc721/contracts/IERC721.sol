// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IERC721 {
  event Transfer(
    address indexed _from,
    address indexed _to,
    uint indexed _tokenId
  );
  // 토큰 전송시 이벤트
  event Approval(
    address indexed _from,
    address indexed _approved,
    uint indexed _tokenId
  );
  // 토큰 하나에대한 권한 위임시 이벤트
  event ApprovalForAll(
    address indexed _owner,
    address indexed _operator,
    bool _approved
  );

  // 모든 토큰에 대한 권한 위임시 이벤트
  // _arrpoved가 true면 모든 토큰 권한 위임

  function balanceOf(address _owner) external view returns (uint balance);

  // 소유자의 토큰 총 개수 조회

  function ownerOf(uint _tokenId) external view returns (address owner);

  // 토큰 소유자 조회

  function transferFrom(address _from, address _to, uint _tokenId) external;

  // 토큰 전송

  function approve(address _to, uint _tokenId) external;

  // 토큰 하나에 대한 권한 위임

  function setApprovalForAll(address _operator, bool _approved) external;

  // 모든 토큰에 대한 권한 위임 설정(취소할수도있다.)

  function getApproved(uint _tokenId) external view returns (address operator);

  // 토큰에 대한 권한을 위임 받은 계정(대리인)

  function isApprovedForAll(
    address _owner,
    address _operator
  ) external view returns (bool);
  // 모든 토큰에 대한 권한을 위임했는지 확인
}
