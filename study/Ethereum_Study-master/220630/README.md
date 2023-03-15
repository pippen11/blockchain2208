# Geth / private 네트워크 구축

Geth : Go Ethereum
<br>
제네시스 블록과 체인ID 값을 바꿔서 나만의 네트워크 구축 가능
<br>
web3 라이브러리 역시 geth가 제공해주고 있는 것
<br>
geth 명령어 입력 시 : 다른 사람과 peer를 연결해서 파일을 다운 받는다.
<br>

```shell
# Mac
$ cd ~/Library/Ethereum

#Linux
$ cd ~/.ethereum
```

-   keystore 디렉토리 : geth에서 관리하는 계정들의 개인키를 파일로 저장

-   geth 디렉토리 안의 chaindata : 블록헤더, 블록바디의 트랜잭션 내용들이 저장된다.

-   블록 정보들이 파일 형태로 저장됨.

<br>
geth 명령어를 입력해 이더리움 메인넷의 데이터를 받는다.
<br>
이러한 것을 블록 동기화 라고 한다.
<br>
블록 동기화의 3가지 모드
<br>

-   full sync : 모든 내용을 전부 받는 것
-   fast sync : 블록 헤더 정보는 모두 가지고 오고 , 블록 바디는 latest tx 기준 -1024개의 트랜잭션 데이터만 가져온다.
-   light sync : 블록 헤더 정보, latest snapshot

<br>
geth 명령어의 디폴트 값은 fast sync
<br>
light sync를 하고 싶으면 옵션값 입력
<br>

```shell
$ geth --syncmode light
```

light sync 명령어로 다운 받을 시 lightchaindata 디렉토리 안에 저장됨.

<br>

geth로 다운 받은 파일들 전부 삭제 명령어

```shell
$ geth removedb
```

<br>
<br>
<br>

## Node와 통신하는 법

-   RPC 통신
-   IPC 통신

### IPC

IPC endpoint opened -> geth.ipc 파일 생김 , 이 파일을 통해 IPC 통신 가능
<br>
내부 프로세스간 통신을 할 때 사용하는 게 IPC 통신
<br>
RPC가 외부에서 통신하는 거라면 , IPC는 내부(내 컴퓨터)에서 통신하는 것
<br>

```shell
$ cd ~/.ethereum
```

```shell
geth attach ~/.ethereum/geth.ipc
```

geth 한테 붙이겠다.
<br>
geth로 돌아가는 쪽은 백엔드라고 보면되고 geth attach 명령어를 실행하는 쪽은 프론트라고 보면 된다.
<br>
<br>

**datadir : 블록 데이터 , 키 데이터를 저장하는 디렉토리**
<br>

-   web3.eth.syncing : 동기화 완료 여부 확인
-   web3.eth.accounts

<br>
<br>
<br>

## geth attach 콘솔창

**_go 언어로 만들어 놓은 모듈을 자바스크립트로 호출할 수 있게끔 만들어 놓은 것._**
<br>

**_그리고 그 자바스크립트로 호출할 수 있는 내용을 다른 데서 사용할 수 있게끔 한 것이 web3 라이브러리_**
<br>

**admin**

-   admin : 내 노드에 관련된 모든 정보 조회 가능
-   admin.nodeInfo : 노드 정보
-   admin.nodeInfo.enode : 기존에는 피어를 연결할 때 웹 소켓 프로토콜로 연결했었다, enode 값을 가지고 피어와 연결할 수 있다. 노드의 ip주소라고 생각하면 된다.
-   admin.datadir : admin 관련 데이터 디렉토리 경로

**personal**

-   personal :
-   personal.newAccount() : 계정 생성 메소드
    -   Passphrase : 계정의 락과 언락을 할 수 있는 패스워드 (계정 조회용 패스워드)
    -   계정 정보가 들어간 JSON 파일이 생김.

<br>

메타마스크 계정 연결 방법 :

1. geth를 통해 만들어진 json 파일 형태로 계정 가져오기
2. 개인키를 넣어서 가져오기

<br>
<br>
genesis.json : genesis 블록 속성 파일
<br>

비트코인의 경우 최대 발행량이 존재하지만, 이더리움의 경우 버전업을 하면서 채굴 보상을 줄여나갔다.

-   homesteadBlock : 0 (homestead 버전을 사용하겠다는 뜻)

<br>
<br>
<br>

## private 네트워크 구축

private network : 우리만의 새로운 네트워크를 만들겠다는 뜻
<br>
genesis.json 파일을 사용해 새로운 datadir 디렉토리 생성
<br>

```shell
$ geth --datadir node init genesis.json
```

현재 디렉토리에서 genesis.json 파일을 가지고 datadir 디렉토리 생성 (디렉토리명은 node)
<br>

node 디렉토리를 가지고 geth 노드 실행

```shell
$ geth --datadir node
```

<br>
내가 addToPeer 를 하지 않는 이상 나만 사용할 수 있는 상태.

```shell
$ geth --datadir node --nodiscover
```

<br>
admin.nodeInfo.ports.discovery
<br>
enode 가 자동으로 dicovery에 있는 port로 연결을 한다.
<br>
<br>
<br>

## private 네트워크 마이닝

계정이 필요함

-   personal.newAccount() : 계정 생성

-   eth.accounts : 계정 목록 조회

-   eth.coinbase : 코인베이스 계정 (마이닝 할 때 코인 보상 받는 계정)

-   miner.setEtherbase(eth.accounts[1]) : 코인베이스 계정 바꾸기

-   miner.start(1) : 1 쓰레드로 마이닝 시작

-   miner.stop()

-   web3.fromWei(eth.getBalance(eth.coinbase), 'ether') : wei -> ether로 변환

<br>

EIP : Ethereum Improvement Proposal (개선 제안)

<br>
admin.addPeer("enode://f3ef69d736a9c9859ede4d448e46761d0e89896d82e0359b7fd882209b0a388413138261f02f1522ac4369f5323fde8cad3a45fdc301884eb81aadbceac3229c@14.7.171.220:30303?discport=60963")
