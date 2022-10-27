const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");

const db = require("./models/index.js");

dotenv.config();

const app = express();

app.use((req, res) => {
  if (process.env.NODE_ENV === "production") morgan("combined")(req, res, next);
  else morgan("dev")(req, res, next);
});

app.use("/", express.static(path.join(__dirname, "public")));

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
    name: "cookie-session",
  })
);

db.sequelize
  .sync({ force: true }) // DB 서버와 연결한다, force는 설정된 테이블을 강제로 생성한다.(false적으면 강제로 생성안하겠다)
  //우리가 express 서버에서 설정한 테이블 데이터와 실제 DB 서버의 데이터가 다를경우에 서버의 테이블을 새로 생성하기 위해 사용한다.
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err);
  });

// db.Newtalble1.create({ idx: 11, new_table1col: "sasdfkl" });
//테이블에 데이터 추가 // 이름 값 등

//select
// [].find
// db.Newtalble1.findOne({ where: { idx: 1 } })
//   .then((data) => console.log(data))
//   .catch((err) => {
//     console.log(err);
//   });

app.listen(8080, () => {
  console.log("서버열음");
});
