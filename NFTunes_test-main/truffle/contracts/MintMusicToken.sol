// SPDX-License-Identifier: MIT

pragma solidity ^0.8.15;
import "./node_modules/openzeppelin-solidity/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "./node_modules/openzeppelin-solidity/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "./SaleMusicToken.sol";

contract MintMusicToken is  ERC721Enumerable, ERC721URIStorage  {
        constructor() ERC721("Music NFT", "MNFT") {}

        SaleMusicToken public saleMusicToken;

        function tokenURI(uint256 tokenId)
                public
                view
                override(ERC721, ERC721URIStorage)
                returns (string memory)
        {
                return super.tokenURI(tokenId);
        }

        function _beforeTokenTransfer(address from, address to, uint256 tokenId)
                internal
                override(ERC721, ERC721Enumerable)
        {
                super._beforeTokenTransfer(from, to, tokenId);
        }

        function _burn(uint256 tokenId) 
                internal 
                override(ERC721, ERC721URIStorage) 
        {
                super._burn(tokenId);
        }
        function supportsInterface(bytes4 interfaceId)
                public
                view
                override(ERC721, ERC721Enumerable)
                returns (bool)
        {
                return super.supportsInterface(interfaceId);
        }


        mapping (uint256 => string) public musicTokens;
        mapping (uint256 => bool) public isOnSaleToken;
        mapping (uint256 => address) public musicTokenMinters;

        event Minter(uint256 indexed tokenID, string tokenURI, address indexed Minter, uint256 timeStamp);

        struct MusicTokenData {
                uint256 musicTokenId;
                string musicTokenURI;
                uint256 musicTokenPrice;
        }

        function mintMusicToken(string memory _metadata) public {
                uint256 musicTokenId = totalSupply() + 1;
                string memory musicToken = _metadata;
                musicTokens[musicTokenId] = musicToken;
                musicTokenMinters[musicTokenId]=msg.sender;
                _mint(msg.sender, musicTokenId);
                emit Minter(musicTokenId, musicToken, msg.sender, block.timestamp);
                isOnSaleToken[musicTokenId] = false;
                _setTokenURI(musicTokenId, _metadata);
        }

        
        function getLatestMusicToken() view public returns( string[] memory ){

                uint256 _totalMusicToken = totalSupply();
                require(_totalMusicToken > 0, "There are no tokens in the contract.");
                string[] memory musicTokenDatas = new string[](_totalMusicToken);
                uint256 j = 0;

                for(uint256 i=_totalMusicToken; i<0; i--) {
                        musicTokenDatas[j] = tokenURI(i);
                        j++;
                }

                return musicTokenDatas;
        }

        function getMusicTokenMinter(uint256 _musicTokenId)
                view
                public
                returns(address)
        {
                return musicTokenMinters[_musicTokenId];
        }

        function setSaleMusicToken(address _saleMusicToken) 
                public
        {
                saleMusicToken = SaleMusicToken(_saleMusicToken);
        }

        function getIsOnSale(uint256 _tokenId)
                view
                public
                returns(bool)
        {
                return isOnSaleToken[_tokenId];
        }

        function setTokenState(uint256 _tokenId, bool _state)
                external
        {
                isOnSaleToken[_tokenId] = _state;
        }

}