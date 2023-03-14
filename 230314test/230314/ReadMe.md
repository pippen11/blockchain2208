```bash
mkdir 230314
cd 230314
npm init -y
npm i truffle @openzeppelin/contracts
npm i -D prettier-plugin-solidity
npx truffle init
```

- ipfs에저장한걸 s3에 저장해서 s3기준으로 띄운다 aws
- 탈중앙화된 ipfs

# OpenSea 등 NFT 마켓에서 사용하는 컨트렉트

- NFT 토큰 컨트랙트 구현=>nftToken

`

## NFT 거래 컨트랙트 구현 => SaleToken

```solidity

```

# 시나리오

- 민팅=> NftToken 컨트렉트의 mintToken을 호출한다(이더도 보내야한다)
  -require로 확인 후에 NftToken의 getRandomTokenData 메서드로 토큰 정보를 만든다.
  -> \_mint메서드로 NFT 추가

- 판매 등록 => SaleToken의 컨트렉트의 SalesToken 메서드를 호출한다.
  -> require로 확인후에 가격 정의 및 목록에 판매 목록에 추가한다.

- 구매 => SaleToken 컨트렉트의 PurchaseToken 메서드를 호출한다.
  -> require로 확인 후에 이더 및 NFT 전송, 판매 목록에서 삭제한다.

- 웹페이지에서 목록 출력 => SaleToken 컨트렉트의 getSaleTokenList 메서드를 호출한다
  -> 판매등록된 NFT 목록을 만들어서 반환한다
- NFT 목록을 만드는 도중 NftToken 컨트렉트의 getTokenRank, getTokenType메서드를 사용해서 정보를 받아온다.
- NFTToken에서 모든 정보를 한번에 받는것이 아닌 따로따로 받은후에
  TokeInfo 구조체를 사용해서 합쳐서 배열에 담아 반환하게 된다.
- 출력해서 보여줘야지 사용자들이 판매 또는 구매 등등 가능

- 웹페이지에서 나의 NFT 목록 출력 => 메타마스크이 지갑 계정 주소를 기준으로 SaleToken 컨트렉트의 getOwnerTokens 메서드를 호출한다.
- 이후 내용은 판매 NFT 목록 출력과 같다.

- 구현 시나리오에 따라 다르지만 만약에( 민팅후에 NFT 정보 페이지로 이동 또는 등록한 NFT 정보를 모달창으로 출력하여 확인할 경우) getLatestToken 메서드를 사용(호출)하게 된다.
