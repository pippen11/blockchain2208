# Counter Dapp

<br>

트랜잭션을 발동시키기 위해서는 개인키가 필요하다.
<br>
Tx -> Private Key 필요
<br>
메타마스크와 같은 지갑 프로그램을 사용해 개인키를 보관
<br>
화면 -> MetaMask -> Ethereum Client
<br>
front에서는 메타마스크 연결 작업을 진행
<br>

```sh
$ npm install web3
```

<br>
<br>

## MetaMask

메타마스크는 기본적으로 크롬 익스텐션 프로그램
<br>
메타마스크를 설치하면 window 객체 안에 ethereum 객체를 만들어준다. (ethereum rpc 객체)
<br>
window.ethereum 객체를 사용해 메타마스크에게 요청을 보낼 수 있다.
<br>
