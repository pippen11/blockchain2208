// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./NftToken.sol";

// 사용자 간 NFT 판매 및 구매에 관한 컨트랙트
contract SaleToken {
  NftToken public Token;

  //NFTToken 컨트렉트를 타입으로 지정

  // 배포된 NFT 토큰 컨트랙트를 정의
  // 거래 코드를 구현

  //address _tokenAddress : CA(NftToken의 CA)
  constructor(address _tokenAddress) {
    Token = NftToken(_tokenAddress);
    // CA에 해당하는 컨트랙트 정보받아와서 컨트랙트 객체만들어서 Token정의
  }

  // 이거 질문

  struct TokenInfo {
    // 토큰 정보 구조체
    uint tokenId;
    uint Rank;
    uint Type;
    uint price;
    // 가격, 0일때 판매중이 아닌것
  }

  mapping(uint => uint) public tokenPrices;
  // tokenId => price,
  // NFT 가격 매핑
  uint[] public SaleTokenList;

  // 판매중인 NFT tokenId 목록

  function SalesToken(uint _tokenId, uint _price) public {
    // 판매등록
    address tokenOwner = Token.ownerOf(_tokenId);
    // NFT의 소유자 찾기
    // tokenId 소유자 계정
    require(tokenOwner == msg.sender);
    // NFT 소유자가 판매등록을 했는가?
    require(_price > 0);
    //가격이 0 초과인가?
    require(Token.isApprovedForAll(msg.sender, address(this)));
    // NFT에 대한 권한이 현재 컨트렉트에 있는가?
    // OpenSea를 기준으로 했을때 setApprovedForAll 메서드가 이미 있다.
    // -메타마스크를 연결했을때 / 로그인했을때 => 메타마스크의 계정에대해 권한을 위임 받는다(서명)
    // owner가 판매 컨트랙트에게 모든 토큰을 위임했는지 확인
    // msg.sender : 판매하는 사람 (토큰 소유자)
    // 두번째 인자값 : 대리인 (OpenSea 계정)

    tokenPrices[_tokenId] = _price;
    // 가격 매핑
    SaleTokenList.push(_tokenId);
    // 판매 목록에 추가
  }

  function PurchaseToken(uint _tokenId) public payable {
    // 구매
    address tokenOwner = Token.ownerOf(_tokenId);
    // NFT 소유자 찾기

    require(tokenOwner != msg.sender, "you are saler");
    // 판매가자 구매하려고 하는가?
    // 1. 판매자가 자신의 토큰을 구매하는 것 방지
    require(tokenPrices[_tokenId] > 0, "not sales");
    // 가격 확인, 판매중인가?
    // 2. 판매 중인 토큰만 구매할 수 있도록 조건 체크
    // tokenPrices 값이 0 보다 클 경우 판매중인 상품으로 인식
    require(tokenPrices[_tokenId] <= msg.value, "not enough price");
    // 가격 확인, 구매자가 충분한 이더를 보냈는가?
    // 3. 구매자가 지불한 이더가 판매가격 이상인지 체크

    payable(tokenOwner).transfer(msg.value);
    //  CA 가 판매자 계정에게 이더 전송
    // 현재 컨트렉트가 NFT 소유자에게 구매자로부터 받은 이더 전달
    Token.transferFrom(tokenOwner, msg.sender, _tokenId);
    //NFT 소유자로부터 구매자에게 NFT 전송
    // Token.transferFrom() 실행 주체는 CA
    // 여기서 msg.sender는 PurchaseToken() 을 실행한 구매자

    tokenPrices[_tokenId] = 0;
    // 가격 0 , 판매중지
    popSaleToken(_tokenId);
    // 판매 목록에서 제외
  }

  function cancelSaleToken(uint _tokenId) public {
    //판매 취소
    address tokenOwner = Token.ownerOf(_tokenId);

    require(tokenOwner == msg.sender);
    // 1. 판매자인가

    require(tokenPrices[_tokenId] > 0);
    //  2. 판매중인가

    tokenPrices[_tokenId] = 0;
    // 가격 0 , 판매중지
    popSaleToken(_tokenId);
    // 판매 목록에서 제외
  }

  function popSaleToken(uint _tokenId) private returns (bool) {
    // 전달 받은 토큰을 SaleTokenList에서 삭제 메서드
    // 만약에 SaleTokenList=[1,2,3,4,5,6] / 삭제할 토큰은 3
    for (uint i = 0; i < SaleTokenList.length; i++) {
      if (SaleTokenList[i] == _tokenId) {
        // i=2 => SaleTokenList[2]=3 ==(_tokenId =3)
        // 마지막게 같은게나오면
        SaleTokenList[i] = SaleTokenList[SaleTokenList.length - 1];
        // SaleTokenList => [1,2,6,4,5,6]
        // 마지막껄 대체함 , 덮어썼다
        SaleTokenList.pop();
        // 그리고 마지막껄 뺐다.
        // SaleTokenList=> [1,2,6,4,5]
        return true;
      }
    }
    return false;
  }

  function getSaleTokenList() public view returns (TokenInfo[] memory) {
    //판매중인 전체 NFT 목록 가져오기 메서드
    // [{tokenId: 1, Type: 1, Rank: 2, price: ..}] 형태로 만들어서 return
    require(SaleTokenList.length > 0);
    // NFT 없는지 확인

    TokenInfo[] memory list = new TokenInfo[](SaleTokenList.length);
    // 등록된 NFT 개수를 크기로 배열 생성(new를 붙여야한다)
    // Javascript 상에서는 let list = new Array(SaleTokenList.length)

    for (uint i = 0; i < SaleTokenList.length; i++) {
      uint tokenId = SaleTokenList[i];
      uint Rank = Token.getTokenRank(tokenId);
      uint Type = Token.getTokenType(tokenId);
      uint price = tokenPrices[tokenId];

      list[i] = TokenInfo(tokenId, Rank, Type, price);
      // NFT 정보 생성해서 list에 저장
    }
    return list;
  }

  function getOwnerTokens(
    address _tokenOwner
  ) public view returns (TokenInfo[] memory) {
    // NFT 소유자 기준으로 갖고있는 NFT 목록 가져오기
    uint balance = Token.balanceOf(_tokenOwner);
    // 갖고있는 NFT 개수 가져오기
    require(balance > 0);
    // NFT 개수 확인, 없으면 멈춤

    TokenInfo[] memory list = new TokenInfo[](balance);

    for (uint i = 0; i < balance; i++) {
      uint tokenId = Token.tokenOfOwnerByIndex(_tokenOwner, i);
      //tokenOfOwnerByIndex: 소유자와 소유자기준 토큰의 index로 토큰id검색
      // ERC721Enumberable 컨트렉트에 존재
      // 소유자의 NFT 목록중 i 번째의 ID를 가져온다.
      uint Rank = Token.getTokenRank(tokenId);
      uint Type = Token.getTokenType(tokenId);
      uint price = tokenPrices[tokenId];

      list[i] = TokenInfo(tokenId, Rank, Type, price);
      // NFT 정보 생성해서 list에 저장
    }
    return list;
  }

  function getLatestToken(
    address _tokenOwner
  ) public view returns (TokenInfo memory) {
    // 소유자 기준의 마지막 NFT 정보를 가져온다.
    // 민팅 직후에 사용할수있다.
    // 소유하고 있는 최신 NFT view 함수, minting 직후 사용자에게 보여주기 위한 용도
    uint balance = Token.balanceOf(_tokenOwner);

    uint tokenId = Token.tokenOfOwnerByIndex(_tokenOwner, balance - 1);
    // 마지막꺼니까 index-1
    // [1,2,3] => 마지막 인덱스는 2

    uint Rank = Token.getTokenRank(tokenId);
    uint Type = Token.getTokenType(tokenId);
    uint price = tokenPrices[tokenId];

    return TokenInfo(tokenId, Rank, Type, price);
    // 마지막껏만 리턴해주면되니까 list에안넣음
  }
}
