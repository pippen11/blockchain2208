// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import '../node_modules/openzeppelin-solidity/contracts/token/ERC721/extensions/ERC721Enumerable.sol';

contract Minting is ERC721 {
    // ERC721 생성자 함수 실행 ERC721(_name, _symbol)
    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {

    }

    function _minting(uint _tokenId) public {
        _mint(msg.sender, _tokenId); // _tokenId : 토큰의 고유한 키값 , msg.sender : 토큰 받을 계정
    }

    // 부모 컨트랙트의 tokenURI에 virtual 키워드가 있을 경우 override를 사용해 덮어쓰기
    // 덮어쓰기 해서 새로운 함수로 바꿔준 것
    function tokenURI(uint _tokenId) public override pure returns (string memory) {
        return 'https://gateway.pinata.cloud/ipfs/QmPwjnvWYN4etA5eW4yAbWCTy2ukEC1Jj5417VLGyH5XpU/1/1.json';
    }
    // NFT에 대한 정보를 JSON 파일로 보관
}

// 현재 코드는 tokenId 와 tokenURI가 매핑되어 있지 않다.
// minting 함수를 호출할 때마다 어떤 json 파일을 보여줄 지 매핑시켜 랜덤으로 만들어 놓는다.
// 그게 민팅,,,