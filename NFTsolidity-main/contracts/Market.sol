// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "./SdToken.sol";

contract Market {
  SdToken public Token;


  // 토큰 먼저 배포 후 해당 컨트랙트의 주소를 넣어서 배포진행
  constructor(address _tokenAddress){
    Token = SdToken(_tokenAddress);
  }

  struct TokenInfo {
    uint tokenId;
    uint Rank;
    uint Type;
    uint price;
  }


  // 1. 토큰가격 매핑
  // 2. 판매토큰 배열
  mapping(uint => uint) public tokenPrices; // tokenId : price;
  uint[] public SaleTokenList; // 판매중인 tokenId 담긴 배열. 

  // 토큰 판매 등록
  function SalesToken(uint _tokenId, uint _price) public {
    // 토큰 판매 전 검증 1. 토큰소유자인가? 2. 가격이 0보다 큰가? 3. 마켓이 대리자격이 있는가?
    address tokenOwner = Token.ownerOf(_tokenId);
    require(tokenOwner == msg.sender, "only owner can sell token");
    require(_price > 0, "price error");
    require(Token.isApprovedForAll(msg.sender, address(this)), "token approve error");
    // 오픈시에 처음 판매등록을 할 때 사용자의 토큰을 오픈시에게 approvedForAll 해주는 서명이 한번 있음.(총 두번 요청 보내게 되어있음). 그 이후로는 판매만..
    // 즉, 이 컨트랙트는 사용자에게 approvedForAll로 대리권한을 위임받은 상태여야함. => 이거는 클라이언트에서 setApprovalForAll 메소드 미리 실행하는 방식으로.

    // 토큰 판매 등록
    tokenPrices[_tokenId] = _price;
    SaleTokenList.push(_tokenId);
  }

  // 토큰 구매하기 : 구매자 -> ca -> 판매자
  function PurchaseToken(uint _tokenId) public payable {
    address tokenOwner = Token.ownerOf(_tokenId);
    require(tokenOwner != msg.sender, "1"); // 판매자와 구매자가 동일한지 확인
    require(tokenPrices[_tokenId] > 0, "2"); // 판매 중인 토큰인지 확인
    require(tokenPrices[_tokenId] <= msg.value, "3");

    payable(tokenOwner).transfer(msg.value); // 판매자에게 송금
    Token.transferFrom(tokenOwner, msg.sender, _tokenId);

    tokenPrices[_tokenId] = 0;
    popSaleToken(_tokenId);
  }

  function cancelSaleToken(uint _tokenId) public {
    address tokenOwner = Token.ownerOf(_tokenId);
    require(tokenOwner == msg.sender, "only owner can cancel token sale");
    require(tokenPrices[_tokenId] > 0); // 판매중인 토큰
    
    tokenPrices[_tokenId] = 0;
    popSaleToken(_tokenId);
  }

  function popSaleToken (uint _tokenId) private returns(bool result) {
    for (uint i=0; i < SaleTokenList.length; i++) {
      if (SaleTokenList[i] == _tokenId) {
        SaleTokenList[i] = SaleTokenList[SaleTokenList.length - 1];
        SaleTokenList.pop();
        return true;
      }
    }
  }

  function getSaleTokenList() public view returns (TokenInfo[] memory) {
    require(SaleTokenList.length > 0); // 판매중인 토큰 없을 시 실행안됨.
    TokenInfo[] memory list = new TokenInfo[](SaleTokenList.length); // 배열의 크기를 Length만큼 미리 정해줌.
    for (uint i=0; i < SaleTokenList.length; i++) {
      uint tokenId = SaleTokenList[i];
      uint Rank = Token.getTokenRank(tokenId);
      uint Type = Token.getTokenType(tokenId);
      uint price = tokenPrices[tokenId];
      list[i] = TokenInfo(tokenId, Rank, Type, price);
    }
    return list;
  }

  function getOwnerTokens(address _tokenOwner) public view returns (TokenInfo[] memory) {
    // tokenOfOwnerByIndex
    // balanceOf

    uint balance = Token.balanceOf(_tokenOwner);
    require(balance != 0, "balance = 0");
    TokenInfo[] memory list = new TokenInfo[](balance);
    for (uint i=0; i<balance; i++) {
      uint tokenId = Token.tokenOfOwnerByIndex(_tokenOwner, i);
      uint Rank = Token.getTokenRank(tokenId);
      uint Type = Token.getTokenType(tokenId);
      uint price = tokenPrices[tokenId];
      list[i] = TokenInfo(tokenId, Rank, Type, price);
    }
    return list;
  }

  function latestToken(address _tokenOwner) public view returns(TokenInfo memory) {
    uint balance = Token.balanceOf(_tokenOwner);
    require(balance != 0, "balance = 0");
    uint tokenId = Token.tokenOfOwnerByIndex(_tokenOwner, balance - 1);
    uint Rank = Token.getTokenRank(tokenId);
    uint Type = Token.getTokenType(tokenId);
    uint price = tokenPrices[tokenId];
    return TokenInfo(tokenId, Rank, Type, price);
  }
}