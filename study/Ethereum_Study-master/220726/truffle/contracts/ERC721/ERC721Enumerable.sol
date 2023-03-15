// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "./ERC721.sol";

// ERC721Enumerable 컨트랙트 기능
// 1. mint 했을 때 토큰아이디 자동생성을 위한 totalSupply()
// 2. 소유하고 있는 토큰아이디 값 찾아내는 컨트랙트 (내 NFT 목록을 볼 수 있는 기능)
    // ownedTokens 상태변수 추가
    // mapping(address => mapping(uint => uint)) 
    // 첫번째 uint: address가 가지고 있는 토큰의 인덱스
    // 두번째 uint: 토큰 아이디 값

contract ERC721Enumerable is ERC721 {

    uint[] private _allTokens;

    mapping(address => mapping(uint => uint)) private _ownedTokens;
    // index => tokenId

    mapping(uint => uint) private _ownedTokensIndex;
    // 첫번째 uint : 토큰 아이디
    // 두번째 uint : 해당 토큰 아이디에 해당하는 인덱스
    // tokenId => index

    // ERC721 constructor() 함수 실행 
    // constructor() 함수가 실행되면 인스턴스 생성까지 완료되는 것이기 때문에 ERC721에 있는 함수들까지 상속된다.
    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {}

    // 주의 : ERC721 에는 _mint 함수
    function mint(address _to) public {
        // mint() 함수는 토큰 아이디 자동 생성이 목적이기 때문에 인자값으로 _to 만 받는다.
        // uint[] allTokens // 토큰 전체 리스트 상태변수
        _mint(_to, _allTokens.length);
        // _allTokens.push(_allTokens.length);
    }

    function _beforeTokenTransfer(address _from, address _to, uint _tokenId) internal override {

        // _mint() 함수에서 실행됐을 경우
        if (_from == address(0)) {

            _allTokens.push(_allTokens.length);
            // 0x1234, 0인덱스 : 0번 토큰
            // 0x1234, 1번 토큰
            // 0x1234, 3번 토큰

        } else {
            // transferFrom() 함수에서 실행됐을 경우
            /*
                < 전송 로직 >
                마지막 index에 있는 토큰 아이디의 index와 
                내가 전송할 토큰의 index를 바꿔준다
                이렇게 함으로써 인덱스가 꼬이는 현상을 방지. 
            */
            uint latestTokenIndex = ERC721.balanceOf(_from) - 1;  // 가지고 있는 토큰들의 마지막 인덱스 값
            uint tokenIndex = _ownedTokensIndex[_tokenId];

            if (tokenIndex != latestTokenIndex) {
                uint latestTokenId = _ownedTokens[_from][latestTokenIndex]; // 7

                _ownedTokens[_from][tokenIndex] = latestTokenId;
                _ownedTokensIndex[latestTokenId] = tokenIndex;
            }

            delete _ownedTokens[_from][latestTokenIndex];
            delete _ownedTokensIndex[_tokenId];
        }

        uint length = ERC721.balanceOf(_to); // ERC721의 balanceOf()를 실행한 것이기에 가스비 소모 X
        // 그냥 balanceOf() 실행시 ERC721Enumerable가 상속 받은 balanceOf()를 사용한 것이기에 가스비 발생
        _ownedTokens[_to][length] = _tokenId;
        _ownedTokensIndex[_tokenId] = length;
        
    } 

    function totalSupply() public view returns (uint) {
        return _allTokens.length;
    }

    function tokenByIndex(uint _index) public view returns (uint) {
        require(_index < _allTokens.length);
        return _allTokens[_index]; // 전체 토큰 리스트 index에 해당하는 토큰 아이디 반환
    }

    // 상태변수 조회용 view 함수
    function tokenOfOwnerByIndex(address _owner, uint _index) public view returns (uint) {
        require(_index < balanceOf(_owner));  // 인덱스는 0부터 시작하기 때문에 인덱스 범위 조건 검사
        return _ownedTokens[_owner][_index];
    }
}

/*
    0x1234: 0번, 1번
    0x1111: 2번, 3번
    0x1234: 4번

    [토큰 아이디]
    0x1234 = [0, 1, 4]
    0x1111 = [2, 3]

    _ownedTokens
    {
        0x1234: {
            // index: id
            0: 0,
            1: 1,
            2: 4,
            3: 6, change
            4: 7, last
        },
        0x1111: {
            0: 2,
            1: 3
        }
    }

    < 전송 로직 >
    마지막 index에 있는 토큰 아이디의 index와 
    내가 전송할 토큰의 index를 바꿔준다
    이렇게 함으로써 인덱스가 꼬이는 현상을 방지. 

    _ownedTokensIndex
    {
        // id: index
        "0": 0,
        "1": 1,
        "4": 2,
        "2": 0,
        "3": 1
    }

    tokenOfOwnerByIndex(0x1234, 2) return tokenId 4

*/