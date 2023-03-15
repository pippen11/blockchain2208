// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import './IERC721.sol';
import './IERC721Metadata.sol';

// interface를 상속 받았으면 interface 안에 있는 모든 함수를 구현해줘야 한다.
// Solidity에서는 다중 상속이 된다.

contract ERC721 is IERC721, IERC721Metadata {
    
    /* Function */
    // 부모의 함수를 자식이 덮어씌울 때 override 사용

    string public override name;
    string public override symbol;
    
    // address => uint
    mapping(address => uint) private _balances; // balanceOf() 함수 있어서 private
    // 소유자가 몇개의 토큰을 가지고 있는지 조회
    // 내가 가지고 있는 총 개수

    // uint => address // 토큰 가지고 있는 소유자 반환
    mapping(uint => address) private _owners;
    // tokenId 기준으로 누가 소유하고 있는지 조회

    // uint => address
    mapping(uint => address) private _tokenApprovals;
    // 토큰 아이디를 받아서 대리인이 있는지 조회 가능한 상태변수 (토큰 한 개)

    // address => (address => bool)
    // msg.sender => (operator => true/false)
    mapping(address => mapping(address => bool)) private _operatorApprovals; // 모든 토큰에 대한 권한

    // address 타입에 아무것도 없을 때 == address(0) : 0x0, address 타입의 null 값

    constructor(string memory _name, string memory _symbol) {
        name = _name;
        symbol = _symbol;
    }

    function balanceOf(address _owner) public override view returns (uint) {
        require(_owner != address(0), "ERC721 : balance query for the zero address");
        return _balances[_owner];
    }

    function ownerOf(uint _tokenId) public override view returns (address) {
        address owner = _owners[_tokenId];
        require(owner != address(0), "ERC721 : owner query for the nonexistent token");
        return _owners[_tokenId];
    }

    function approve(address _to, uint _tokenId) external override {
        // msg.sender 가 _to 에게 msg.sender가 가지고 있는 tokenId를 사용할 수 있게끔 대리인 설정
        
        address owner = _owners[_tokenId]; // _owners 상태변수에서 가져오기 -> 값이 없어도 실행됨
        // 같은 컨트랙트 안에서 view 함수 호출은 가스비가 든다.
        // 다른 컨트랙트에서 view 함수 호출은 가스비가 안 든다.
        // 따라서 ownerOf() 함수 호출이 아닌 상태변수를 사용해 조회하도록 한다.
        // 뿐만 아니라 owner가 없을 때 ownerOf() 함수를 호출하면 에러가 뜬다.

        // 1. msg.sender 와 _to가 다른가
        require(_to != owner, "ERC721 : approval to current owner");

        // 2. msg.sender가 _tokenId 소유자인가 체크
        require(msg.sender == owner || isApprovedForAll(owner, msg.sender));
        // A : 1
        // setApprovalforAll A -> B
        // isApprovalForAll B -> C  // 여기서 msg.sender는 대리인 // 복대리는 토큰 한개까지만 가능

        // ERC20 allowance라는 승인해주는 상태변수 존재
        // 여기서도 _tokenApprovals 라는 상태변수 만들어 준다.
        _tokenApprovals[_tokenId] = _to; // 대리인 지정
        emit Approval(owner, _to, _tokenId);  // approve 성공시 이벤트 발생
    }

    // approve가 설정되어 있는 토큰인지 확인하는 함수 (하나의 토큰에 대한 대리인)
    function getApproved(uint _tokenId) public override view returns (address) {
        // 1. tokenId가 실제 소유자가 있는지 확인
        require(_owners[_tokenId] != address(0), "ERC721 : ");
        return _tokenApprovals[_tokenId];  // address를 return 한다면 승인이 된 토큰
    }

    // msg.sender가 _operator에게 모든 tokenId 사용을 허락하겠다는 함수
    // return 값은 true/false
    function setApprovalForAll(address _operator, bool _approved) external override {
        require(msg.sender != _operator);
        _operatorApprovals[msg.sender][_operator] = _approved;
        emit ApprovalForAll(msg.sender, _operator, _approved);
    }

    // msg.sender 의 대리인이 operator인지 확인 (모든 토큰의 대리인)
    function isApprovedForAll(address _owner, address _operator) public override view returns (bool){
        return _operatorApprovals[_owner][_operator];
    }

    // transferFrom에서 사용되는 함수
    function _isApprovedOrOwner (address _spender, uint _tokenId) private view returns(bool) {
        address owner = _owners[_tokenId];
        require(owner != address(0));
        // _spender == owner : from이 본인일 경우
        // isApprovedForAll(owner, _spender) // from이 모든 토큰 대리인일 경우
        // getApproved(_tokenId) == _spender // from이 하나의 토큰 대리인일 경우
        return (_spender == owner || isApprovedForAll(owner, _spender) || getApproved(_tokenId) == _spender);
    }

    // from : 본인, 대리인(1개 토큰), 대리인(모든 토큰)
    // getApproved 체크
    // isApprovalForAll 체크
    function transferFrom(address _from, address _to, uint _tokenId) external override {
        // 본인이 from일 경우
        // 대리인이 from
            // approve 경우
            // approveForAll 경우
        require(_isApprovedOrOwner(_from, _tokenId));
        // _from != _to
        require(_from != _to);

        _beforeTokenTransfer(_from, _to, _tokenId);

        _balances[_from] -= 1;
        _balances[_to] += 1;
        _owners[_tokenId] = _to;

        emit Transfer(_from, _to, _tokenId);
    }

    // IERC721Metadata로부터 상속받았기 때문에 override
    // virtual : 함수를 가지고 오긴 했지만 내용을 채워넣은 것은 자식이 하겠다. // interface는 virtual이 자동으로 내장되어 있다.
    // 다른 컨트랙트에서 tokenURI 기능을 구현하고 싶다면 virtual
    function tokenURI(uint256 _tokenId) external override virtual view returns (string memory) {}

    // _mint : 토큰 만들어주는 함수
    function _mint(address _to, uint _tokenId) public {
        require(_to != address(0));
        // 중복된 토큰아이디 제외하고 만들어주기
        address owner = _owners[_tokenId];
        require(owner == address(0));

        _beforeTokenTransfer(address(0), _to, _tokenId);

        _balances[_to] += 1;
        _owners[_tokenId] = _to;

        emit Transfer(address(0), _to, _tokenId);
        // Transfer 이벤트의 from 값이 address(0) 이면 민팅이라고 해석
    }

    // _mint() 함수 안에서 실행시키지만 함수의 기능은 ERC721Enumerable 컨트랙트에서 구현
    // ERC721 컨트랙트 안에서는 실행 시점만 잡아주는 것.
    // 함수 기능 구현은 ERC721Enumerable 쪽에서
    // virtual 함수는 자식 컨트랙트 안에서 기능 구현이 가능
    // 실행 시점은 ERC721을 기준으로 함수의 기능 구현은 ERC721Enumerable을 기준으로
    // ERC721Enumerable의 상태변수를 사용하고 싶기 때문,, 
    function _beforeTokenTransfer(address _from, address _to, uint _token) internal virtual {}
}

/*
    
    front 화면에서 마켓을 구현하기 위해서는
    1. balanceOf(_owner) // 7개
        // 7개가 각각 어떤 tokenId를 가지고 있는지 알아내는 방법은?
        // 내 NFT 목록을 볼 수 있는 기능을 구현해야 한다.
        // 소유자 기준 tokenId[]
        // mapping(address => mapping(uint => uint))
        {
            "0x1234": {
                // 배열인덱스 : 토큰아이디
                0: 토큰 1번,
                1: 토큰 2번,
                2: 토큰 3번,
            },
            "0x1111": {
                0: 토큰 5번
            }
        }

    2. minting 할 때 tokenId 자동 생성 기능 구현
        // totalSupply를 만들어줘야 한다.
*/