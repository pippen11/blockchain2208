// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./ERC721.sol";


// contract ERC721Enumerable 은 ERC721 컨트랙트를 상속받고 있으며 ERC721Enumerable 컨트랙트 안에서 구현되는 기능은 크게 두가지이다.
// Minting을 했을 때 tokenId 값을 자동으로 생성해주는 기능.
// NFT 마켓 플레이스에서는 특정 계정이 소유하고 있는 NFT 목록들을 보여주게 된다. 따라서 ERC721Enumerable 컨트랙트 안에서 특정 계정이 소유하고 있는 tokenId 값들을 찾아내는 기능을 구현. 
// 추가로 ERC721 컨트랙트 안에서 선언해주었던 _beforeTokenTransfer( ) 함수의 기능을 ERC721Enumerable 컨트랙트 안에서 구현해주고자 한다. 다음은 contract ERC721Enumerable 의 전체 코드이다.


contract ERC721Enumerable is ERC721 {
  uint[] private _allTokens;
  // 발행된 NFT의 tokenId 값을 배열 안에 담아놓은 상태변수

  //여긴 객체
  mapping(address => mapping(uint => uint)) private _ownedTokens;
  // 소유자의 토큰의 index와 tokenid
  // {owner:{index:id}}
     // address => (index => tokenId)

  mapping(uint => uint) private _ownedTokensIndex;
    // tokenId => index

  // 토큰 id에 대한 index | {tokenid: 소유자기준의index}

  constructor(
    string memory _name,
    string memory _symbol
  ) ERC721(_name, _symbol) {}
  // constructor() 함수가 실행되면 인스턴스 생성까지 완료되는 것이기 때문에 ERC721에 있는 함수들까지 상속된다.
  function mint(address _to) public {
    _mint(_to, _allTokens.length);
    // 계정 주소만 받아서 minting, tokenId는 자동 생성(현재 토큰 개수)
  }

  // 소유주에따라 인덱스순서가 바뀌니 인덱스정리
  // mint, transferFrom메서드에서 호출된다.
  // _from이 _owner1 toenid 2를 보냄 _owner2에게
  function _beforeTokenTransfer(
    address _from,
    address _to,
    uint _tokenId
  ) internal override {
    //민팅은 from address(0)
    if (_from == address(0)) {
      // mint 메서드에서 호출된다.
      _allTokens.push(_allTokens.length);
      // 새로운 토큰 발행시 모든 토큰 배열에 추가한다
    } else {
      // < 전송 로직 >
      // 마지막 index에 있는 tokenId의 index와 
      // 내가 전송할 토큰의 index를 바꿔준다
      // 이렇게 함으로써 인덱스가 꼬이는 현상을 방지. 
      // transferFrom 메서드에서 실행

      // _owner1이 4개라면 lastestTokenIndex는 3이된다
      uint lastestTokenIndex = ERC721.balanceOf(_from) - 1;

      // 소유자의 토큰의 마지막 index
      uint tokenIndex = _ownedTokensIndex[_tokenId];
      // 오른쪽에서 결국 tokenid에맞는 index값
      //보낼 토큰 ID에 대한 소유자 기준의 index

      // 마지막토큰이면 if건너뜀
      if (tokenIndex != lastestTokenIndex) {
        // 보낼려는 토큰이 마지막 토큰이 아닐시
        uint lastestTokenId = _ownedTokens[_from][lastestTokenIndex];

        // 소유자의 마지막 토큰의 ID
        _ownedTokens[_from][tokenIndex] = lastestTokenId;

        // 소유자의 토큰 index의 ID를 소유자의 마지막 토큰의 ID로 정의
        _ownedTokensIndex[lastestTokenId] = tokenIndex;
        //소유자의마지막 토큰의 ID의 index를 _tokenId에 대한 index로수정
      }
      delete _ownedTokens[_from][lastestTokenIndex];
      //보내주는사람껄 지운다
      // 왼쪽꺼
      delete _ownedTokensIndex[_tokenId];
      // 오른쪽껄 지운다
      //오른쪽꺼
      // 소유자 기준의 토큰 삭제
    }
    uint length = ERC721.balanceOf(_to);
    // ERC721의 balanceOf()를 실행한 것이기에 가스비 소모 X
    // 그냥 balanceOf() 실행시 ERC721Enumerable가 상속 받은 balanceOf()를 사용한 것이기에 가스비 발생
    // 추가되기전 기준
    // 받는사람기준
    _ownedTokens[_to][length] = _tokenId;
    //_ownedTokens: 어떤계정에대해서 어떤 tokenId를 갖고있냐 index(ownedTokens[_to][length])지정에 토큰아이디도같이들어감
    //{owner:{index:id}}
    _ownedTokensIndex[_tokenId] = length;
    // _ownedTokensIndex 그림에서 오른쪽 index
    // {tokenid: 소유자기준의index}
    // 받는 계정에 토큰 추가 _ownedTokensIndex:어떤토큰이 몇번째인덱스에있냐
  }

  function totalSupply() public view returns (uint) {
    return _allTokens.length;
  }

  function tokenByIndex(uint _index) public view returns (uint) {
    require(_index < _allTokens.length);
    return _allTokens[_index];
  }
// 전체 토큰 리스트에서 index에 해당하는 tokenId 반환
  //전체 목록 기준의index로 토큰 ID검색
  // 모든 토큰 인덱스 다갖고있음

  function tokenOfOwnerByIndex(
    address _owner,
    uint _index
  ) public view returns (uint) {
    require(_index < balanceOf(_owner));
    return _ownedTokens[_owner][_index];
  }
   // index는 0부터 시작하기 때문에 index 범위 검사
  // ownedTokens에 따라서 index
  // 소유자와 소유자 기준의 토큰의 index로 토큰 id검색
}

// - 변수명, 함수명 인자값 그래서 그함수가 뭘하는지 알기가중요
