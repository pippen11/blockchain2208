// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "../node_modules/openzeppelin-solidity/contracts/access/Ownable.sol";
import "../node_modules/openzeppelin-solidity/contracts/utils/Strings.sol";

contract SdToken is ERC721Enumerable, Ownable {
  uint256 public constant MAX_TOKEN_COUNT = 1000;
  uint256 public mint_price = 1 ether;
  string public metadataURI; // 사용하고자하는 메타데이터의 주소. pinata 주소 사용

  constructor(string memory _name, string memory _symbol, string memory _metadataURI)
    ERC721(_name, _symbol)
  {
    metadataURI = _metadataURI;
  }

  struct TokenData {
    uint8 Rank;
    uint8 Type;
  }

  mapping(uint256 => TokenData) public TokenDatas; // tokenId : TokenData
  uint[4][4] public tokenCount;

  function mintToken() public payable {
    require(msg.value >= mint_price);
    require(totalSupply() < MAX_TOKEN_COUNT);
    uint256 tokenId = totalSupply() + 1;
    TokenDatas[tokenId] = _getRandomNum(msg.sender, tokenId);
    tokenCount[TokenDatas[tokenId].Rank -1][TokenDatas[tokenId].Type -1] += 1;

    payable(Ownable.owner()).transfer(msg.value);
    _mint(msg.sender, tokenId);
  }

  function tokenURI(uint256 _tokenId)
    public
    view
    override
    returns (string memory)
  {
    // 솔리디티에서는 int -> string 변환이 안됨. 별도의 라이브러리(오픈제펠린에서 제공) 이용하여 바꿔야함. 문자열로 변환한 뒤 연결은 abi.encodePacked 이용해서
    string memory Rank = Strings.toString(TokenDatas[_tokenId].Rank);
    string memory Type = Strings.toString(TokenDatas[_tokenId].Type);
    return string(abi.encodePacked(metadataURI, "/", Rank, "/", Type, ".json"));
  }

  function _getRandomNum(address _owner, uint256 _tokenId)
    private
    pure
    returns (TokenData memory)
  {
    // owner와 tokenId를 연결하여 unique값을 만들어내서 해싱하여 랜덤넘버 출력할거임.
    // owner와 tokenId는 타입이 다르기 때문에 abi.encodePacked를 사용하여 하나의 스트링으로 이어줌.
    uint256 randomNum = uint256(keccak256(abi.encodePacked(_owner, _tokenId))) %
      100; // 두자리수 랜덤넘버
    TokenData memory data;

    // 아래와 같이 구간을 나눠 rank와 type 결정
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

  function setMetadataURI(string memory _uri) public onlyOwner {
    metadataURI = _uri;
  }

  function getTokenRank(uint _tokenId) public view returns(uint) {
    return TokenDatas[_tokenId].Rank;
  }

  function getTokenType(uint _tokenId) public view returns(uint) {
    return TokenDatas[_tokenId].Type;
  }

  function getTokenCount() public view returns(uint[4][4] memory) {
    return tokenCount;
  } 
}
