# 스마트 컨트랙트 이벤트 등록 및 백엔드에서 트랜잭션 객체 생성하기

<br>

-   ChainId : 같은 체인 보고 있다는 식별자
-   NetworkId : 서버 노드에 대한 고유한 식별자

<br>

**_truffle console에서 네트워크 아이디 가져오기_**

```sh
web3.eth.net.getId()
```

<br>
<br>

## work flow

<br>

1. Ganache-cli 재시작
2. 메타마스크에 계정 연결
3. truffle migration을 통해 재배포
4. front 에서 컨트랙트 json 파일 최신화

<br>
<br>

# Event

웹소켓처럼 동작하는 것. 정확히는 로그를 남기는 것.
<br>
web3.eth.subscribe() 역시 로그를 남기는 것
<br>
Solidity 코드 안에서도 로그를 만들 수 있다.
<br>
<br>

# Back

백엔드에서 트랜잭션을 만들고 프론트에 던진다. (프론트에서 axios로 요청해서 트랜잭션 가져오기)
<br>
프론트에서는 연결된 메타마스크를 이용해 서명을 만든다.
<br>
전달받은 트랜잭션 객체에 서명 추가.
<br>
<br>

## 코인 vs 토큰

메인넷이 있는 것 : 코인
<br>
스마트 컨트랙트로 만든 것 : 토큰
<br>
코인과 토큰의 차이점은 메인넷 유무
<br>
<br>

## 트랜잭션

트랜잭션의 input 내용에 컨트랙트 함수 인코딩 값이 있다면 스마트 컨트랙트 실행을 위한 트랜잭션
<br>
contractAddress 내용이 있다면 스마트 컨트랙트 배포 트랜잭션 / 없다면 일반 송금용 트랜잭션
<br>
<br>
