# Minting

NFT
<br>
NFT -> 민팅, 판매/구매 스마트 컨트랙트
<br>
Next로 화면을 구현
<br>
<br>

## NFT

ERC-20 : 하나의 토큰 규격
<br>
NFT는 ERC-721 로 만들어진다.
<br>

-   ERC-721 : Non-fungible Token
-   ERC-20 : fungible Token

<br>
IngToken 1000개 있다. 각각 하나의 값어치가 동일하다.
<br>
수량으로 값어치를 표현
<br>
NFT -> 1000개 , 하나하나의 의미가 다르다.
<br>
영화 티켓에 비유하면 좋을 듯,, 티켓마다 좌석번호가 다르듯이 토큰마다 고유한 값 보유,,
<br>
<br>
Code : 토큰을 하나 생성할 때마다 고유한 키값을 부여 하면 된다. 
<br>
토큰을 하나하나 만들 때마다 기본키 값을 부여하면서 만든다.
<br>
<br>

```js
// erc-20
mint(msg.sender, 1000); // 수량
// 계정 : 0x1234
mapping(address => uint) public balances;
// 0x1234 => 2000 // 2000개 토큰 보유

// erc-721
// primary key
mint(msg.sender, 1); // 키값
mint(msg.sender, 2);
mint(msg.sender, 3);
mint(msg.sender, 4);
// NFT의 경우 하나 만들 때마다 고유 키값을 부여하면서 만든다.

mapping(address => uint) public balances;
// 0x1234 => 2000 // 2000개의 토큰 있다.
// 단, 1~2000 고유한 키값을 가진 토큰을 의미.

mapping(uint => address) public owned;
// 여기서 uint는 토큰의 번호
// 1 => 0x1234 : 1번 토큰의 주인은 0x1234
// 2000 => 0x1234 : 2000번 토큰의 주인은 0x1234

// erc-721
// 영화관 무인 발급기
// NFT는 하나의 티켓이라고 생각하자.
// 돈을 지불하고 티켓을 받은 것.
// 티켓마다 고유한 일련번호가 있어 한 장 한 장 그 의미가 다르다.

```

<br>
NFT를 코드적으로 바라보면?
<br>
타이어 <- Image
<br>
원숭이 <- Image

-   key 1 : image ?
-   key 2 : image ?
-   key 3 : imgae ?

Smart Contract에 Image를 넣을 수 있을까?
<br>
이미지도 하나의 text
<br>
이미지 하나에 gas가 얼마나 들까,,를 생각하면 Smart Contract에 이미지를 넣는 건 미친짓,,
<br>
1 번 key값을 가지고 있는 토큰에 하나의 URL이 저장된다.

-   1 -> "http://localhost:3000/metadata/1.json"
-   2 -> "http://localhost:3000/metadata/2.json"
-   3 -> "http://localhost:3000/metadata/3.json"

```js
{
    name: '이건 원숭이 이미지',
    description: '이거 비싼거임',
    image: 'http://localhost:3000/image/1.jpg',
    attributes: [...]
}
// url로 요청한 내용에는 위와 같은 json 파일이 들어있다.
// URL이 JSON 파일을 바라보고 JSON 파일 안에는 image 경로가 들어있다.

// 2 -> json.
// "http://localhost:3000/metadata/2.json"

const response = axios.post("http://localhost:3000/metadata/2.json")

const image = response.data.image

<img src='{image}'>

```

<br>
OpenSea NFT 마켓에 NFT 올려보기
<br>
NFT의 데이터 구조, 코드적인 내용을 알아보자.
<br>
<br>

## OpenSea NFT 마켓

NFT 올리는 방법 2가지

-   OpenSea NFT 마켓 사용해서 올리기
-   직접 Smart Contract 짜서 올리기

<br>

```sh
$ mkdir truffle
$ cd truffle
$ truffle init
```

**remix 사용하기**

```sh
$ npm install -g @remix-project/remixd
$ cd contracts
$ remixd -s . --remix-ide https://remix.ethereum.org
```

<br>
<br>

## NFT Minting 컨트랙트

ERC20 -> 라이브러리
<br>
라이브러리 사용해서 먼저 만들어 보고 직접 구현
<br>

```sh
cd truffle
npm init -y
npm install openzeppelin-solidity
```

```ts
class Minting extends ERC721 {
    constructor(_name: string, _symbol: string) {
        super(_name, _symbol);
        // 상속 받은 ERC721의 속성 가져오기
    }
}
```

<br>

## OpenSea 테스트넷 도메인

https://testnets.opensea.io/

<br>
tokenURI(_tokenId) 를 call 때린다.
<br>
OpenSea에서 JSON 파일의 내용을 가져와서 화면에 표현해준 것일 뿐,,
<br>
<br>

## cf) DID

Decentralized Identifier
<br>
공인인증서를 탈중앙화에 넣는다.
<br>
신분증, 사원증, 졸업증명서 등등
<br>
<br>
