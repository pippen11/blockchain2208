# RPC

- Remote Procedure Call의 약자, 원격 프로시저 호출
- 별도의 코딩 없이 다른 공간에서 함수 등을 호출할수있는 통신기술
- 어제 우리가 IPC를 사용했었던 admin,eth,miner 등이 있다.

- IPC 를 이용하면 원격프로그램을 써야함 그래야 다른컴퓨터 조작가능
- HTTP는 안써도됨(다른곳에서 접근가능)

# IPC 파일이 아닌 HTTP 통신으로 조작하기

## geth를 HTTP 통신으로 사용할수 있도록 실행

- HTTP 통신을 사용하기 때문에 port가 열려있으면 외부에서 조작가능

- 이건 서버여는거

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

<!--  IPC local RPC차이? -->

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

계정 언락

```sh
curl -X POST -H "content-type:application/json" --data '{"id": 50,"jsonrpc": "2.0", "method": "personal_unlockAccount","params":["0x260b222aa16c244b0be74cfacfebbf71de221ff3","1234567891"]}' http://localhost:8080
```

- 트랜잭션 보내보자

```sh
curl -X POST -H "content-type: application/json" --data '{"id": 50, "jsonrpc": "2.0", "method": "eth_sendTransaction", "params":[{"from":"0x260b222aa16c244b0be74cfacfebbf71de221ff3","to":"0x07cd6f73f610523da89014642d39410ec6831f9d", "value": "0x3B9ACA00", "gas":"0x15f90", "gasPrice":"0x430e23400"}]}' http://localhost:8080
```

```sh
curl -X POST -H "content-type: application/json" --data '{"id": 50, "jsonrpc": "2.0", "method": "eth_sendTransaction", "params":[{"from":"0x260b222aa16c244b0be74cfacfebbf71de221ff3","to":"0xb6ae1468d90070a27d8b943e9b9476015392673f", "value": "0x3B9ACA00"}]}' http://localhost:8080
```

- 블록정보 가져오는거

```sh
curl -X POST -H "content-type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["latest", false]}' http://localhost:8545
```

- params 첫번째 매개변수안에 "latest"(최근블록)대신 "pending"도가능 블록번호를 나타내는 16진수 문자열도 가능하다(ex "0x01") 이면 첫번째임
- 두번째 매개변수에서는 트랜잭션을 반환할지 여부를 따짐 false는 블록헤더정보와 트잭해시만 반환 true는 입출력 영수증 포함 전체 트잭포함

- false로 넣었을때

```json
{
  "id": 60,
  "jsonrpc": "2.0",
  "result": {
    "number": "0x1",
    "hash": "0x1c1ae0f0aaa608eac9c1bfe8e62a3a9c32ddc34608533c2556da55413f0fa829",
    "parentHash": "0x7c2d912e3344083b1252e3a8e679052fa953628ba5d1c392b10ef4fa824cd4f5",
    "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "nonce": "0x0000000000000000",
    "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
    "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "transactionsRoot": "0xd0983d949f876f273da1f2356dab5a95ab6743633b64b554405b891970e8bbbb",
    "stateRoot": "0xd28a2008faa4d6c94a1c52a0f8e1632e658e7d782feba5eb6fa38c2a9744b25f",
    "receiptsRoot": "0x056b23fbba480696b65fe5a59b8f2148a1299103c4f57df839233af2cf4ca2d2",
    "miner": "0x0000000000000000000000000000000000000000",
    "difficulty": "0x0",
    "totalDifficulty": "0x0",
    "extraData": "0x",
    "size": "0x3e8",
    "gasLimit": "0x6691b7",
    "gasUsed": "0x5208",
    "timestamp": "0x63e85321",
    "transactions": [
      "0x5c33cd4a94a872cea43e548911358740db29dbf2f2d4bdb8a5adddafc9368cc7"
    ],
    "uncles": []
  }
}
```

- true일때

