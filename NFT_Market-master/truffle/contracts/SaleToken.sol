// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "./gyulToken.sol";

contract SaleToken{
    GyulToken public Token;

    constructor(address _tokenAddress){
        Token = GyulToken(_tokenAddress);
    }

    struct TokenInfo{
        uint tokenId;
        uint Rank;
        uint Type;
        uint price;
    }

    // 토큰 가격 맵핑
    mapping(uint => uint) public tokenPrices;

    // 판매 토큰 배열
    uint[] public SaleTokenList;

    function SalesToken(uint _tokenId, uint _price) public {

        address tokenOwner = Token.ownerOf(_tokenId);

        require((tokenOwner) == msg.sender);
        require(_price > 0);
        // 오픈씨 isapprovedForall
        require(Token.isApprovedForAll(msg.sender, address(this)));

        tokenPrices[_tokenId] = _price;
        SaleTokenList.push(_tokenId);

    }

    //구매 구매자 -> CA-> 판매자
    // 어떤 토큰 구매할 것인지
    function PurchaseToken(uint _tokenId) public payable{
        address tokenOwner = Token.ownerOf(_tokenId);
        require(tokenOwner != msg.sender);
        require(tokenPrices[_tokenId] > 0);
        require(tokenPrices[_tokenId]<= msg.value);

        payable(tokenOwner).transfer(msg.value);

        Token.transferFrom(tokenOwner, msg.sender, _tokenId);
        tokenPrices[_tokenId] = 0;
        popSaleToken(_tokenId);
    }

    function cancelSaleToken(uint _tokenId) public {
        address tokenOwner = Token.ownerOf(_tokenId);
        require(tokenOwner == msg.sender);
        require(tokenPrices[_tokenId] > 0);

        tokenPrices[_tokenId] = 0;
        popSaleToken(_tokenId);
    }

    function popSaleToken(uint _tokenId) private returns(bool){
        for(uint i=0; i<SaleTokenList.length; i++){
            if (SaleTokenList[i] == _tokenId){
                // i = index

                SaleTokenList[i] = SaleTokenList[SaleTokenList.length - 1];
                SaleTokenList.pop();
                return true;
            }
        }
        return false;
    }

    function getSaleTokenList() public view returns(TokenInfo[] memory){
        require(SaleTokenList.length > 0);
        TokenInfo[] memory list = new TokenInfo[](SaleTokenList.length);

        for(uint i = 0; i < SaleTokenList.length; i++){
            uint tokenId = SaleTokenList[i];
            uint Rank = Token.getTokenRank(tokenId);
            uint Type = Token.getTokenType(tokenId);
            uint price = tokenPrices[tokenId];
            list[i] = TokenInfo(tokenId, Rank, Type, price);
        }

        return list;
    }

    function getOwnerTokens(address _tokenOwner) public view returns(TokenInfo[] memory){
        uint balance = Token.balanceOf(_tokenOwner);

        require(balance != 0);
        TokenInfo[] memory list = new TokenInfo[](balance);
        for (uint i=0; i<balance; i++){
            uint tokenId = Token.tokenOfOwnerByIndex(_tokenOwner, i);
            uint Rank = Token.getTokenRank(tokenId);
            uint Type = Token.getTokenType(tokenId);
            uint price = tokenPrices[tokenId];

            list[i] = TokenInfo(tokenId, Rank, Type, price);
        }

        return list;
    }

    //내가 소유하고 있는 마지막 토큰 가져오는 view 함수
    function getLatestToken(address _tokenOwner) public view returns(TokenInfo memory){
        uint balance = Token.balanceOf(_tokenOwner);
        uint tokenId = Token.tokenOfOwnerByIndex(_tokenOwner, balance-1);
        uint Rank = Token.getTokenRank(tokenId);
        uint Type = Token.getTokenType(tokenId);
        uint price = tokenPrices[tokenId];

        return TokenInfo(tokenId, Rank, Type, price);
    }

    

}