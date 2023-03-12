// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IERC721 {

  event Transfer(
    address indexed _from,
    address indexed _to,
    uint indexed _tokenId
  );
  // 토큰 전송시 이벤트
      // ERC20과 다르게 tokenId를 인자값으로 전달
  
  event Approval(
    address indexed _from,
    address indexed _approved,
    uint indexed _tokenId
  );
  // 토큰 하나에대한 권한 위임시 이벤트
   // _approved true : _owner가 가지고 있는 모든 토큰을 _operator에게 위임
    // _approved false : 대리인 취소
  event ApprovalForAll(
    address indexed _owner,
    address indexed _operator,
    bool _approved
  );

  // 모든 토큰에 대한 권한 위임시 이벤트
  // _arrpoved가 true면 모든 토큰 권한 위임

  function balanceOf(address _owner) external view returns (uint balance);

  // 소유자의 토큰 총 개수 조회( owner가 가지고 있는 총 NFT 개수 반환)

  function ownerOf(uint _tokenId) external view returns (address owner);

  // 토큰 소유자 조회(_tokenId <- 소유하고 있는 address 반환)

  function transferFrom(address _from, address _to, uint _tokenId) external;

  // 토큰 전송( // _from 이 _to 에게 _tokenId 값을 갖는 NFT 전송)

  function approve(address _to, uint _tokenId) external;

  // 토큰 하나에 대한 권한 위임(msg.sender가 _to를 대리인으로 지정)

  function setApprovalForAll(address _operator, bool _approved) external;

  // 모든 토큰에 대한 권한 위임 설정(취소할수도있다.)
    // msg.sender가 가진 모든 NFT를 대리인에게 위임
    // _operator : 모든 NFT를 관리하는 대리인
    // bool 타입의 _approved로 대리인을 만들수도 취소시킬 수도 있다.

  function getApproved(uint _tokenId) external view returns (address operator);

  // 토큰에 대한 권한을 위임 받은 계정(대리인)
  // approve 한 대리인의 계정을 반환하는 함수
  // approve가 되었는지 안되어 있는지 확인 가능
  // approve()의 _to 값을 반환하는 함수

  function isApprovedForAll(
    address _owner,
    address _operator
  ) external view returns (bool);
  // 모든 토큰에 대한 권한을 위임했는지 확인
   // setApprovalForAll()의 _approved 를 return 해주는 함수
}
