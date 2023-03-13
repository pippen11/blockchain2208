```
cd 230313
mkdir remix
cd remix
npm init -y
npm i truffle @openzeppelin/contracts @remix-project/remixd
npm i -D prettier-plugin-solidity
npx truffle init
```

# Remix 사용

- https://remix.ethereum.org << 에서사용
- VSCode에서 작성한 로컬 파일을 Remix에서 연동

```bash
npx remixd -s . --remix-ide https://remix.ethereum.org
# npx remixd -s . -u https://remix.ethereum.org
```

- -s : 로컬 폴더 위치 옵션
- -u : 연결한 주소

- 리믹스사이트에서 workspace에서 localhost로연결
- vscode에서바꾸면 사이트왼쪽위 누르면 바꿀꺼냐고 물어봄 -배포전 위에 메타마스크설정으로 연결(goeril)
- 디플로이 옆에 화살표(이름,심볼넣어주기)
- 1. minting 21넣고 2. balanceof에 지갑주소
- 3. ownerOf에 21넣으면 지갑주소나옴

## OpenSea에서 확인하기

- https://testnets.opensea.io/

-pinata홈페이지 가입하고 addfile로올리기

## pinata 사용하기

- pinata는 ipfs 서비스 웹페이지이다.
- ipfs : InterPlanetary File Stystem
  - 블록체인 이더리움 네트워크에서 사용하는 P2P 파일 저장 방식
  - ipfs를 사용할 경우 ubuntu, Linux등 OS에서 프로그램 설치
  - 간단하게 테스트 하기 위해 pinata 사용

## NFT 객체 만들기

```json
{
  "name": "Moonbirds",
  //NFT 이름
  "description": "Moonbirds with Pinata",
  // NFT 설명
  "image": "http://gateway.pinata.cloud/ipfs/QmacLa5jg39ZnYsCbphPGLSyCeHpRVVe7oWzkq4qMu42PV",
  // NFT 이미지 주소
  // "http://gateway.pinata.cloud/ipfs/"+ pinata 웹페이지에서의 파일의 CID(Content Identifier (CID))
  // CID == URI
  "attributes": [
    // Levels에서 출력되는 내용
    {
      "trait_type": "Rank",
      // 카테고리 이름
      "value": 1
      // 값
    },
    {
      "trait_type": "Type",
      "value": 1
    }
  ]
}
```

- ipfs뒤에 주소는 nft.json파일 pinata에서 nft.json파일을 올려서 나온 cid값을 넣어줌 그러고나서 remix에서 새로 컴파일 , 배포
- npm i --location=global ipfs
- https://ipfs.tech/#install

```js
function tokenURI(
    uint _toeknId
  ) public pure override returns (string memory) {
    return
      "https://gateway.pinata.cloud/ipfs/QmSRXvzNf1G3z2FCieY6B3xgQEuYUe6Yz4Pt8SZ6SYyYtZ";
  }
```
