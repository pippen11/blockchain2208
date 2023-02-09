# RPC

- Remote Procedure Call의 약자, 원격 프로시저 호출
- 별도의 코딩 없이 다른 공간에서 함수 등을 호출할수있는 통신기술
- 어제 우리가 IPC를 사용했었던 admin,eth,miner 등이 있다.

- IPC 를 이용하면 원격프로그램을 써야함 그래야 다른컴퓨터 조작가능
- HTTP는 안써도됨(다른곳에서 접근가능)

# IPC 파일이 아닌 HTTP 통신으로 조작하기

## geth를 HTTP 통신으로 사용할수 있도록 실행

- HTTP 통신을 사용하기 때문에 port가 열려있으면 외부에서 조작가능

```sh
geth --datadir ~/myGeth --http --http.addr "0.0.0.0" --http.port 8080 --http.corsdomain "*" --http.api "admin,miner,txpool,web3,personal,eth,net" --allow-insecure-unlock --syncmode full --networkid 50
```

- 다른거 쓸때 띄어쓰기 유의
<!-- geth --datadir ~/myGeths --http --http.addr "0.0.0.0" --http.port 8080 --http.corsdomain "*" --http.api "admin,miner,txpool,web3,personal,eth,net" --allow-insecure-unlock --syncmode full --networkid 60 -->

- networkid는 처음 json파일에서chainId : 50으로 설정해놓은거에 따라서 간다
- 이걸로 무조건 서버를 열어야 밑에 둘다 가능 attach방식이던 다른방식이던

- datadir : 개인 이더리움 네트워크 데이터 저장 폴더
- http : HTTP 서버를 배포, IPC로 조작하던 개인 이더리움 네트워크를 HTTP 통신으로 조작
- http.addr : 요청 가능한 IP 주소 설정, 기본값 127.0.0.1(로컬/localhost), 0.0.0.0은 모든 IP 주소 허용 -> 0.0.0.0은 다른 ip에서도 다 접근 가능하게해준거
- 기본값 127.0.0.1로하면 로컬만됨 안써주면 기본값으로 들어감
- http.port : 요청 가능한 port 설정 , 기본값 8545(위에처럼 8080처럼 설정안하면 8545로 설정된다)
- http.corsdomain : CORS에 대한 설정, 와일드카드(\*) 사용가능-> 와일드카드는 어느주소던 전부 허용한다는 뜻(웬만하면 안쓰는게좋다는말이많다)- 크로스오리진 지금위에선 어느주소던 전부 허용한다라고 해놓음
- http.api : 사용 가능한 RPC를 설정 , 기본값 eth,net,web3
- networkid : 개인 이더리움 아이디 , 체인아이디와 같게 설정
- allow-insecure-unlock : HTTP 통신으로 계정을 열 수 있게 한다.(unlock)
  (공식 홈페이지에서 전문가 이외에 권장하지 않는다.)
- syncmode : 피어 연결시 동기화 방법 설정
  - fast : 블록 헤더 , 최신 1024개의 트랜잭션 동기화 , 기본값(1.10)<<삭제됨(1.11)
  - full : 모든 데이터 동기화
  - light : 블록 헤더 , 잔액 관련만 동기화
  - snap : 최근 128개 블록만 동기화 , 기본값

## geth에 HTTP 통신으로 연결

```sh
geth attach http://localhost:8080
```

# attach로 연결한 곳에서 입력

- 컴퓨터로 들어가야함

# 계정 생성

```sh
personal.newAccount()
```

- 이거하면 비밀번호 입력과 확인가능 글자수 상관없음

## 계정 풀기(unlock)

```sh
personal.unlockAccount(eth.accounts[0])
```

# geth에 HTTP 통신으로 요청

- 컴퓨터말고 다른걸로 접근 가능 attach안해도돼서

- attach 하지 않고 HTTP 통신을 사용한다.

```sh
curl -X POST -H "content-type:application/json" --data '{"id":50,"jsonrpc": "2.0", "method": "eth_accounts", "params": []}' http://localhost:8080
```

