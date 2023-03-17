// SPDX-License-Identifier: MIT

pragma solidity ^0.8.15;
import "./node_modules/openzeppelin-solidity/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "./node_modules/openzeppelin-solidity/contracts/access/Ownable.sol";
import "./node_modules/openzeppelin-solidity/contracts/utils/Strings.sol";
contract GyulToken is ERC721Enumerable, Ownable{
    uint constant public MAX_TOKEN_COUNT = 1000; //발행량 설정
    uint public mint_price = 1 ether;
    string public metadataURI;
    constructor(string memory _name, string memory _symbol, string memory _metadataURI) ERC721(_name, _symbol){
        metadataURI = _metadataURI;
    }

    struct TokenData {
        uint Rank;
        uint Type;
    }
    mapping(uint => TokenData) public TokenDatas;
    uint[4][4] public tokenCount;

    function mintToken() public payable{

        require(msg.value == mint_price);
        //          1000              0~999
        require(MAX_TOKEN_COUNT > totalSupply());
        uint tokenId = totalSupply() + 1;

        TokenDatas[tokenId] = getRandomNum(msg.sender, tokenId);
        tokenCount[TokenDatas[tokenId].Rank-1][TokenDatas[tokenId].Type-1] += 1;
        
        payable(Ownable.owner()).transfer(msg.value);
        //owner contract 배포자
        _mint(msg.sender, tokenId);
    }

    function tokenURI(uint _tokenId) public override view returns(string memory){
        string memory Rank = Strings.toString(TokenDatas[_tokenId].Rank);
        string memory Type = Strings.toString(TokenDatas[_tokenId].Type);

        return string(abi.encodePacked(metadataURI,"/",Rank,"/",Type,".json"));

        //tokenId -> rank, type 1 -> (1,4) 2 -> (2,1)
        // url return... baseurl http://localhost:3000
        // return http://localhost:3000/metadata/1/4.json

    }

    function getRandomNum(address _owner, uint _tokenId) private pure returns(TokenData memory){
        uint randomNum = uint(keccak256(abi.encodePacked(_owner, _tokenId)))%100; //32byte

        TokenData memory data;

        if (randomNum < 5) {
            if (randomNum == 1) {
                data.Rank = 4;
                data.Type = 1;
            } else if (randomNum == 2) {
                data.Rank = 4;
                data.Type = 2;
            } else if (randomNum == 3) {
                data.Rank = 4;
                data.Type = 3;
            } else {
                data.Rank = 4;
                data.Type = 4;
            }
        } else if (randomNum < 13) {
            if (randomNum < 7) {
                data.Rank = 3;
                data.Type = 1;
            } else if (randomNum < 9) {
                data.Rank = 3;
                data.Type = 2;
            } else if (randomNum < 11) {
                data.Rank = 3;
                data.Type = 3;
            } else {
                data.Rank = 3;
                data.Type = 4;
            }
        } else if (randomNum < 37) {
            if (randomNum < 19) {
                data.Rank = 2;
                data.Type = 1;
            } else if (randomNum < 25) {
                data.Rank = 2;
                data.Type = 2;
            } else if (randomNum < 31) {
                data.Rank = 2;
                data.Type = 3;
            } else {
                data.Rank = 2;
                data.Type = 4;
            }
        } else {
            if (randomNum < 52) {
                data.Rank = 1;
                data.Type = 1;
            } else if (randomNum < 68) {
                data.Rank = 1;
                data.Type = 2;
            } else if (randomNum < 84) {
                data.Rank = 1;
                data.Type = 3;
            } else {
                data.Rank = 1;
                data.Type = 4;
            }
        }
        return data;
    }

    function setMetadataURI(string memory _uri) public onlyOwner{
        metadataURI = _uri;
    }

    function getTokenRank(uint _tokenId) public view returns(uint){
        return TokenDatas[_tokenId].Rank;
    }

    function getTokenType(uint _tokenId) public view returns(uint){
        return TokenDatas[_tokenId].Type;
    }

    function getTokenCount() public view returns(uint[4][4] memory){
        return tokenCount;
    }
}