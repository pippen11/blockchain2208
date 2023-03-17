// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

contract NftToken is ERC721Enumerable, ERC721URIStorage, Ownable {
  // 이거터져서 밑에서 함수 정의들하면 안터짐
  using Counters for Counters.Counter;
  Counters.Counter private _tokenId;

  // counter를 toeknId를 만들겟다

  // Counter라는 라이브러리 쓰면 이런식으로씀 증가시키거나 감소시키거나 이런 count정의랑 같다고보면됨

  // 하나씩 늘리고 하나씩 줄이는 counter만들어서 함

  constructor(
    string memory _name,
    string memory _symbol
  ) ERC721(_name, _symbol) {}

  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 firstTokenId,
    uint256 batchSize
  ) internal override(ERC721, ERC721Enumerable) {
    super._beforeTokenTransfer(from, to, firstTokenId, batchSize);
    // batchSize는 super받으려면 써야함
  }

  function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
    // tokenId burn하는거다
    //ERC721URIStorage를 타고들어가서 ERC721를가라 는뜻 상속 받는게 겹치니까 이렇게 적어주는거다
    // super는 오른쪽에서있는걸 상속받는다(ERC721URIStorage) 처음에 ERC721URIStorage찾아서 없으면 ERC721꺼 가져다씀
    super._burn(tokenId);
  }

  function supportsInterface(
    // 이함수를통해 해당 interface 즉 함수가 있는지 확인한다 (안터지려면 넣어줘야함)
    // interfaceId: 함수에 대한 정보를 16진수로표현
    bytes4 interfaceId
  ) public view override(ERC721, ERC721Enumerable) returns (bool) {
    return super.supportsInterface(interfaceId);
  }

  function tokenURI(
    uint256 tokenId
  ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
    return super.tokenURI(tokenId);
    // toenId넣어서 uri만들고
  }

  ////////////////////////////////여기까지는 ERC721, ERC721URIStorage 둘다갖다씀

  function _baseURI() internal pure override returns (string memory) {
    // token저장하는 주소에있어서 이걸 기본적으로 쓰겠다라는 의미 가져올때는 baseURI합쳐서 가져온다
    // pinata현질하면 이주소로하면된다
    return "https://gateway.pinata.cloud/ipfs/";
  }

  function safeMint(string memory uri) public {
    uint tokenId = _tokenId.current();

    _tokenId.increment();
    _safeMint(msg.sender, tokenId);
    // ERC721에서 해서 갖고옴
    // 업데이트된 민팅
    _setTokenURI(tokenId, uri);
    // ERC721에서 해서 갖고옴
    // nft정보 cid를 적을곳
  }
}
