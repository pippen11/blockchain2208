# Truffle, React ,Express 기본 세팅

```bash
cd 230307
yarn create react-app front
mkdir back
cd back
npm init -y
npm i -D prettier-plugin-solidity
npm i truffle express web3 cors
npx truffle init
npm i -D nodemon
cd ../front
yarn add web3 axios
```

- npm start로 시작하면된다

-y를 붙일경우 생성에 필요한 것들을 자동으로 완료한다.
-Node.js의 경우 init시 프로젝트명,
라이센스 등의 입력이 필요하지만 -y
옵션을 사용시 기본값으로 처리하여 완료한다.

- apt-get install의 경우 프로그램 설치 시 사용자의 동의가 필요하지만
  해당 동의를 미리 -y옵션으로 추가하여 중간에 멈추지 않고 설치를 완료한다.

  - 1. FrontEnd에서 web3연결-> src에 useWeb3.js파일만든다
       -Custom Hook으로 사용
  - BackEnd에서 index.js파일만든다 express 작성

```js
const express = require("express");
const web3 = require("web3");
const cors = require("cors");

const app = express();
const web3 = new Web3("http://localhost:8545");

app.use(cors({ origin: true, credentials: true }));
//origin : true => 모든주소에 대해서 cors무시 (\*적은거랑똑같다)
app.use(express.json());

app.listen(8080, () => {
  console.log("8080 server open");
});
```

# 투표 DApp

- back/contracts에 Vote.sol 파일 작성

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Vote {
  string[] public candidateList;
  // 투표 목록
   mapping(string => uint) public votesReceived;
   //투표 목록에 대한 투표수

   constructor(string[] memory candidateNames) {
    candidateList = candidateNames;
  }

  function totalVotesFor(string memory candidate) public view returns (uint) {
    // 투표수 받아오기
    return votesReceived[candidate];
  }

  function voteForCandidate(string memory candidate) public {
    // 투표하기
    votesReceived[candidate] += 1;

  }

   function candidates() public view returns(string[] memory) {
    // 투표 전체 목록 받아오기
    return candidateList;
  }
}

```

- mapping(키 => 값) 옵션 이름
- 이름[키] = 값

```js
const 이름 = { 키: 값 };
이름[키] = 값;
```

-Truffle 사용해서 Compile, Migration

- FrontEnd에서 App.js작성

- npx truffle compile
- truffle-config.js 67번째줄 주석풀고
- migration폴더안에 1_deploy_Vote.js 같이 파일만들고
- eployer.deploy(Vote, ["핵밥", "냉면", "닭가슴살", "단식"]); 이런식으로 매개변수 constructor의 매개변수 넘겨주고 투표 목록 적어주고
- npx truffle migration

- 배포후 build contract 안 json파일 확인
<!-- "networks": {
    "1678150067213": {
      "events": {},
      "links": {},
      "address": "0xA528955469909161c0E3936B144cE202C16f85D5",
      "transactionHash": "0x792ddc534dc1a2ab1bd29d3297cb76ce7dcdab303de770ce0f70806db9a3fa65"
    }
  }, -->

## 솔리디티 작성 시 주의사항

- string string은 비교가 안된다

```solidity

  function validCandidate(string memory candidate) private view returns (bool) {
    for (uint i = 0; i < candidateList.length; ++i) {
      if (candidateList[i] == candidate) return true;
      // 여기서 에러 발생
    }
    return false;
  }
```

- keccak256으로 해시와 해서 비교를 진행
- string을 keccak256의 매개변수로 바로 전달하면 유니코드를 제대로 인식하지 못하여 오류발생
- abi.encodePacked메서드를 사용하여 16진수로 변환후 해시화
- 아래 코드로 수정

```solidity
function validCandidate(string memory candidate) private view returns (bool) {
    for (uint i = 0; i < candidateList.length; ++i) {
      if (
        keccak256(abi.encodePacked(candidateList[i])) ==
        keccak256(abi.encodePacked(candidate))
      ) return true;
    }
    return false;
  }
```

- 1. methods보내는방식 , 2. keccak256(abi.encodePacked("스트링")) 이거두개가 제일 중요
