# Solidity

## Crypto 좀비 연습하기

```sh

$ truffle init

# 터미널 생성하기
$ npx ganache-cli

```

-   개인키 : 0xa01fe093fea9ea967a1b8fcc83dfab94a60bf67d4481a86f19a079c2fd8c4662
-   계정 : 0xFbcc458064D8312FD0165bCafDfaB278D4f4cCDA

-   개인키2 : 0x5362032d9fc0faa85671ccb309cbbadfd5e75ac54a3afd78d468a8223122c46b
-   계정2 : 0xB8CdC6e9820cB8Faef079662CFF955f38581ED2A

-   CA : 0x75Bd928dF58Fcd1c16C9D003cB5dEd25A791f279

<br>

**truffle-config.json**

development: { } 주석 풀기

<br>
<br>

## work flow

1. contracts 폴더 안에서 ZombieFactory.sol
    - string memory
2. migrations 폴더 안에서 배포용 파일 2_deploy_ZombieFactory.js 파일 생성
3. test 폴더 안에서 ZombieFactory.test.js 테스트 파일 생성

<br>
<br>

## Solidity 데이터 타입

Solidity에 string이라는 데이터 타입은 존재하지 않는다. string에서만큼은 memory를 넣어준다.
<br>
<br>

## byte

Solidity에는 string이라는 타입이 없다.
<br>
string name = 'ingoo';
<br>
byte4 name = 'ingoo';
<br>
string은 byte를 참조하는 참조형 타입
<br>

-   bool
-   address
-   int
-   byte
-   byte -> string

<br>
<br>

# Dapp 만들기 (투표 앱)

<br>

1. 후보자 초기화 / string[]
    - 후보군 등록 (A, B, C, D)
2. 후보자에 대한 투표 기능 / mapping() 사용
3. 후보자에 대한 득표수 확인 / getter 함수

<br>

이더리움 네트워크에서는 배열 전체를 한번에 가져오는게 불가능하다.
<br>
배열 안의 요소 하나하나에 대해 요청을 보내 값을 가져와야 한다.
<br>
for 문을 이용해 배열의 길이만큼 반복문을 돌려서 요청을 보낸다. (3교시 22~23분)
<br>
따라서 리스트 형태의 데이터는 DB에 저장해 놓은 상태에서 프론트에 내용을 뿌려주고
<br>
각각의 요소에 해당하는 값만 이더리움 네트워크에 요청해서 가져오는 방식을 채택.
<br>
