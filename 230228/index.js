const Compiler = require("./compiler");
const Client = require("./web3");

const {
  Test: { abi, bytecode },
  //Test.sol파일에있는 Test키인 abi와 bytecode를 구조분해할당해서 가져옴
} = Compiler.compile("Test.sol");
// console.log("abi다", abi);

// console.log(temp);

// 컴파일 매개변수로 _fileName넣어줬는데 그게 test.sol파일이 들어간다
// data {"language":"Solidity","sources":{"Test.sol":{"content":"// SPDX-License-Identifier: MIT\r\npragma solidity ^0.8.15;\r\n\r\ncontract Test {\r\n  string text;\r\n\r\n  constructor() {\r\n    text = \"Hi22 Block7\";\r\n  }\r\n\r\n  function getText() public view returns (string memory) {\r\n    return text;\r\n  }\r\n\r\n  function setText(string memory _value) public {\r\n    text = _value;\r\n  }\r\n}\r\n"}},"settings":{"outputSelection":{"*":{"*":["*"]}}}}
// Test.sol이 _fileName로 들어간다
// node index로 실행
//abi , bin이랑 합쳐놓은게 temp

const client = new Client("http://127.0.0.1:8545");
// console.log(client);
// 이것저것 들어있다
// this.web3 = new Web3(_url); (_url)대신 "http://127.0.0.1:8545"넣어서 가져올수있음

// 여기서부터 세줄이
// data = "0x60806040...8130033";
// txObj = { from: eth.accounts[0], data, gas: 1000000 };
// eth.sendTransaction(txObj)
//

const txObj = { data: bytecode };
// console.log(txObj);
// 2. txObj = { from: eth.accounts[0], data, gas: 1000000 }; 계정 0번째로 txobj를 정의

const contract = new client.web3.eth.Contract(abi);
// abi를 넣어서 컨트랙트 생성(연결)
// 밑에 작업과 같다
// contract = eth.contract([
//   { inputs: [], stateMutability: "nonpayable", type: "constructor" },
//   {
//     inputs: [],
//     name: "getText",
//     outputs: [{ internalType: "string", name: "", type: "string" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [{ internalType: "string", name: "_value", type: "string" }],
//     name: "setText",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
// ]);
// console.log("contract", contract);
//this.web3 이거와 client.web3의 web3이름을 맞춰줘야함
// 어제의 4번과 같다
// Contract(abi)를 생성하는거다 (클래스로 인스턴스(객체)생성)
// contract인스턴스

//여기서 부터의 과정이 위에꺼랑 밑에 init?
// data = "0x60806040...8130033";
// // solc로 생성된 bin파일 내의 모든 데이터
// // data="" ""사이에 넣어준다
// txObj = { from: eth.accounts[0], data, gas: 1000000 };

// eth.sendTransaction(txObj)

async function init() {
  // 스마트계약 배포
  // 바이트코드 넣어서 배포
  const instance = await contract.deploy(txObj).send({
    from: "0x657EFf83cAC9B3ef6d49b7742207be003d873352",
    // 가나쉬 첫번째 계정
    gas: 1000000,
  });
  // 어제의 eth.sendTransaction(txObj)와 같다
  // console.log("instance다", instance);
  // console.log("Ca다", instance.options.address); // CA
  //  0x29455ade5173D83319C96356DE8C67AF5CeE4A04
}
// init(); // 트랜잭션보내는거다 스마트컨트랙트 넣는내용으로 그래서 한번부르고 주석
// 파일수정하면 init() 부터 다시돌려서한다(bin,abi컴파일?)
// 스마트컨트랙트: 코드가 블록트랜잭션에 들어가서 그코드를 불러온다(bytecode로 들어가있다)
// 블록체인 자체에 저장

//3번은 어디?
async function test() {
  const accounts = await client.web3.eth.getAccounts();
  // 가나쉬 계정 10개 불러온다
  // 이건 함수호출
  console.log(accounts);

  const ca = "0x29455ade5173D83319C96356DE8C67AF5CeE4A04";
  const deployed = new client.web3.eth.Contract(abi, ca);
  //배포된걸 가져온다(4,5번 합친거다)

  // 밑에 두개합친거와 같다

  //이거 컨트랙트생성(연결)  contract = eth.contract([
  //   { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  //   {
  //     inputs: [],
  //     name: "getText",
  //     outputs: [{ internalType: "string", name: "", type: "string" }],
  //     stateMutability: "view",
  //     type: "function",
  //   },
  //   {
  //     inputs: [{ internalType: "string", name: "_value", type: "string" }],
  //     name: "setText",
  //     outputs: [],
  //     stateMutability: "nonpayable",
  //     type: "function",
  //   },
  // ]);

  // 이거랑 컨트랙트에 CA 연결 instance=contract.at("0x4bf8c872a63433b9c5a5da26c6250c8f1775231b")
  //  어제의 4,5번 합친것과 같다

  // contract.at이랑 contract=eth.contract이런거랑 합쳐서씀
  // abi ca넣어서 객체를 만든다

  let text = await deployed.methods.getText().call();
  // 이거랑 같다 instance.getText.call()

  // deployed안에 methods안에 우리가만든 getText와 setText가있음
  console.log("text", text);

  await deployed.methods
    .setText("오ㄹ점?")
    .send({ from: accounts[1], gas: 1000000 });
  // 가스비 넣어줘도되고 안넣어줘도됨
  //이거랑 같다 instance.setText("why so serious",{from:eth.accounts[0]})

  //gas와 gasprice랑 곱해야함 gas는 내가 쓴돈(10달러) gasprice는 1달러당 얼마당 원화
  text = await deployed.methods.getText().call();
  console.log("text", text);

  const balance = await client.web3.eth.getBalance(accounts[1]);
  console.log(balance);
}
test();
