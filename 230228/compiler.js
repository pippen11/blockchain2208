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

// const contractPath = path.join(__dirname, "contracts", "Test.sol");
// // __dirname: 현재 문서의 경로(폴더까지만)
// // - PS : ES6(import, export) 사용시 __dirname이 없다
// // path.join : 경로를 합쳐서 하나의 문자열로 반환

// // fs.readFile(contractPath, { encoding: "utf-8" }, (err, data) =>
// //   console.log("data", data)
// // );
// // 버퍼로 가져온걸 utf-8로 바꿔달라
// // 콜백형식으로 안에다 넣어서 파일 가져와서 띄우고있다 (비동기)
// const temp = fs.readFileSync(contractPath, "utf-8");
// console.log("temp", temp);
// // 동기 // 보통 동기형식으로 쓴다
// //node compiler.js d이걸로 실행

// const data = JSON.stringify({
//   //solc를 사용하여 솔리디티 코드를 컴파일시 사용할 설정
//   language: "Solidity",
//   // 언어는 솔리디티다. 솔리디티 이외에도 언어가 있으나 솔리디티가 너무 강해서 다른 언어를 거의 사용하지않는다. yul
//   sources: {
//     // 파일에 대한 설정
//     "Test.sol": {
//       // 파일로 생성되는 솔리디티 객체의 이름
//       content: fs.readFileSync(contractPath, "utf-8"),
//       // 파일 내용(코드)
//     },
//   },
//   // 위에 Test.sol파일 에서 컴파일가져오는 파일이 엄청많음 밑에서 다가져와라느낌
//   settings: {
//     // 추가적인 설정
//     outputSelection: {
//       // 가져올 정보 설정
//       "*": {
//         //파일 이름
//         "*": ["*"],
//         // 가져올 데이터의 키, 값
//       },
//       // * : 모든것
//       // outpuSelection 내용은 '모든 데이터를 전부 가져와라'
//     },
//   },
// });
// const compiled = JSON.parse(solc.compile(data));
// console.log(compiled);
// 컴파일후 데이터를 객체화
// {
//   contracts: { 'Test.sol': { Test: [Object] } },
//   sources: { 'Test.sol': { id: 0 } }
// }
// 이렇게 나온다

// 현재 JSON으로 나온다 그래서 parse한다(객체로바꿈)
// console.log(compiled); // 객체로 바꿔서 짧아짐
// fs.writeFileSync(path.join(__dirname, "Test.json"), JSON.stringfy(compiled));
// // Test.json 파일로 만들어라

// console.log( compiled.contracts["Test.sol"]);
// const {
//   abi,
//   evm: { bytecode },
// } = compiled.contracts["Test.sol"].Test;

// console.log(bytecode.object);
// /////////////////////// 위에꺼 이렇게쓸수있다
// const abi = compiled.contracts["Test.sol"].Test.abi;
// // ABI 추출
// // 컴파일 abi한거 이렇게 뽑음
// const bin = compiled.contracts["Test.sol"].Test.evm.bytecode.object;
// // ByteCode추출
// // 컴파일bin파일
// ////////////////////

// console.log(abi);
// console.log(bin);
// // console(bytecode.object);

// // bytecode가 object라는 객체안에있다
// // Test 객체안에 abi와 evm이있고 evm안에 bytecode가 있따
// // // Test: {
// //     abi: [ [Object], [Object], [Object] ],

// // fs.writeFileSync(
// //   path.join(__dirname, "bytecode.json"),
// //   JSON.stringify(bytecode)
// // );

class Compiler {
  /**
   *
   * @param {string} _fileName 파일 이름
   */
  // 슬래시 **로 주석하면 index.js에 올리면 파일 어디서 불러오는지 볼수있다
  static compile(_fileName) {
    const contractPath = path.join(__dirname, "contracts", _fileName);
    // 위에랑 다르게 파일네임만 매개변수로 바꿈
    //"Test.sol" 만 생성할게 아니니 _fileName으로 변수로지정
    const data = JSON.stringify({
      language: "Solidity",
      sources: {
        [_fileName]: {
          content: fs.readFileSync(contractPath, "utf-8"),
        },
      },
      settings: {
        outputSelection: {
          "*": {
            "*": ["*"],
          },
        },
      },
    });
    // index.js를 실행시켜야 이게돈다
    // console.log("data", data);
    const compiled = solc.compile(data);
    // console.log("compiled", compiled);
    return Compiler.writeOutput(JSON.parse(compiled));
  }
  /**
   *
   * @param {*} _compiled 컴파일된 솔리디티 객체
   */
  static writeOutput(_compiled) {
    const result = {};
    // console.log("이거", _compiled.contracts);
    // abi랑 등등 나옴
    // Test.json이나옴;
    // {
    //   contracts: { 'Test.sol': { Test: [Object] } },
    //   sources: { 'Test.sol': { id: 0 } }
    // }
    for (const contractFileName in _compiled.contracts) {
      // 객체의 키들을 갖고와서 for문을 돌린다>> sol파일이 몇개가 될지 모르니까 반복문돌림
      // console.log("filename", contractFileName);
      // Test.sol이나온다
      //위에서 JSON형식을 객체로바꿔서 Test.sol 파일이름과
      const [contractName] = contractFileName.split(".");
      // 구조분해할당
      //   console.log(contractName);
      // .으로 잘라서 Test만뽑음
      const contract = _compiled.contracts[contractFileName][contractName];
      //   const contract = _compiled.contracts["Test.sol"].Test;
      // 객체에서 키에대한 값을 가져오는데 키를 변수로 입력할 경우 대괄호([])를 사용한다.
      // Test: {
      //   abi: [Array],
      //   devdoc: [Object],
      //   evm: [Object],
      //   ewasm: [Object],
      //   metadata: '{"compiler
      // 이런값들이 Test안에있다

      const abi = contract.abi;
      // console.log(abi);
      const bytecode = contract.evm.bytecode.object;
      // console.log(bytecode);
      const tempObj = { abi, bytecode };
      // console.log(tempObj);
      const buildPath = path.join(__dirname, "build", `${contractName}.json`);
      // build폴더를 만들어야함
      fs.writeFileSync(buildPath, JSON.stringify(tempObj));
      // abi,bytecode를 가진 파일을 json문자열로바꿔서 build에 생성
      //객체를 파일 안에못넣어서 JSON 문자열로 바꿔서 다시넣어줘야함
      // sync넣어서 다 처리가돼야 밑에꺼가 실행된다

      // fs.writeFileSync(buildPath, JSON.stringify(tempObj));
      // 이문장이 밑에 두문장으로 나눠질수있다

      /////////////////////////////////////////////// abi와 bin파일 나눠준다  이거주석하면 합쳐서 Test.json파일에 합침
      //   fs.writeFileSync(
      //     path.join(__dirname, "build", `${contractName}.abi`),
      //     JSON.stringify(abi)
      //   );
      //   fs.writeFileSync(
      //     path.join(__dirname, "build", `${contractName}.bin`),
      //     bytecode //bytecode는 애초에 스트링이라 stringfy를 지운다
      //   );
      ////////////////////////////////////////////
      result[contractName] = tempObj;
      console.log("result", result);
      // Test를 키로 넣어준다
      // Test:{
      //   abi:
      //   bytecode:
      // }
      //이런식으로나온다
    }
    return result;
  }
}

module.exports = Compiler;