```json
{
  "id": 60,
  "jsonrpc": "2.0",
  "result": {
    "number": "0x1",
    "hash": "0x1c1ae0f0aaa608eac9c1bfe8e62a3a9c32ddc34608533c2556da55413f0fa829",
    "parentHash": "0x7c2d912e3344083b1252e3a8e679052fa953628ba5d1c392b10ef4fa824cd4f5",
    //부모 블록의 해시로 이블록 바로전에 채굴된 블록의 해시?
    "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    // 이더리움에서 작업증명을 증명하는데 사용되는값의 해시
    "nonce": "0x0000000000000000",
    // 작업증명 논스값
    "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
    // 이블록에 포함된 삼촌의 해시?
    "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    // 주어진 로그항목이 이블록에 포함되있는지 효율적으로 확인하는 필터
    "transactionsRoot": "0xd0983d949f876f273da1f2356dab5a95ab6743633b64b554405b891970e8bbbb",
    // 블록에 포함된 트랜잭션의 머클트리 루트
    "stateRoot": "0xd28a2008faa4d6c94a1c52a0f8e1632e658e7d782feba5eb6fa38c2a9744b25f",
    // 이더 가성머신 현재상태나타내는 머클트리 루트
    "receiptsRoot": "0x056b23fbba480696b65fe5a59b8f2148a1299103c4f57df839233af2cf4ca2d2",
    // 블록에 포함된 트잭에의해 생성된 영수증의 머클트리 루트
    "miner": "0x0000000000000000000000000000000000000000",
    // 블록 채굴한 채굴자의 주소
    "difficulty": "0x0",
    // 블록 채굴하는데 사용된 난이도
    "totalDifficulty": "0x0",
    // 이블록까지 체인의 총 난이도
    "extraData": "0x",
    //블록 저장할수있는 추가 데이터
    "size": "0x3e8",
    // 블록의 크기(바이트)
    "gasLimit": "0x6691b7",
    // 블록에서 사용할수있는 최대 가스량
    "gasUsed": "0x5208",
    // 블록에서 실제로 사용된 가스량
    "timestamp": "0x63e85321",
    // 블록 채굴된 타임스탬프
    "transactions": [
      {
        "hash": "0x5c33cd4a94a872cea43e548911358740db29dbf2f2d4bdb8a5adddafc9368cc7",
        // 거래의 해시
        "nonce": "0x0",
        // 여기서의 논스는 동일주소에서 전송되었을수도있는 다른트잭과 이트잭 구분?
        "blockHash": "0x1c1ae0f0aaa608eac9c1bfe8e62a3a9c32ddc34608533c2556da55413f0fa829",
        // 이트잭에 포함된 블록의 해시
        "blockNumber": "0x1",
        // 이트잭에 포함된 블록의 번호
        "transactionIndex": "0x0",
        // 블록내 이트잭의 인덱스
        "from": "0x74ee63ec357d9ab01a0046886db3dd60db6d1bda",
        //거래를 보낸주소
        "to": "0x29e0f29bee7fb6babce91cbca064ae91dfc99254",
        // 트잭이 전송된주소(받는사람)
        "value": "0x8ac7230489e80000",
        // 트잭에서 보낸 량
        "gas": "0x15f90",
        // 거래수행하는데 사용된 가스량
        "gasPrice": "0x4a817c800",
        // 트잭에 사용된 각 가스단위에대해 지불된 가격?
        "input": "0x",
        // 트잭과 함께 전송된 입력데이터
        "v": "0x26",
        //거래 서명에 사용되는값
        "r": "0x1f8ff96db9243c34ca1b1657d3e628fafbf231609b113a5c0218bca351d7ad40",
        // 트잭 서명에 사용되는값
        "s": "0x7a78a4869bb797d824b53ceb8dba45ea987526c512b85e7f5f0f4492cb55aca2"
        // 고유한 디지털 서명 생성하는데 사용
      }
    ],
    "uncles": []
    // 블록에 삼촌잉벗다 ? 엉클을 포함하면 적은양의 블록체인기록이 둘이상 노드에 저장 블록체인 변조에 더강해진다?
  }
}
```

- 아래 gas gasprice 선택사항, 안넣어도됨 알아서 기본값으로 들어간다
  - gas : 내가 이 트랜잭션에 사용한 수수료
  - gasPrice : 가스당 가격(수수료 가겨을 결졍)

-value값등 0x뒤에 hex값으로 변경해서 넣어야함 1,000,000,000

- 1이더 보내려면 1,000,000,000,000,000,000 0이 18개임 총 19개 이값을 16진수로 변경해서 0x뒤에 붙여둔다

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
