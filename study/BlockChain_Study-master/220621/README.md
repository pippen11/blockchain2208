# 트랜잭션

두개의 데이터가 동시에 이동해야 하는 경우, 트랜잭션 처리를 하게 된다.
<br>
비트코인의 경우, 거래의 히스토리를 남기는 방식으로 트랜잭션 처리를 하고 있다.
<br>
거래 히스토리를 만들 때 잔액 내용을 만들어 가면서 기록을 남긴다.
<br>
Transaction 객체 안에 TxIn[], TxOut[], hash 속성 존재
<br>
TxOut[] 에는 TxOut 객체들이, TxIn[] 에는 TxIn 객체들이 들어간다.
<br>
TxOut이 만들어질 때 UnspentTransactionOutput도 같이 만들어진다.
<br>
<br>

# 코인베이스 트랜잭션

블록 생성시 들어가게 되는 트랙잭션 데이터 중 첫번째 트랜잭션을 코인베이스 트랜잭션이라 한다.
<br>
트랜잭션 내용에 TxIn이 없다. TxOut만 존재
<br>
<br>

## src/core/transaction/

## src/core/blockchain/ chain.ts 수정

UnspentTxOuts 배열 추가

## 루트 디렉토리 index.ts 수정

/mineBlock api

## @types/ transaction.d.ts 파일 추가

## chain.ts 파일 수정

miningBlock() 메소드 추가
<br>
getUnspentTxOuts() 메소드 추가
<br>
appendUTXO() 메소드 추가

## block.ts getMerkleRoot() 메소드 수정

## src/core/wallet/ wallet.ts 수정

getBalance() 메소드 추가
