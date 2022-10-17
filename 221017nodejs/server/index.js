// npm-> node package manager
// Node.js 에서 사용하는 라이브러리 관리자
// yarn(React)도 사용 가능

// npm install 라이브러리명/ npm i(install) 라이브러리명(여기서는 express)
// 라이브러리 설치
//  package.json: Node.js를 사용해 구현된 프로그램(모듈, 라이브러리 , ...)에 대한 정보를 모아둔 파일
// dependencies는 의존성을 뜻하며 현재 프로그램이 실행되기 위해서 필요한 라이브러리이다.(package.json에있는거)

const express = require("express");
//require는 외부 라이브러리를 가져오는 함수
//매개변수로 라이브러리명을 전달한다.

const app = express();
//express호출하면 서버 정보가 저장이되고

app.get("/", (req, res) => {
  res.send("hi");
  //send는 우리로따지면 리턴이다
  //req: 요청 사항 , 요청에 대한 데이터
  // res: 응답 사항 , 응답의 데이터
});

app.listen(8080, () => {
  console.log("서버열음");
});
//listen은 어떤포트 실행할것이냐
