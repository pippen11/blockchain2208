# Geth

- 계정 생성을 위해서 go-ethereum 폴더에서 아래 명령어 실행

```sh
make all
```

- clef쓰려고 make all함

- geth 명령어만으로 실행 시 기본적으로 mainnet에 접근하도록 되어있다.

```sh
Chain ID: 1(mainnet)
```

# private Ethereum Network

- 개인 이더리움 서버 열어보자
- genesis.json 파일을 만들어서 기본 설정을 입력한다

- 이건 보여줄려고 만든것

- 이거랑 clef로 만든거랑 다른가?

```json
{
  "difficulty": "200000",
  "gasLimit": "3200000",
  "alloc": {
    "0xb18fBAd70a07D4CAB5510e2f87Fae20eE22cF2b4": {
      "balance": "100000000"
    }
  },
  "config": {
    "chainId": 60,
    "homesteadBlock": 0,
    "eip150Block": 0,
    "eip155Block": 0,
    "eip158Block": 0
  }
}
```

- 위에 json파일을 vi ~/genesis.json 적고 i하고 우클릭해서 넣어주고 esc누르고 :wq!하면됨

- w가 저장 q가 나가는건데 !붙이면 맞든아니든 저장하고 나간다
- eip150Block은 표준정해져있는거중에 150번째를 쓰겟다

- difficulty : 문제 난이도
- gasLimit :블록당 가스 지출 제한량(수수료) 최대 거래 수수료
- alloc : 제네시스 블록 생성 시 지갑에 보상 지급(빈 객체도 상관 없다)
- config
- chainId : 블록체인 네트워크 식별 ID
- homesteadBlock : 이더리움 버전
- eip는 Ethereum Improvement Proposal을 의미하며 기본값은 0이다.

  - 이더리움 핵심 프로토콜 사양 등의 표준을 설명한다.

# geth로 개인 이더리움 네트워크 생성

```sh
# 개인 이더리움 네트워크 생성
geth --datadir myGeth init genesis.json
```

- genesis.json없으면 다시 생성해줘야한다
- 위 명령어 입력시 myGeth 폴더가 생성되고 그 안에 아래와 같이 폴더와 파일이 생성된다.
- tab하면 쓰다가 자동완성

```sh
── geth
│   ├── LOCK
│   ├── chaindata : 블록 헤더 내용, 블록 바디의 트랜잭션 내용 파일이 저장
│   ├── lightchaindata
│   └── nodekey
└── keystore : geth가 갖고있는 계정 정보가 저장
```

- 생성된 개인 이더리움 네트워크를 실행하자

```sh
geth --datadir ~/myGeth
```

- ~은 home이다 home에만드는게 편해서 홈에다 만든다

- geth는 그냥 메인넷 위에코드쓰면 내가 만든 폴더로

- 하면 chain ID : 50 (unknown) 우리서버를 몰라서 unknown

# 열려있는 서버에 접근해서 데이터를 뜯어보자

## IPC

- source ~/.bashrc 이걸로 색깔 바꿔야함

- Inter-Process Communication
- 프로세스 간에 통신을 말한다.
  - 프로세스는 컴퓨터에서 실행되고 있는 프로그램을 말한다.
- geth로 열어둔 서버에 접근 명령어

- geth열어둔 서버 우분투 말고 새로운 우분투열어서 geth열어둔 서버에 접근

```sh
geth attach ~/myGeth/geth.ipc
```

- 이건 IPC로 접근 attach localhost이방식은 http접근

- exit은 나가는것

- eth.getBalance("0xb18fBAd70a07D4CAB5510e2f87Fae20eE22cF2b4") 하면 내 지갑 잔액 알수있다

- IPC 연결 후에 사용하는 명령어들은 Jacascript 기준의 객체와 같다.

```sh
# eth.getBalance(지갑주소)=> 지갑의 돈을 받아 출력한다.
eth.getBalance("0xb18fBAd70a07D4CAB5510e2f87Fae20eE22cF2b4") # 100000000

# 50000000000000000000 20개나옴 이더로치면 50이더 19자리
eth.getBlock(0) # 제네시스 블록 가져와 출력
web3.fromWei(eth.getBalance("0xb18fBAd70a07D4CAB5510e2f87Fae20eE22cF2b4"),"ether")
```

- IPC로 접근시 javascript로 구현된 모듈을 사용하게 되며 그 객체들은 아래와 같다.
  modules: admin:1.0 : Peer의 정보
  debug:1.0
  engine:1.0
  eth:1.0 : 체인 정보
  ethash:1.0
  miner:1.0 : 채굴 정보
  net:1.0
  rpc:1.0
  txpool:1.0 : 트랜잭션 풀
  web3:1.0 : 통신 관련 정보

