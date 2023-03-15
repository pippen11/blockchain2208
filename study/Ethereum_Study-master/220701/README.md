# Geth RPC 설정하기

geth에서 rpc 통신하기
<br>
메타마스크에서 geth 와 연결하기
<br>

### node 디렉토리 생성

```shell
 $ geth --datadir node account new
```

node 디렉토리 안에 keystore 디렉토리 안에 새로운 account 생성됨.
<br>
<br>
go-ethereum 디렉토리 안에서 make geth <- geth만 빌드
<br>
go-ethereum 디렉토리 안에서 make all <- 전부 다 빌드
<br>

-   puppeth : 설정 파일 도와주는 아이 (genesis.json 같은 거 생성해줌)
-   bootnode : 네트워크

<br>

bitkunst.json 파일을 토대로 node 디렉토리 안에 geth 생성

```shell
$ geth --datadir node init "./bitkunst_/bitkunst.json"
```

geth 실행하기

```shell
$ geth --datadir node
```

ipc 통신하기

```shell
$ geth attach ./node/geth.ipc
```

다른 프로세스에서 호출해서 내용을 보기 위해 geth.ipc 사용
<br>
다른 컴퓨터에서는 우리의 로컬 디렉토리 안에 있는 geth.ipc 파일에 접근할 수 없기 때문에
<br>
RPC 통신을 해야만 한다.
<br>
메타마스크와 통신하기 위해서는 RPC 사용.
<br>
RPC 통신을 해서 다른 컴퓨터에서 우리의 geth 노드에 접근할 수 있도록 해준다.
<br>
옵션명이 --http 이지만 실제 우리가 하는 것은 RPC

-   --http.addr "0.0.0.0" : 모든 사람의 접근 허용(어떤 ip를 허용하게 할 것인지)
-   --http.port 9000 : 몇번 포트를 열 것인지
-   --http.corsdomain "\*" : cors 에러 해결
-   --http.api "admin,miner,txpool,web3,personal,eth" : 외부에서 어떤 모듈을 사용할 수 있게 할 것이지 설정 (모듈도 선택해서 사용할 수 있게 만들 수 있다.)
-   --syncmode full
-   --networkid 701 : 체인ID와 동일한 값으로 networkid를 만들어줘야 한다.

```shell
$ geth --datadir node --http --http.addr "0.0.0.0" --http.port 9000 --http.corsdomain "*" --http.api "admin,miner,txpool,web3,personal,eth,net" --syncmode full --networkid 701
```

웹 소켓 사용하기

```shell
$ # webSocket
$ geth --datadir node --ws --ws.addr "0.0.0.0" --ws.port 9005 --ws.origins "*" --ws.api "admin,miner,txpool,web3,personal,eth,net" --syncmode full --networkid 701
```

```js
// webSocket 이용

const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.WebsocketProvider('ws://127.0.0.1:9005'));

web3.eth.subscribe('newBlockHeaders', (error, result) => {
    if (!error) {
        console.log(result);
    }
});
```

이제 실행된 geth와 rpc 통신 가능

```shell
$ geth attach http:127.0.0.1:9000
```

이제 NodeJs 환경 뿐만 아니라 메타마스크에서도 geth와 통신이 가능하다.
<br>
프라이빗 네트워크를 만들고 NodeJs 환경에서 프라이빗 네트워크에 요청을 보내서 정보를 가져올 수 있다.
<br>
<br>
<br>

# Block Explorer

블록체인 네트워크 노드 쪽에서 통신을 할 수 있는 통로를 만들어 놓고
<br>
브라우저에서는 web3 라이브러리를 사용해서 노드와 통신하는 것
<br>
Nodejs web3
<br>

```shell
$ npm install web3 jest
```

```js
personal.sendTransaction(
    {
        from: eth.coinbase,
        to: '0xeec18f258b11011d462c4fef0e32271695048552',
        value: web3.toWei(10, 'ether'),
    },
    '1234',
);
```

```sh
personal.sendTransaction({from: eth.coinbase, to: '0xeec18f258b11011d462c4fef0e32271695048552', value: web3.toWei(10, 'ether')}, '1234')
```
