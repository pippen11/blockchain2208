# Javascript에서 Solidity 컴파일 및 스마트 컨트랙트 실행

- 제일 바깥에서 230228에서 깔아줌
- 필요 라이브러리

```bash
npm i solc web3
```

- 기존에 썼던 방법

```bash
npx solc --bin --abi ./contracts/Test.sol
```

```js
const solc = require("solc");
// 솔리디티 코드를 바이트코드로 변환시켜주는 컴파일 라이브러리
//// npx solc --bin --abi ./test.sol 이거대신 이렇게한다
const fs = require("fs");
// FileSystem, 파일에 접근하여 데이터를 가져오거나 파일을 수정, 생성 등의 기능을 제공하는 라이브러리
const path = require("path");
// 경로에 대한 편의 기능을 제공하는 라이브러리
// 사용 이유는 보통 OS에 따른 경로 문자열이 다르기 때문에
// - Windows OS : C:\Users\KGA_18\Documents\GitHub\blockchain2208\blockchain2208\230228> 여긴 역슬래쉬
// - Linux OS: 는 /mnt/c/Users/kga 이런식으로 슬래쉬

const contractPath = path.join(__dirname, "contracts", "Test.sol");
// __dirname: 현재 문서의 경로(폴더까지만)
// - PS : ES6(import, export) 사용시 __dirname이 없다
// path.join : 경로를 합쳐서 하나의 문자열로 반환

const compiled = JSON.parse(solc.compile(data));
// 컴파일후 데이터를 객체화

// 현재 JSON으로 나온다 그래서 parse한다(객체로바꿈)
console.log(compiled); // 객체로 바꿔서 짧아짐
// fs.writeFileSync(path.join(__dirname, "Test.json"), JSON.stringfy(compiled));
// Test.json 파일로 만들어라

// console.log(compiled.contracts["Test.sol"]);
// const {
//   abi,
//   evm: { bytecode },
// } = compiled.contracts["Test.sol"].Test;

// console.log(bytecode.object);
/////////////////////// 위에꺼 이렇게쓸수있다
const abi = compiled.contracts["Test.sol"].Test.abi;
// ABI 추출
// 컴파일 abi한거 이렇게 뽑음
const bin = compiled.contracts["Test.sol"].Test.evm.bytecode.object;
// ByteCode추출
// 컴파일bin파일
////////////////////
```

---

# Geth에서 생성한 지갑 계정 개인키 가져오기

- 필요 라이브러리

```bash
npm i keythereum
```

```js
const keyObj = keythereum.importFromFile(address, __dirname);
// 매개변수로 가져올 지갑주소와 해당 지갑 주소에 대한 key파일이 잇는
// keystore폴더의 위치를 전달한다 //C:\Users\KGA_18\Documents\GitHub\blockchain2208\blockchain2208\230228>

const privateKey = keythereum.recover("1234", keyObj);
// 매개변수로 비밀번호와 key 객체를 전달한다.
// 개인키에 대한 객체를 반환 받는다
```
