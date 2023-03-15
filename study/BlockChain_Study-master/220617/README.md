# 지갑

지갑에서 블록체인 네트워크로 데이터를 전송해야 하는데, cors 에러가 발생하게 될 것이다.
<br>
cors 에러를 해결하기 위해서는 내 로컬에 블록체인 네트워크와 peer로 연결되어 있는 노드가 하나 이상 필요
<br>
지갑에서 블록체인 네트워크와 연결되어 있는 노드에게 http로 요청 (tranasaction 데이터)
<br>
<br>

# authorization header

블록체인 인터페이스를 관리하는 http 서버에서의 인증처리 방식. (url 인증)
<br>
http://web7722:1234@localhost:3000
<br>
web7722:1234 -> Base64로 인코딩 -> ADF15346E124AB123...
<br>
http 헤더 부분에
Authorization: Basic ADF15346E124AB123... 로 들어간다.
<br>
<br>

## 지갑 종류.

지갑의 목적은 개인키의 보관이다.
<br>
프로그램마다 개인키를 보관하는 방법이 다르기 때문에 종류가 많다.
<br>
메타마스크의 경우 로컬 디렉토리 안에 개인키 보관
<br>
<br>

## transaction

노드는 mempool 이라고 하는 transaction 풀 안에 transaction 데이터를 입력,
<br>
transaction 풀에 입력된 데이터도 블록체인 네트워크 안에서 broadcast
<br>
<br>

# wallet 디렉토리 생성

-   server.ts : 지갑 생성 서버

-   wallet.ts : Wallet 클래스 파일