// clef로 기존지갑을 외부로 추출한다음

```sh
eth.accounts # Geth가 갖고있는 계정 배열
miner.setEtherbase(eth.accounts[0]) # 채굴 할때 보상받을 계정으로 계정중 0번째 계정을 설정(서버껏다키면 다시설정해줘야함)
eth.coinbase # 현재 채굴 보상을 받는 계정을 확인
miner.start() # 채굴 시작 치면 null을 반환한다
miner.stop() # 채굴 중단
eth.getBlock('latest') # 마지막 블록을 가져온다. number는 몇개채굴했는지

web3.fromWei(eth.getBalance(eth.accounts[0]),'ether')
eth.sendTransaction({from:eth.accounts[0],to:eth.accounts[1],value: web3.toWei(1,"ether"),}) # 이거하기전 서버에서 geth --datadir ~/myGeth --unlock "0x260b222aa16c244b0be74cfacfebbf71de221ff3" 이렇게 보낼지갑 unlock으로 서버에서 풀어야함
# 계정 잠금 해재후 보내기 가능

```

- txpool , txpool.content로 풀확인가능
- minersetEtherbase(eth.accounts[0]) 껏다키면 이거해야함
- 보내도 잔액 변화없는이유가 채굴을 안해서 블록에 추가를 안해서그런다
- 블록채굴하고 확인하면 보낸잔액 변화있음 txpool.content에서 txpool에 쌓인게 블록에 추가되니 다시 없어진다

## miner.start() 시 아래 내용이 뜨는 이유

- Generating DAG in progress << 블록을 계산 할때 빠르게 계산하기 위해서 미리 준비한다.

- eth.getBalance(eth.accounts[0]) 잔액볼수있음
- admin,eth,miner등 치면 정보 다나옴 getbynumber은 높이
- miner.setEtherbase(eth.accounts[0]) 이거하면 true나오고 그이후 eth.coinbase 채굴 보상 받는 계정 확인

## 이더리움에서 사용하는 코인 단위

- wei : 이더리움의 최소 단위
- Kwei : 1,000 wei
- Mwei : 1,000,000 wei
- Gwei : 1,000,000,000 wei
- Ether : 1,000,000,000,000,000,000 wei
- 이더기준으로 Wei를 가져와서 이더 기준으로바꾸니까 1억이니 1e-10승임
- 0.2 Ether = 200,000,000,000,000,000 wei

- 실제 이더 단위

```
 "noether": "0",
  "wei": "1",
  "kwei": "1000",
  "Kwei": "1000",
  "babbage": "1000",
  "femtoether": "1000",
  "mwei": "1000000",
  "Mwei": "1000000",
  "lovelace": "1000000",
  "picoether": "1000000",
  "gwei": "1000000000",
  "Gwei": "1000000000",
  "shannon": "1000000000",
  "nanoether": "1000000000",
  "nano": "1000000000",
  "szabo": "1000000000000",
  "microether": "1000000000000",
  "micro": "1000000000000",
  "finney": "1000000000000000",
  "milliether": "1000000000000000",
  "milli": "1000000000000000",
  "ether": "1000000000000000000",
  "kether": "1000000000000000000000",
  "grand": "1000000000000000000000",
  "mether": "1000000000000000000000000",
  "gether": "1000000000000000000000000000",
  "tether": "1000000000000000000000000000000"
```

- le-10 그만큼 가지고있다. 1e의 18승있어야 1이더이다 1e의 18승이 1이더니까 우리가 1억넣어줬으니 0이 8개 나누면 1e-10승이된다
- 이더 잔액이 1e-10

- 홈경로면 ~/ 안해도된다 ~/: 홈경로
- ls

## 계정 잠금 풀기

```sh
geth --datadir ~/myGeth --unlock "지갑 주소"

# 서버 실행 후 비밀번호 입력하고 엔터
```

# nvm 실행 오류시

- 글자에 색상이 사라졌을때

```sh
source ~/.bashrc
```

# Mac에서 터미널 실행 시 source 다시 입력 안하고 싶으면 추가

```sh
# ~/.zshrc 파일추가
vi ~/.zshrc

#내용으로
source ......./.bash_profile
```

- 입력 후에 터미널 재실행

# 이더 보낼때

<!--  집에서 했는데 unlock안되는이유? -->

- geth --datadir ~/myGeth --unlock "0x260b222aa16c244b0be74cfacfebbf71de221ff3" 이렇게 보낼지갑 unlock으로 서버에서 풀어야함