- geth attach http://localhost:8080 이거대신에 위에껄로 attch안쓰고 쓴다

- rpc치면 모듈의 버전들이나옴

- X : 통신에 사용하는 method
- H : header
- data : 보내는 요청 body
  - id : 체인 아이디
  - jsonrpc : json 사용하는 RPC의 버전(json rpc사용버전이 2.0)
  - method : 이더리움의 호출 메서드명
  - params : 메서드의 인자값(매개변수)-< 빈배열로 냅둬도되고 안써도됨

```json
{
  "jsonrpc": "2.0",
  "id": 50,
  "result": [
    "0x260b222aa16c244b0be74cfacfebbf71de221ff3",
    "0xb6ae1468d90070a27d8b943e9b9476015392673f",
    "0x9c70d85490bf55a2697d6696bf150d02fa86ec72"
  ]
}
```

- 새로운 계정 생성

```sh
curl -X POST -H "content-type:application/json" --data '{"id": 50,"jsonrpc": "2.0", "method": "personal_newAccount", "params": ["password"]}' http://localhost:8080
```

- 비밀번호를 password로함 다른거 들어가도됨 스트링으로넣어야함

```json
{
  "jsonrpc": "2.0",
  "id": 50,
  "result": "0x07cd6f73f610523da89014642d39410ec6831f9d"
}
```

- 계정 언락

```sh
curl -X POST -H "content-type:application/json" --data '{"id": 50,"jsonrpc": "2.0", "method": "personal_unlockAccount","params":["0x260b222aa16c244b0be74cfacfebbf71de221ff3","1234567891"]}' http://localhost:8080
```

```json
{ "jsonrpc": "2.0", "id": 50, "result": true }
```

- aws에 올려서 테스트하면 ip자체가 달라짐 localhost:8080에서 다른걸로

- 채굴 보상 받을 지갑 주소 설정

```sh
curl -X POST -H "content-type:application/json" --data '{"id": 50,"jsonrpc": "2.0", "method": "miner_setEtherbase","params":["0x260b222aa16c244b0be74cfacfebbf71de221ff3"]}' http://localhost:8080
```

- 채굴보상받는지갑 확인

```sh
curl -X POST -H "content-type:application/json" --data '{"id": 50,"jsonrpc": "2.0", "method": "eth_coinbase","params":[]}' http://localhost:8080
```

```json
{ "jsonrpc": "2.0", "id": 50, "result": true }
```

- 채굴 시작

```sh
curl -X POST -H "content-type:application/json" --data '{"id": 50, "jsonrpc": "2.0", "method": "miner_start", "params": [1]}' http://127.0.0.1:8080
```

```json
{ "jsonrpc": "2.0", "id": 50, "result": null }
```

- miner.start(1) << 매개변수는 쓰레드를 하나만 사용한다.

  - thread : CPU의 작업 최소 단위, 컴퓨터 성능에 따라 다르다 -> 쓰레드 숫자가 많을수록 더빨리 처리한다. 속도가 한개만쓰면 더느림 쓰레드 다쓰는게아니라
  - params[1]이 miner.start(1)이랑 같다

- 채굴 중지

```sh
curl -X POST -H "content-type:application/json" --data '{"id": 50, "jsonrpc": "2.0", "method": "miner_stop", "params": []}' http://127.0.0.1:8080
```

- 블록 높이 제네시스 빼고 나오는듯? 채굴서버에 number 36이면 실제로 35찍힘

```sh
curl -X POST -H "content-type: application/json" --data '{"id": 50, "jsonrpc": "2.0", "method": "eth_blockNumber","params":[]}' http://localhost:8080
```

```json
{ "jsonrpc": "2.0", "id": 50, "result": null }
```

- 잔액 조회

```sh
curl -X POST -H "content-type:application/json" --data '{"id": 50, "jsonrpc": "2.0", "method": "eth_getBalance", "params":["0x260b222aa16c244b0be74cfacfebbf71de221ff3", "latest"]}' http://localhost:8080
```

