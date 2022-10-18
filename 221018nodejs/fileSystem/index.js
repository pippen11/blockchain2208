const fs = require("fs");
const { default: test } = require("node:test");
//fs도 모듈
const path = require("path");
//불러와야 쓸수잇음

// console.log("dirname :" + path.dirname(__filename));
// //파일의 경로
// console.log("extname :" + path.extname(__filename));
// //파일의 확장자
// console.log("basename :" + path.basename(__filename));
// // 파일의 이름
// console.log(path.join(__dirname, "..", ".."));
// //경로를 합친다(join). ..은 뒤로
// console.log(path.join(__dirname, "..", "..", "221018node.js"));
// //path란 경로에 대해서 관리하는 모듈이다.

// fs.writeFile("./text.txt", "안녕하세요", (data) => {
//   console.log(data);
// });
// // 파일을 생성한다.

// fs.readFile("./text.txt", (err, data) => {
//   if (err) console.log(err);
//   console.log(data);
//   console.log(data.toString());
// });

// const fsProm = fs.promises;

// fsProm
//   .writeFile("./test1.txt", "프라미스~")
//   .then(() => {
//     return fsProm.readFile("./test1.txt");
//   })
//   .then((data) => {
//     console.log(data);
//     console.log(data.toString());
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// fs.writeFileSync("./test2.txt", "싱크 확인");
//자기가 알아서 싱크까지 넣어줌

function tryTest() {
  try {
    let data = fs.readFileSync("./test11.txt");
    console.log("data:" + data);
  } catch (err) {
    console.error("err:" + err);
  }
}
//에러확인
tryTest();

let data = fs.readFileSync("./text.txt");
console.log("data:" + data.toString());
data = fs.readFileSync("./test1.txt");
console.log("data:" + data);
data = fs.readFileSync("./test2.txt");
console.log("data:" + data.toString());
//이건 동기작업을하겠다 기다리겠다 순서대로

async function readFileSyncFunc(filePath) {
  const data = await fs.promises.readFile(filePath);
  console.log("test" + data);
}
//비동기 작업이다

//async는 promise로 불러오는파일을 await로 기다려서 불러온파일을 기다리려고 쓴다

// const data1 = readFileSyncFunc("./test.txt").toString();
// console.log(data1);

//fs.createReadStream()
//알아서 찾아봐

console.log(__filename);
//파일 이름을 포함한 경로
console.log(__dirname);
// 현재 파일 경로 내용을 보는거 어디에 위치해있나
//위변수들은 ES6에 없다.

// import fs from "fs";
// ES6 문법이다.
