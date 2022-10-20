const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();

app.set("port", process.env.PORT || 8080);

app.use((req, res, next) => {
  if (process.env.NODE_ENV === "production") morgan("combined")(req, res, next);
  else morgan("dev")(req, res, next);
});

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser(process.env.COOKIE_SECRET));

app.use("/", express.static(path.join(__dirname, "public")));

app.use(
  session({
    resave: false,
    saveuninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: "session-cookie",
  })
);

//use는 메서드 형식을 따지지않는다
//get 과 post 차이점 둘다 요청할때 보내는 내용 req에포함이되어있음
//post는 body로 받는다
app.post("/testing", (req, res) => {
  console.log(req.body);
  res.end(`<div>${req.query.lunch}</div>`);
  //get 메서드 형식을 사용할때는 query, 즉 쿼리스트링을 사용한다.
  //post 메서드 형식을 사용할때는 body로 데이터에 접근한다
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send(err.message);
});

app.listen(app.get("port"), () => {
  console.log("안녕");
});

//http://local:8080/testing?lunch=asdfsadf
//http://->프로토콜
//localhost->주소 , ip 주소/ 도메인(DNS)주소
//: 8080 -> 포트번호
//: /testing ->라우터
//?lunch=asdfsadf->대망의 !쿼리
