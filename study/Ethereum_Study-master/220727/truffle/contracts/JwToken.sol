// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "./node_modules/openzeppelin-solidity/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

import "./node_modules/openzeppelin-solidity/contracts/access/Ownable.sol";
// 상속 받는 것만으로 컨트랙트 배포를 진행할 때 알아서 owner 상태변수에 컨트랙트 배포자의 EOA 계정값을 넣어준다.

import "./node_modules/openzeppelin-solidity/contracts/utils/Strings.sol";
// uint => bytes => string 의 형변환 함수 제공

contract JwToken is ERC721Enumerable, Ownable{

    // NFT 발행량을 제한하고 싶은 경우
    // Solidity에서 상수 선언은 constant
    uint constant public MAX_TOKEN_COUNT = 1000;

    uint public mint_price = 1 ether;
    // 연산으로 양을 표현하게 될 경우 가스비 소모,
    // Solidity에서는 1 ether 라고 표현하면 알아서 10**18으로 표현해준다.

    string public metadataURI;
    
    constructor(string memory _name, string memory _symbol, string memory _metadataURI) ERC721(_name, _symbol) {
        metadataURI = _metadataURI;
    }

    // tokenId 값에 따라 랜덤한 rank, type을 부여하기 위한 구조체
    struct TokenData {
        uint Rank;
        uint Type;
    }

    mapping(uint => TokenData) public TokenDatas;

    // mint 함수를 실행시킬 수 있는 함수
    // override 가 아닌 새로운 함수로 정의
    // mintToken() 을 실행할 때 이더를 지급하게끔 한다. CA에게 이더를 지급해서 NFT를 사는 개념.
    // swap 과 다르게 CA 가 이더를 소유하고 있을 필요가 없다
    // CA 계정은 컨트랙트 배포자 계정으로 이더를 전송해준다.
    function mintToken() public payable {

        require(msg.value >= mint_price);
        require(MAX_TOKEN_COUNT > ERC721Enumerable.totalSupply());

        // 총발행량 + 1 로 tokenId 값 형성
        // 인자값을 받지 않고 NFT를 생성하게끔 하고 싶어서,,
        uint tokenId = ERC721Enumerable.totalSupply() + 1;

        // _tokenId 에 따라 metadata의 rank 와 type을 랜덤하게 생성하여 TokenDatas 상태변수에 저장
        // 상태변수에 넣지 않고 메모리 상에 잠시 저장해 놨다 버린다.
        // 함수 실행 종료시 메모리 데이터 날라감.
        TokenData memory random = getRandomNum(msg.sender, tokenId);
        TokenDatas[tokenId] = random;

        // payable address로 형 변환 후 이더 전송
        // CA -> 컨트랙트 배포자 계정으로 이더 전송
        payable(Ownable.owner()).transfer(msg.value);

        // mintToken() 을 호출한 계정에게 NFT 발급
        _mint(msg.sender, tokenId);
    }

    // tokenURI 함수 -> override 해서 사용
    // ERC721 안에 tokenURI가 virtual 로 선언되어 있다.
    function tokenURI(uint _tokenId) public override view returns (string memory) {
        // _tokenId -> rank, type  // rank 1, type 4 -> (1, 4)
        // url을 return
        // baseurl http://localhost:3000/metadata
        // return http://localhost:3000/metadata/1/4.json
        
        // uint Rank = TokenDatas[_tokenId].Rank;
        // uint Type = TokenDatas[_tokenId].Type;
        // uint -> string 형태로 바로 형변환 불가능
        // uint -> bytes -> string 으로 형변환
        // utils 디렉토리 안에 존재하는 Strings.sol 파일 활용

        string memory Rank = Strings.toString(TokenDatas[_tokenId].Rank);
        string memory Type = Strings.toString(TokenDatas[_tokenId].Type);
        // abi.encodePacked("http://localhost:3000/metadata", "/", Rank, "/", Type, ".json")
        return string(abi.encodePacked(metadataURI, "/", Rank, "/", Type, ".json"));
    }

    // TokenData를 랜덤하게 만드는 함수
    function getRandomNum(address _owner, uint _tokenId) private pure returns (TokenData memory) {
        // Solidity에는 random 함수 부재
        // 특정한 값을 해싱한 다음 나머지를 구해 랜덤한 값을 뽑아오는 방식으로 구현

        // abi.encodePacked(_owner, _tokenId); // 타입과 상관없이 합쳐주는 메소드
        uint randomNum = uint(keccak256(abi.encodePacked(_owner, _tokenId)))%100; // Solidity에서 주로 사용되는 랜덤값 구하는 방법
        // keccak256 -> 32 byte
        // 주의 : keccak256() 에 같은 string 값을 전달하면 안된다.

        // block에 들어가는 데이터는 storage가 생략되어 있는 것 , ex) 상태변수
        // block에 저장되지 않으며 메모리 상에 잠시 저장되는 것이 memory
        // 상태변수를 사용한 게 아니라 메모리 상에 잠시 데이터를 저장한 것. (데이터 타입만 명시한 것)
        TokenData memory data;
        // 메모리 상에 data라는 객체를 만든 것
        /*
            {
                Rank: uint,
                Type: uint
            }
        */

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
}

// IPFS 사용 -> 파일을 블록체인 상에 저장하는 개념
// P2P 방식으로 대용량 파일과 데이터를 공유하기 위해 사용
// 데이터를 조각내서 각각의 노드에게 뿌린다. (샤딩)
// 데이터 요청이 들어오면 각각의 노드가 가지고 있는 데이터 조각을 모아서 전달
// 요청과 응답에는 http 사용

// IPFS 를 쉽게 할 수 있는 웹사이트 존재 -> pinata
// https://www.pinata.cloud/
// CID : pinata에서 제공해주는 디렉토리
// pinata에서 API key 제공 -> 백엔드 처리도 가능
// 웹사이트에 파일을 올리기만 하면 해당 웹사이트가 연결된 노드들에게 파일을 조각내서 전달
// 각각의 노드들은 조각난 파일을 가지고 있는 것.

