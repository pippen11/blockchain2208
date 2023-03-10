// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./IERC721.sol";
import "./IERC721Metadata.sol";

contract ERC721 is IERC721, IERC721Metadata {
  string public override name;
  string public override symbol;
  // 인터페이스에서 이름이같게 적어줬으니 override로 해야함 덮어써야한다

  mapping(address => uint) private _balances;
  // 소유자의 토큰 총 개수

  mapping(uint => address) private _owners;
  // 토큰에 대한 소유자

  mapping(uint => address) private _tokenApprovals;
  // 토큰을 위임 받은 대리인 | {tokenId : operator}

  mapping(address => mapping(address => bool)) private _operatorApporvals;

  //   모든 토큰에 대한 대리인이 권한 받았는지 확인 |

  //   {owner : {operator: approved}}

  constructor(string memory _name, string memory _symbol) {
    name = _name;
    symbol = _symbol;
  }

  function balanceOf(address _owner) public view override returns (uint) {
    require(_owner != address(0), "ERC721: address zero is not a valid owner");
    // require(확인할조건,false시 로그)
    return _balances[_owner];
  }

  // 소유자의 토큰 총 개수

  function ownerOf(uint _tokenId) public view override returns (address) {
    address owner = _owners[_tokenId];
    require(owner != address(0), "ERC721:invalid tokenId");
    return owner;
  }

  // 토큰의 소유자

  // 토큰 보내는것(보내는 계정이 토큰에대해서 권한이 있는지 확인,토큰인덱스 정리,그러고나서 전송)
  function transferFrom(
    address _from,
    address _to,
    uint _tokenId
  ) external override {
    require(_isApproveOrOwner(_from, _tokenId));
    require(_from != _to);

    _beforeTokenTransfer(_from, _to, _tokenId);
    //토큰 인덱스정리

    _balances[_from] -= 1;
    _balances[_to] += 1;
    _owners[_tokenId] = _to;
    // 그토큰이 to가 갖고있는거다

    emit Transfer(_from, _to, _tokenId);
  }

  // _to에게 _tokenId에 대한 권한을 위임한다
  function approve(address _to, uint _tokenId) external override {
    address owner = _owners[_tokenId];
    //address owner = ownerOf(_tokenId);랑 같은기능인데 호출안하는이유가 gas소모가되기때문<< 수수료들기때문
    require(_to != owner, "ERC721: approval to current owner");
    // 소유자가 소유자에게 보냈는지 확인
    require(
      msg.sender == owner || isApprovedForAll(owner, msg.sender),
      "ERC721: approve caller is not token owner or approved for all"
    );
    // 트랜잭션을 보낸 계정이 소유자이거나 위임받은 대리인인지 확인

    _tokenApprovals[_tokenId] = _to;
    // 대리인 설정

    emit Approval(owner, _to, _tokenId);
    //권한 위임을 로그로 남긴다
  }

  // 트랜잭션 보낸 계정의 모든 토큰에 대한 권한을 _operator에게 _approved로 설정한다
  // _apporved==true <<모든 권한 위임 | _approved ==false <<권한위임취소
  function setApprovalForAll(
    address _operator,
    bool _approved
  ) external override {
    require(msg.sender != _operator, "ERC721: approve to valler");
    //같다는얘기는 자기가 자신에게 권한을준다는얘기
    _operatorApporvals[msg.sender][_operator] = _approved;
    emit ApprovalForAll(msg.sender, _operator, _approved);
  }

  function getApproved(uint _tokenId) public view override returns (address) {
    require(_owners[_tokenId] != address(0), "ERC721: invalid tokenId");
    return _tokenApprovals[_tokenId];
  }

  // 토큰에 대한 대리인 확인

  function isApprovedForAll(
    address _owner,
    address _operator
  ) public view override returns (bool) {
    return _operatorApporvals[_owner][_operator];
  }

  // 소유주의 토큰에 대해서 대리인이 모든 권한을 갖고있는지 확인

  function _isApproveOrOwner(
    address _spender,
    uint _tokenId
  ) private view returns (bool) {
    address owner = _owners[_tokenId];
    //owner은 지갑계정/토큰 자체가 있는지 확인
    return (_spender == owner ||
      // 내가직접주느냐 _spender가 _from이다

      isApprovedForAll(owner, _spender) ||
      // 모든권한확인하냐(내id를 줬다고보면된다)
      // _from이 해당 토큰에대해 권한을 갖고있는 대리인인가?

      getApproved(_tokenId) == _spender);
    //토큰에대한 대리인확인
  }

  // 보내는 계정이 토큰에대해서 권한이 있는지 확인
  // 1. 어떤코큰에대해 1.내소유주면 내맘대로2. 그토큰에대해 권한을 받았는가(마음대로사용할수잇는지) 3. 그 토큰소유주의 토큰에대한 모든권한을받았는가

  function tokenURI(
    uint tokenId
  ) external view virtual override returns (string memory) {}

  //tokenURI 메서드는 상속받아서 override 했지만 다시 상속해서 재정의 할것이다 그래서 =>virtual옵션추가

  function _mint(address _to, uint _tokenId) public {
    require(_to != address(0));
    // 받는계정이 있는지 확인

    address owner = _owners[_tokenId];
    require(owner == address(0));
    // 이미 있는 토큰인지 확인

    _beforeTokenTransfer(address(0), _to, _tokenId);

    _balances[_to] += 1;
    _owners[_tokenId] = _to;

    emit Transfer(address(0), _to, _tokenId);
    // 토큰발행(보내는사람이 null)
  }

  // 토큰 추가

  function _beforeTokenTransfer(
    address _from,
    address _to,
    uint _tokenId
  ) internal virtual {}
  //상속후 구현
}
