### nodekey 생성 (bootnode)

```sh
$ bootnode --genkey boot.key
```

<br>

### POA 방식으로(Clique) genesis.json 파일 생성

- puppeth 이용
- Clique 선택

<br>

### Geth console 명령어

- eth.accounts : 전체 계정
- eth.coinbase : 코인베이스 계정
- eth.mining : 마이닝 중인지 확인 (true/false)
- eth.blockNumber : 블록 개수
- eth.getBalance('account') : 계정 잔액 조회

<br>

- personal.newAccount('[패스워드]')

```sh
personal.sendTransaction({from: eth.coinbase, to: '0x8f15be3ecc1f6eeafb557fe5c03dc0c68f6b4cfe', value: web3.toWei(2, 'ether')}, '1234')
```

<br>

- txpool : txpool 조회