```sh
curl -X POST -H "content-type:application/json" --data '{"id": 50, "jsonrpc": "2.0", "method": "eth_getBalance", "params":["0xb6ae1468d90070a27d8b943e9b9476015392673f", "latest"]}' http://localhost:8080
```

```json
{ "jsonrpc": "2.0", "id": 50, "result": "0x70eb6e97cb02ac0000" }
```

- 잔액을 16진수로 받고있다.

- txpool

```sh
curl -X POST -H "content-type: application/json" --data '{"id": 50, "jsonrpc": "2.0", "method": "txpool_content"}' http://localhost:8080
```

```json
{ "jsonrpc": "2.0", "id": 50, "result": { "pending": {}, "queued": {} } }
```

- params안쓸거면 안써도됨
- 127.0.0.1 이랑 localhost랑 같다

- 트랜잭션 보내보자

```sh
curl -X POST -H "content-type: application/json" --data '{"id": 50, "jsonrpc": "2.0", "method": "eth_sendTransaction", "params":[{"from":"0x260b222aa16c244b0be74cfacfebbf71de221ff3","to":"0x07cd6f73f610523da89014642d39410ec6831f9d", "value": "0x3B9ACA00", "gas":"0x15f90", "gasPrice":"0x430e23400"}]}' http://localhost:8080
```

```sh
curl -X POST -H "content-type: application/json" --data '{"id": 50, "jsonrpc": "2.0", "method": "eth_sendTransaction", "params":[{"from":"0x260b222aa16c244b0be74cfacfebbf71de221ff3","to":"0xb6ae1468d90070a27d8b943e9b9476015392673f", "value": "0x3B9ACA00"}]}' http://localhost:8080
```

- 아래 gas gasprice 선택사항, 안넣어도됨 알아서 기본값으로 들어간다
  - gas : 내가 이 트랜잭션에 사용한 수수료
  - gasPrice : 가스당 가격(수수료 가겨을 결졍)

-value값등 0x뒤에 hex값으로 변경해서 넣어야함 1,000,000,000

- 1이더 보내려면 1,000,000,000,000,000,000 0이 18개임 이값을 16진수로 변경해서 0x뒤에 붙여둔다

```json
{
  "jsonrpc": "2.0",
  "id": 50,
  "result": "0x46f0e80225610769912d8c708de196e5f190fbec9950b9909463c854cc3fd11e"
}
```

- result는 트랜잭션 아이디?

- 코인 보내면 일단 txpool이 이렇게뜸

```json
{
  "jsonrpc": "2.0",
  "id": 50,
  "result": {
    "pending": {
      "0x260B222Aa16C244b0BE74CFacFebBf71De221fF3": {
        "0": {
          "blockHash": null,
          "blockNumber": null,
          "from": "0x260b222aa16c244b0be74cfacfebbf71de221ff3",
          "gas": "0x5208",
          "gasPrice": "0x3b9aca00",
          "hash": "0x1c1e4cb0ce03cc608f0b5c36dde5925cc0ef5ad1c8768210789081de9abfe16c",
          "input": "0x",
          "nonce": "0x0",
          "to": "0xb6ae1468d90070a27d8b943e9b9476015392673f",
          "transactionIndex": null,
          "value": "0x3b9aca00",
          "type": "0x0",
          "chainId": "0x32",
          "v": "0x87",
          "r": "0x9b99e383cddcc16cf1bd3a93affb06ebbbc6a79340d3ee88a8cf0977a8473077",
          "s": "0x277b468d52919eba32fe9ba9e6a73f0be26de6fece68d9287e51b0b4c779b725"
        }
      }
    },
    "queued": {}
  }
}
```

- 보내면 위에처럼txpool에 추가되는데 채굴하고 다시 확인하면 다시 비어진다

```json
{ "jsonrpc": "2.0", "id": 50, "result": { "pending": {}, "queued": {} } }
```
