# 블록체인 P2P 네트워크

## chain.ts 파일 수정

### isValidChain()

1. 제네시스 블록을 검사하는 코드
2. 제네시스를 제외한 나머지 체인에 대한 검증코드

### addToChain()

전달받은 최신 블록을 내 체인에 추가하는 함수

### replaceChain()

체인 교체 코드

## p2p.ts 파일 수정

messageHandler() 수정

1. private sockets로 수정
2. getSockets() 메소드 추가
3. broadcast() 메소드 추가
4. errorHandler() 메소드 추가

### handleChainResponse()

체인 바꿔주는 코드 // 긴 체인 선택

# peers ip가 담긴 파일 생성

peer.json
