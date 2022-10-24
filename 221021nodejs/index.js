// 내일 수!업! : 게시판 등록/수정/삭제, 목록 페이징, 아이디 생성/삭제/로그인/로그아웃

const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");

// require("./api/javascript.js");

// require("./api/cryptoTest.js");
// import "./api/ctyptoText.js" es6문법
// require("./api/jwt.js");

const routes = require("./routes/index.js");
// app.set("port", process.env.PORT || 8080);

const boardList = [
  { title: "arvserv1", text: "9baresrsearvstb" },
  { title: "arvserv2", text: "8baresrsearvstb" },
  { title: "arvserv3", text: "7baresrsearvstb" },
  { title: "arvserv4", text: "6baresrsearvstb" },
  { title: "arvserv5", text: "5baresrsearvstb" },
  { title: "arvserv6", text: "4baresrsearvstb" },
  { title: "arvserv7", text: "3baresrsearvstb" },
  { title: "arvserv8", text: "2baresrsearvstb" },
  { title: "arvserv9", text: "1baresrsearvstb" },
];

const app = express();
dotenv.config();

app.use((req, res, next) => {
  if (process.env.NODE_ENV === "production") morgan("combined")(req, res, next);
  else morgan("dev")(req, res, next);
});
app.use("/", express.static(path.join(__dirname, "web")));
//경로확인 제대로 하기 add안에있으면 add/web임
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: "session",
  })
);

//2 게시판등록
app.post("/api/board/add", (req, res) => {
  boardList.unshift(req.body);
  res.send({ status: 200, data: "정상 입력 완료" });
});

// 존재하는 게시판 삭제
app.post("/api/board/delete", (req, res) => {
  console.log(req.body);
  boardList.splice(+req.body.count * 5 + +req.body.num, 1);
  res.send({ status: 200, data: "delete" });
});

//존재하는게시판 수정
app.post("/api/board/update", (req, res) => {
  boardList[+req.body.count * 5 + +req.body.num].text = req.body.text;
  boardList[+req.body.count * 5 + +req.body.num].uptime = req.body.time;
  res.send({ status: 200, data: "update" });
});

//4 게시판 5개씩 목록화
app.get("/api/board", (req, res) => {
  res.send({
    status: 200,
    list: boardList.slice(+req.query.count * 5, (+req.query.count + 1) * 5), // 0~5 => 5~10
    maxCount:
      parseInt(
        (boardList.length ? boardList.length - 1 : boardList.length) / 5
      ) + 1,
    // 조건 ? 참 : 거짓
  });
});

app.use("/api", routes);

app.listen(8080, () => {
  console.log("http://localhost:8080");
});
