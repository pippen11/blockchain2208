# Ganache

- 테스트용 로컬 이더리움 네트워크
- 장점
  - Geth 등보다 속도가 빠르다
  - 별 다른 세팅 없이 바로 테스트 가능
  - 기본으로 10개의 계정이 생성되며 각 계정에 100코인 씩 지급된다
- 단점

  - 채굴해도 보상이 없다
  - 외부 네트워크로 연결이 안된다
  - 서버 종료시 모든 데이터 삭제

  - 다른 네트워크와 동기화 불가능 같은내용을 가질수없다
  - 우리눈에 안보이지만 돌아가고있는게 도커임(외부에서 aws인스턴스에 주소를 추가), 백그라운드에서 다른프로그램

- geth는 utxo는 날아가고 나머지는 남아있따

- ganache 계정을 가져올수있으려면 비공개키로 메타마스크에서 가져온다
  Private Keys
  ==================
  (0) 0x4253a6f42bfb190de659b30c47a914f7adceb0396761e72d1efe9aea325bf687
  (1) 0xc5e46033ca5f316b88bd15c7b3fcf744cbcade651963207b69e6ac672a624c93
  (2) 0x512f1fe8c0644d71ef1ac4dbd4a0d494995ac452998e188bb7ee009dae500977
  (3) 0x04446d955a0da57c1ad03a2ee656cd30a04e371f52592fcba41de2d6efea942c
  (4) 0x04ba79db140c4eebede3b97f8ac1baa368928cfed02a94139c72d014eba8db46
  (5) 0xa3a5a770febc487c5ffd347893e79d589b0e75b36cc8ecbe4f2becf3f2d8ea89
  (6) 0x6f282a162fcd7867c1cd3bb538743f47e0abe099bacdbbc7be73eef063ce9f18
  (7) 0x8aff7381e0cc765c09030f1bf6d8544230638de9fb9dd6d1bea69f0bec736288
  (8) 0xf1b2223d9120be2a0a7e471d418abdf7d8079991d35a2e9b6baa101618034842
  (9) 0xb6e359bddcbf89aa89ec8c189e4f51f8c62e369b4645852640f78b91d4c51d1b
  (10) 0xeb847b04eb0d09080ca6d23b54948d50cba0919df089162d1123eb9dbbe72951

## 설치

```sh
npm i -g ganache-cli
```

## 실행

```sh
npx ganache-cli
```

- npx ganache-cli --chainid 1234
- 이렇게하면 1234chain id로 실행한다
- cli = comment Line Interface
- npx = node pakage excute 실행한다

- 서버시작시에 옵션

### options

```sh
-a | --accounts # 서버시작 시 생성할 계정의 수 , 기본값 10
-e 1000 | --defaultBalanceEther 1000 #서버 시작시 생성되는 계정의 소지 Ether, 기본값 100
-b 60 | --blockTime 60 # 자동 마이닝 시간 간격 , 초 단위 , 지정하지 않는게 좋음
# 기본적으로 트랜잭션 발생 시 마이닝을 바로 진행한다(기본값)
-p | --port # 사용할 포트, 기본값 8545
-h | --host | --hostname # 기본 접속 주소 , http.addr 랑 같은 기능을 한다고 생각하면 된다 . 기본값 127.0.0.1 ex 집
url= http://localhost:8080
-g | --gasPrice # wei의 가스 가격, 기본값 20000000000 (20GWei)
-l | --gasLimit # 블록 가스 한도 , 기본값 0x6691b7
--chainId # 체인 아이디, 기본값 1337
```

- http << 프로토콜
- localhost << domain, host
- 127.0.0.1 << ip , host
- 8080 << port

- npx ganache-cli --accounts 100 이런식으로 붙여주면 새로 100개를 만듬 서버 다시열때
- --accounts대신 -a 100 로 할수도있다 서버열때만 가능
- npx 노드 패키지 익스큐트(실행)

# RPC

## geth와 같은 RPC

- eth
  - accounts
  - blockNumber
  - coinbase
  - getBalance
  - sendTransaction
- miner
  - start : 자동 마이닝 시작(채굴해도 보상없음)(블록넘버가 오르진않음) 트잭으로 보낸이후에 적용되게하려면 자동마이닝 켜놔야함
  - stop : 자동 마이닝 종료
- personal

  - unlockAccount
  - newAccount
  - sendTransaction : eth의 sendTransaction과 같다.

- IPC통신그자체 접근하는방식
- RPC는 호출하는 것들(함수)

## Ganache 만의 RPC

- evm

  - snapshot : 현재 상태를 저장한다 //{"id":1337,"jsonrpc":"2.0","result":"0x4"}
  - revert : snapshot(최근찍은것)으로 상태를 되돌린다. 되돌린 스냅샷 기준으로 이후 스냅샷은 삭제된다
  - mine : 강제 채굴 evm_mine
  - unlockUnknownAccount : unlockAccount와 같다, 단 비밀번호 없이
  - lockUnknownAccount : lockAccount와 같다 , 단 비밀번호 없이

- curl -X POST -H "content-type:application/json" --data '{"id": 1337,"jsonrpc":"2.0","method":"evm_snapshot"}' http://localhost:8545
- curl -X POST -H "content-type:application/json" --data '{"id": 1337,"jsonrpc":"2.0","method":"evm_revert", "params":["0x2"]}' http://localhost:8545
- "params":["0x2"] 2번째로 돌아간다 ["0x1"]이면 첫번째로 돌아간다
- 되돌리면 그이후에 찍은 스냅샷은 날아간다
- geth attach http://localhost:8080 한다음 geth하면 쓸수잇는거 나옴 admin personal등도 쳐보면나옴 miner txpool등
