// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

interface IERC721 {
    
    /* Event */
    event Transfer(address indexed _from, address indexed _to, uint indexed _tokenId); // 토큰 전송에 사용되는 이벤트
    // ERC20과 다르게 tokenId를 인자값으로 전달
    
    event Approval(address indexed _from, address indexed _approved, uint indexed _tokenId); 
    // 소유자가 대리인에게 어떤 토큰 아이디를,,
    // 계정 내 토큰 하나에 대한 위임

    // 추가된 이벤트
    // NFT는 한 토큰당 하나의 값어치 , 
    // 가지고 있는 모든 토큰을 대리인에게 맡기고 싶은 경우 존재,
    // 계정이 가지고 있는 모든 토큰에 대한 위임
    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);
    // owner가 operator에게 true/false
    // true : owner가 가지고 있는 모든 토큰을 operator에게 위임
    // false : 대리인 취소

    /* Function */
    function balanceOf(address _owner) external view returns (uint);
    // owner가 가지고 있는 총 NFT 개수

    function ownerOf(uint _tokenId) external view returns (address);
    // _tokenId <- 소유하고 있는 address 반환

    // transfer 함수
    function transferFrom(address _from, address _to, uint _tokenId) external;
    // 누가 누구에게 어떤 토큰 아이디를 전송할 것인지
    // external : 외부에서 사용하겠다는 뜻

    // approve 함수
    // 토큰 하나에 대해 대리인을 선정하는 메소드
    function approve(address _to, uint _tokenId) external;
    // msg.sender가 _to를 대리인으로 지정

    // approve 대리인의 주소를 리턴해주는 함수
    function getApproved(uint _tokenId) external view returns (address);
    // approve가 되었는지 안되어 있는지 확인하는 메소드
    // approve()의 _to 값을 반환하는 함수

    // setApprovalForAll 함수
    // owner가 가진 모든 NFT를 대리인에게 위임 
    function setApprovalForAll(address _operator, bool _approved) external;
    // msg.sender는 함수를 호출한 계정
    // operator : 모든 NFT를 관리하는 대리인
    // bool type으로 대리인을 만들수도 취소시킬 수도 있다.

    // setApprovalForAll()의 _approved 를 return 해주는 함수
    function isApprovedForAll(address _owner, address _operator) external view returns (bool);
    
}