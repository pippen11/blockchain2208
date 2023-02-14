# Geth 추가설명

- datadir 옵션을 사용하지 않았을때 네트워크 정보는 어디에 저장되는가?

  - Linux : ~/.ethereum
  - Mac : ~/Library/Ethereum (기본 숨긴 폴더)

- Looking for peers 는 왜 계속 나오는가?

  - peer가 충분히 연결되지 않으면 계속 peer를 추가하도록 시도한다.
  - 기본 최대 피어 수는 50개

- geth removedb > 다운받은 데이터 삭제

<!--
admin
admin.nodeInfo  :  노드 정보 조회
admin.nodeInfo.enode  :  enode 값을 이용해 peer를 맺을 수 있음.
admin.datadir  :  admin 관련 데이터 디렉토리 경로
personal
personal.newAccount( )  :  계정 생성하기
eth
eth.syncing  :  동기화 완료 여부 확인 ( false 값이 나온다면 동기화가 완료된 것 )
eth.chainId( )  :  체인 ID 조회
eth.accounts  :  노드에 존재하는 계정 목록 조회
eth.coinbase  :  코인베이스 계정 (마이너 계정)
miner
miner.setEtherbase( eth.accounts[1] )  :  코인베이스 계정 바꾸기 (인자값: 계정)
miner.start( )  :  마이닝 시작하기 (인자값: 사용할 thread 개수)
miner.stop( )  :  마이닝 중지하기
web3
web3.fromWei( eth.getBalance( account ) , 'ether' )  :  wei → ether 로 단위 변환하기
 -->
