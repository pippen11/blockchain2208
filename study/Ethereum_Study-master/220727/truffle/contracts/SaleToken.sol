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

}