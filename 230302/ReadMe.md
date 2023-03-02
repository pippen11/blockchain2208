# Truffle

- 블록체인 스마트 컨트랙트 프레임워크
- 컴파일, 배포 , 관리 , 테스트 등을 제공
- 많이 사용되는 프레임워크
  트러플(Truffle)은 이더리움 기반 디앱을 쉽게 개발할 수 있도록 도와주는 블록체인 프레임워크이다. 스마트 컨트랙트(smart contract) 컴파일, 배포, 관리, 테스트까지 빠르고 쉽게 할 수 있다.
  프레임워크란?
  차, 비행기, 배같은 탈것과 같은 운송수단입니다. 사람이 탑승하여 시동을 걸고, 기어를 넣고, 핸들을 작동하고, 운전을 해야 합니다. 하지만, 앞서서 제시한 탈것들은 라이브러리처럼 좀처럼 대체가 어렵다
  cd 230302 npm init -y 하고 test폴더에옮김
  test폴더안에 npm i truffle

  # Solidity Prettier 설정

  ````bash
   npm i -D prettier-plugin-solidity
    ```

    -단 , settings.json수정후에 가능
    저번에 확장 설정에서 이렇게 넣어줌
    {
  "prettier.documentSelectors": ["**/*.sol"]
  }
  ````

# Truffle 사용법

- 기본 설정

  ```bash
  npx truffle init
  ```

  - npx sequelize init와 같이 폴더/파일이 자동으로 생성

- 폴더와 파일 설명
- contracts : 스마트 컨트랙트 코드 작성 폴더(Solidity)
- migrations : 배포 관련 코드 작성 폴더(Javascript)
- test : 테스트 코드 작성 폴더(Jest)
- truffle-config.js : 설정 파일

- 컴파일(파일수정되면 여기서부터 다시)

```bash
 npx truffle compile
```

- 생성된 폴더
- bulid/contracts : compile로 생성된 데이터를 json 형식으로 추출
  abi, bytecode등 다들어간다 compile한것을 build폴더에 들어간다
  파일만 인식하여 컴파일

- 배포(서버를 재가동하면 배포부터 다시)

```bash
npx truffle migration
# 명령어 실행 전에 truffle-config.js 파일 내에서 development(66번째줄부터) 관련 설정을 주석 해제하자.
# --reset 뒤에 붙여주면 다 돌린다
```

- 파일 명은 번호\_내용\_컨트랙트명 의 형식을 지켜야한다
- 1_deploy_Test.js

```js
const test = artifacts.require("Test");
// 컴파일 후 생성된 Json 파일명을 전달하여 스마트 컨트랙트 데이터를 가져온다. // 여기서는 bulid폴더안에 Test.json파일

module.exports = function (deployer) {
  // deployer : truffle이 제공하는 배포를위한 객체
  deployer.deploy(test);
};
```

- 컨트랙트: 코드를 저장하고 실행한다
- 트랜잭션: 저장하기 위한 저장공간
- 블록안에 트랜잭션안에 smart contract가 있다 smart contract안에 getText setText가 있다 스마트 컨트랙트호출하면 getText값, 결과에대한 트랜잭션 해쉬가나옴

- truffle-config.js 67번째줄 development 쪽 주석풀기

- 배포 결과에서 CA를 가져오자
- 0x9675037E79010BBADAf0ef64aE7A978b6E9Ef707

- truffle을 사용해서 확인

```bash
npx truffle console
Test.deployed().then(instance => test=instance)
test.getText.call()
test.setText('넣고싶은값')
test.getText.call()
```

- .exit이나 컨트롤d 컨트롤c두번 하면 나가짐

- Jest 테스트
  - test 폴더 내에 코드 작성
  - 명령어를 입력
  ```bash
  npx truffle test
  ```
  - test(폴더명)는 만들어지는거니까 고정이다
- 파일명은 .test.js로 해줘야함

# React로 Front 작성

```bash
yarn create react-app front
```

2. web3 설치

```bash
cd front
yarn add web3
```

3. 카운터 스마트 컨트랙트 생성
