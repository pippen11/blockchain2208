# NFT Minting

random 함수를 이용해 NFT minting 기능을 구현해주도록 하자.
<br>
mint -> NFT를 생성해주는 함수
<br>
<br>

## 1. 이더를 주면서 NFT 발급 받기 

컨트랙트 배포자가 아닌 NFT를 받고 싶어하는 사용자(Account1)가 스마트 컨트랙트에게 적절한 Eth를 지급
<br> 
Account1 에게 NFT를 주는 행위
<br>
<br>

## 2. NFT를 지급할 때 사진 혹은 내용을 랜덤하게 해서 지급

16가지 정도로,,
<br>
NFT 발급받기 -> mint -> 랜덤하게 NFT 지급
<br>
Solidity 에서는 기본적으로 random 함수가 안된다.
<br>
확률에 따라 다른 NFT가 나올 수 있도록 코드 작성.
<br>
<br>

## 3. 사용자간 NFT 판매 및 구매

사용자에게 정상적으로 NFT 발급이 완료되었다면 사용자끼리 NFT를 구매하고 판매할 수 있도록 하는 컨트랙트 작성.
<br>
minting 컨트랙트 , 판매/구매 컨트랙트
<br>

```sh
$ truffle init
$ cd contracts
$ npm init
$ npm install openzeppelin-solidity
```

<br>

**tokenURI**
<br>
tokenURI return 값으로 실제 작동될 수 있는 metadata를 넣어줌으로써 OpenSea에서 NFT 이미지를 볼 수 있었다.
<br>
tokenId 값에 따라 이러한 데이터를 저장하고 있다는 일종의 데이터 스키마
<br>
규격화 되어 있는 것이 아니기 때문에 플랫폼마다 metadata의 속성명이 달라진다.
<br>
해당 metadata는 NFT가 가지고 있는 데이터의 정보를 json 파일로 표현만 해주면 된다.
<br>

```
mapping(uint => string) public url;

{
    "1" : "http:localhost:3000/1/1.json",
    "2" : "http:localhost:3000/1/2.json"
}
```

굉장히 비효율적인 방식
<br>
tokenId 값을 기준으로 어떠한 데이터를 바라볼지 구조체를 만들어서 표현 
<br>
16가지 metadata를 4단계로 구성
<br>
각 단계마다 4가지의 type이 존재

- 1 단계 10% 확률
    - 1 type
    - 2 type
    - 3 type
    - 4 type
- 2 단계 20% 확률
    - 1 type
    - 2 type
    - 3 type
    - 4 type
- 3 단계 30% 확률
    - 1 type
    - 2 type
    - 3 type
    - 4 type
- 4 단계 40% 확률
    - 1 type
    - 2 type
    - 3 type
    - 4 type

https://github.com/ingoo-blockchain/NFT_Mint/tree/master/public

```sh
$ remixd -s . --remix-ide https://remix.ethereum.org
```