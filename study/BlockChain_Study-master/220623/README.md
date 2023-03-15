# 트랜잭션

UTXO 업데이트
<br>
<br>

# 트랜잭션 풀 (mempool)

블록체인 서버에 빈 배열(트랜잭션 풀)을 생성
<br>
트랜잭션이 생길 때마다 빈 배열 안에 넣어준다.
<br>
블록이 생성될 때 트랜잭션 풀 안에 있는 트랜잭션들을 데이터 속성값으로 넣는다.
<br>
<br>

## chain.ts 파일

addBlock() , addToChain() , replaceChain() 수정
<br>
트랙잭션 풀, UTXO 업데이트 함수 추가.
<br>
<br>
