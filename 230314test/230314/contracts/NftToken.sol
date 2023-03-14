// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
// ERC721 기본 컨트랙트

import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
// owner 관련 콘트렉트 _owner 등을 추가한다.
// 상속 받는 것만으로 컨트랙트 배포를 진행할 때 알아서 owner 상태변수에 컨트랙트 배포자의 EOA 계정값을 넣어준다.

import "../node_modules/@openzeppelin/contracts/utils/Strings.sol";

// toString을 위한 라이브러리
// -기존에 int, uint 등을 string화 하려면 byte로 바꿨다가 변경해야한다.
// -Strings 라이브러리는 위 기능을 편하게 제공한다.

contract NftToken is ERC721Enumerable, Ownable {
  // ERC721 기본 구현과 owner를 상속한다.
  uint public constant MAX_TOKEN_COUNT = 1000;
  // NFT 최대 발행량
  // constant << Javascript에서의 const, 바뀌지 않는 변수(상수)
  // 상수의 변수명을 정할때 전부 대문자로 하곤한다.

  uint public mint_price = 1 ether;
  // 민팅 가격, 사용자가 NFT를 올릴때마다 1이더씩 받는다.
  // ether, gwei , second, minute, day << 단위를 사용할수 있다.
  // 연산으로 양을 표현하게 될 경우 가스비 소모
  // Solidity에서는 1 ether 라고 표현하면 알아서 10**18으로 표현해준다.

  string public metadataURI;
  // NFT의 tokenId 값에 매칭되는 tokenURI의 앞부분
  // Webpage 구현에서의 baseURL과 같은 기능
  struct TokenData {
    // 토큰의 데이터
    // 현재 구현된 코드에서는 랜덤하게 넣을 예정
    // tokenId 값에 따라 랜덤한 Rank, Type을 부여하기 위한 구조체
    uint Rank;
    uint Type;
  }
  // - OpenSea에서 attributes에 출력된다.
  // - attribues에 출력되는 내용에 고나해서는 아래의 주소를 참조
  // -https://docs.opensea.io/docs/metadata-standards#attributes

  mapping(uint => TokenData) public TokenDatas;
  // tokenId => TokenData

  uint[4][4] public tokenCount;

  // 사용자에게 NFT 발행 상황을 보여주기 위한 용도의 상태변수
  // 토큰 데이터에 따른 NFT 토큰 발행량 확인용, [Rank][Type]
  // 4 * 4 이중배열
  // [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
  // Rank랑 Type을 4개씩 주겠다 코드구현에서는 앞에를 Rank를 주긴했따 6개 4개주면 uint[6][4] 이런식

  constructor(
    string memory _name,
    string memory _symbol,
    string memory _metadataURI
  ) ERC721(_name, _symbol) {
    metadataURI = _metadataURI;
  }

  function tokenURI(
    uint _tokenId
  ) public view override returns (string memory) {
    // if metadataURI : http://localhost:3000/metadata
    // return : http://localhost:3000/metadata/1/4.json
    // tokenURI를 생성 메서드
    // ERC721에 virtual 옵션을 포함하여 구현되어있음
    // uint -> string 형태로 바로 형변환 불가능
    // uint -> bytes -> string 으로 형변환
    // utils 디렉토리 안에 존재하는 Strings.sol 파일 활용
    string memory Rank = Strings.toString(TokenDatas[_tokenId].Rank);
    string memory Type = Strings.toString(TokenDatas[_tokenId].Type);
    // Strings 라이브러리를 사용해서 string화 한다.
    // Rank, Type은 uint 타입이다
    // abi.encodePacked("http://localhost:3000/metadata", "/", Rank, "/", Type, ".json")
    return string(abi.encodePacked(metadataURI, "/", Rank, "/", Type, ".json"));
    // NFT에 대한 데이터를 저장한 URI주소를 찾아 데이터를 받아올수 있도록 구현됨
  }

  function mintToken() public payable {
    // NFT 생성 메서드
    // mintToken() 을 실행할 때 이더를 지급하게끔 한다. CA에게 이더를 지급해서 NFT를 사는 개념.
    require(msg.value >= mint_price);
    // 생성 시 이더를 받고 가격을 확인한다. 돈받고 NFT 만들어준다
    require(MAX_TOKEN_COUNT > ERC721Enumerable.totalSupply());
    //_allTokens.length: totalsupply()
    // NFT 최대 개수 확인, 현재 1000개 이하로만 생성가능

    uint tokenId = ERC721Enumerable.totalSupply() + 1;
    // NFT 총 수량을 기준으로 tokenID 생성
    // 총발행량 + 1 로 tokenId 값 형성

    //// _tokenId 에 따라 metadata의 Rank 와 Type을 랜덤하게 생성하여 저장
    TokenData memory random = getRandomTokenData(msg.sender, tokenId);
    // 무작위 Rank와 Type을 만든다
    TokenDatas[tokenId] = random;
    // 생성한 토큰 데이터를 ID와 매칭하여 저장
    tokenCount[random.Rank - 1][random.Type - 1] += 1;
    // random.Rank , random.Type 0,1 1,2 등등 tokenCount를 +1을시켜준다

    // Rank와 Type을 기준으로 NFT 수량 정리
    // index는 0부터시작이라 -1시켜줌
    // // 해당 Rank 와 Type의 토큰이 몇개가 생성되었는지 확인 가능하도록 하기위해 tokenCount 상태변수 업데이트

    payable(Ownable.owner()).transfer(msg.value);

    // 받은 이더 컨트렉트 소유자에게 전달(NFT 토큰 컨트렉트 등록자)
    // CA -> 컨트랙트 배포자 계정으로 지급받은 이더 전송
    _mint(msg.sender, tokenId);
    // NFT 생성 (민팅)
  }

  function getRandomTokenData(
    address _owner,
    uint _tokenId
  ) private pure returns (TokenData memory) {
    // solidity에서는 random 함수가 없다
    // 해서 유일한 값인 tokenId를 가져와서 암호화한후 나머지 연산으로 0~99까지 랜덤한 수를 만든다.
    // abi.encodePacked(_owner, _tokenId); // 타입과 상관없이 합쳐주는 메소드

    uint randomNum = uint(keccak256(abi.encodePacked(_owner, _tokenId))) % 100;
    //abi.encodePacked(_owner, _tokenId) 이거자체가 _owner 지갑주소넣고 _tokenId랜덤으로넣고 16진수로 바꾼다음 keccak256으로 해시화한다음 uint써서 숫자로바꾼다음
    // 100으로 나눈 나머지는 무조건 0~99만나온다
    // 이거질문
    // keccak256 -> 32 byte
    // 주의 : keccak256() 에 같은 string 값을 전달하면 안된다.
    // 100으로 나눈 나머지로 가져오면 0~99?

    TokenData memory data;
    // return할 TokenData;
    // 상태변수를 사용한 게 아니라 메모리 상에 잠시 데이터를 저장한 것.

    if (randomNum < 5) {
      data.Rank = 4;
      if (randomNum == 1) {
        data.Type = 1;
      } else if (randomNum == 2) {
        data.Type = 2;
      } else if (randomNum == 3) {
        data.Type = 3;
      } else {
        data.Type = 4;
      }
    } else if (randomNum < 13) {
      data.Rank = 3;
      if (randomNum < 7) {
        data.Type = 1;
      } else if (randomNum < 9) {
        data.Type = 2;
      } else if (randomNum < 11) {
        data.Type = 3;
      } else {
        data.Type = 4;
      }
    } else if (randomNum < 37) {
      data.Rank = 2;
      if (randomNum < 19) {
        data.Type = 1;
      } else if (randomNum < 25) {
        data.Type = 2;
      } else if (randomNum < 31) {
        data.Type = 3;
      } else {
        data.Type = 4;
      }
    } else {
      data.Rank = 1;
      if (randomNum < 52) {
        data.Type = 1;
      } else if (randomNum < 68) {
        data.Type = 2;
      } else if (randomNum < 84) {
        data.Type = 3;
      } else {
        data.Type = 4;
      }
    }
    return data;
  }

  function setMetadataURI(string memory _uri) public onlyOwner {
    // metadataURI를 변경하는 메서드
    // 컨트렉트 등록자(소유자)만 수정할수있다.(owner == msg.sender)
    // onlyOwner : owner(컨트랙트 배포자)만 실행시킬 수 있도록 하는 접근제한자
    // Ownable에 포함된 onlyOwner라는 접근 제한자를 사용한다
    // onlyOwner를 실행하고 문제가 없으면 메서드를 실행하고 문제가있으면 메서드를 실행하지 않는다.
    metadataURI = _uri;
  }

  // TokenDatas의 Rank 조회
  function getTokenRank(uint _tokenId) public view returns (uint) {
    return TokenDatas[_tokenId].Rank;
  }

  // TokenDatas의 Type 조회
  function getTokenType(uint _tokenId) public view returns (uint) {
    return TokenDatas[_tokenId].Type;
  }

  function getTokenCount() public view returns (uint[4][4] memory) {
    // 배열, 구조체 , string은 memory박는다고 생각하면된다-> memory용량을 모른다고 할때는 적는다생각, uint256같은건 용량이 정해져있다
    // 임시로 쓰고버릴변수면 memory(쓰는용량줄여서 가스비아낄려고)
    // Rank와 Type을 구분하여 NFT의 수량을 확인한다.
    return tokenCount;

    //memory VS calldata
    // memory는 수정 가능 calldata는 수정 불가능
    // 저장공간은 둘다 임시저장소
  }
}
