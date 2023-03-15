// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "./JwToken.sol";

// 사용자 간 NFT 판매 및 구매에 관한 컨트랙스
contract SaleToken {
    // swap 컨트랙트에서 처럼,,
    JwToken public Token;

    constructor(address _tokenAddress) {
        Token = JwToken(_tokenAddress);
    }

    struct TokenInfo {
        uint tokenId;
        uint Rank;
        uint Type;
        uint price;
    }

    // 토큰 가격 맵핑
    mapping(uint => uint) public tokenPrices;
    // tokenId 값 => 가격

    // 판매 토큰 배열
    // 판매중인 토큰의 tokenId 값이 들어감.
    uint[] public SaleTokenList;

    // 판매 등록하는 함수
    // 판매할 tokenId 값, 판매 가격
    function SalesToken(uint _tokenId, uint _price) public {

        address tokenOwner = Token.ownerOf(_tokenId); // tokenId 소유자 계정
        // 1. 토큰 소유자만 판매 가능
        require(tokenOwner == msg.sender);

        // 2. 판매 가격이 0보다 큰값인가
        require(_price > 0);

        // 3. OpenSea 플랫폼에서는 setApprovalForAll() 함수가 실행되어 있는 상태 (메타마스크 연결할 때 실행됨)
        // OpenSea isApprovedForAll
        require(Token.isApprovedForAll(msg.sender, address(this)));
        // owner가 판매 컨트랙트에게 모든 토큰을 위임했는지 확인
        // msg.sender : 판매하는 사람 (토큰 소유자) 
        // 두번째 인자값 : 대리인 (OpenSea 계정)
        
        tokenPrices[_tokenId] = _price;
        
        SaleTokenList.push(_tokenId);
    }

    // 토큰 구매 함수
    // 구매자 입장에서 어떤 토큰을 구매할 것인지
    function PurchaseToken(uint _tokenId) public payable {
        
        address tokenOwner = Token.ownerOf(_tokenId);
        // 1. 판매자가 자신의 토큰을 구매하는 것 방지
        require(tokenOwner != msg.sender);

        // 2. 판매 중인 토큰만 구매할 수 있도록 조건 체크
        // tokenPrices 값이 0 보다 클 경우 판매중인 상품으로 인식
        require(tokenPrices[_tokenId] > 0);

        // 3. 구매자가 지불한 이더가 판매가격 이상인지 체크
        require(tokenPrices[_tokenId] <= msg.value);

        // CA 가 판매자 계정에게 이더 전송
        payable(tokenOwner).transfer(msg.value);

        // Token.transferFrom() 실행 주체는 CA
        // 여기서 msg.sender는 PurchaseToken() 을 실행한 구매자
        Token.transferFrom(tokenOwner, msg.sender, _tokenId);

        // 판매 가격을 0으로 바꾸고 SaleTokenList 에서 값 제거
        tokenPrices[_tokenId] = 0;
        popSaleToken(_tokenId);
    }

    function cancelSaleToken(uint _tokenId) public {
        address tokenOwner = Token.ownerOf(_tokenId);
        // 1. 판매자인가
        require(tokenOwner == msg.sender);
        // 2. 판매중인가
        require(tokenPrices[_tokenId] > 0);
        
        tokenPrices[_tokenId] = 0;
        popSaleToken(_tokenId);
    }

    function popSaleToken(uint _tokenId) private returns (bool) {
        for (uint i = 0; i < SaleTokenList.length; i++) {
            if (SaleTokenList[i] == _tokenId) {
                // i == index
                SaleTokenList[i] = SaleTokenList[SaleTokenList.length - 1];
                SaleTokenList.pop();
                return true;
            }
        }
        return false;
    }

    // 전체 판매 리스트 view 함수
    function getSaleTokenList() public view returns (TokenInfo[] memory) {
        // [{tokenId: 1, Type: 1, Rank: 2, price: ..}] 형태로 만들어서 return

        require(SaleTokenList.length > 0);

        TokenInfo[] memory list = new TokenInfo[](SaleTokenList.length); // length 길이 만큼의 빈 값을 갖는 배열
        // const arr = new Array(4)

        for (uint i = 0; i < SaleTokenList.length; i++) {
            uint tokenId = SaleTokenList[i];
            uint Rank = Token.getTokenRank(tokenId);
            uint Type = Token.getTokenType(tokenId);
            uint price = tokenPrices[tokenId];

            list[i] = TokenInfo(tokenId, Rank, Type, price);  // list 배열 안에 구조체 넣기
        }

        return list;
    }
    // 데이터를 담고 있는 배열을 메모리에 저장하는 데이터로 만든다.
    // 메모리로 만들어진 배열 안에 구조체를 만들어 놓고 return
    // 함수 실행 완료 후 메모리의 데이터는 지워진다

    // 소유하고 있는 NFT 리스트 view 함수
    // 누가 소유하고 있는 NFT인지 -> 인자값
    function getOwnerTokens(address _tokenOwner) public view returns (TokenInfo[] memory) {

        uint balance = Token.balanceOf(_tokenOwner);

        require(balance != 0);

        TokenInfo[] memory list = new TokenInfo[](balance);

        for (uint i = 0; i < balance; i++) {
            uint tokenId = Token.tokenOfOwnerByIndex(_tokenOwner, i);
            uint Rank = Token.getTokenRank(tokenId);
            uint Type = Token.getTokenType(tokenId);
            uint price = tokenPrices[tokenId];

            list[i] = TokenInfo(tokenId, Rank, Type, price);
        }

        return list;
    }

    // 소유하고 있는 최신 NFT view 함수, minting 직후 사용자에게 보여주기 위한 용도
    function getLatestToken(address _tokenOwner) public view returns (TokenInfo memory) {
        uint balance = Token.balanceOf(_tokenOwner);
        uint tokenId = Token.tokenOfOwnerByIndex(_tokenOwner, balance-1);
        uint Rank = Token.getTokenRank(tokenId);
        uint Type = Token.getTokenType(tokenId);
        uint price = tokenPrices[tokenId];

        return TokenInfo(tokenId, Rank, Type, price);
    }

}

// Solidity에서 연산 -> Storage를 사용하는 연산일 경우 비용 발생
// memory만 사용할 경우, 비용 X

// view 함수를 만들어줄 때 return에 memory 쓰는 경우
// storage에 저장하지 않고 return 하고 싶을 때..

// 모든 인자값은 디폴트가 memory
// 하지만 string은 Solidity에서 제공하는 타입이 아니다. 그래서 memory를 명시해 준 것
// bytes로 한다면 memory를 쓸 필요가 없다.