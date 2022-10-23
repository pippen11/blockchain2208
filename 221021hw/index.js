const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const path = require("path");
const e = require("express");

// const boardList = [];

dotenv.config();

const app = express();

app.use((req, res, next) => {
  if (process.env.NODE_ENV === "production") morgan("combined")(req, res, next);
  else morgan("dev")(req, res, next);
});

app.use(express.json());

app.use("/", express.static(path.join(__dirname, "web")));

app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(express.urlencoded({ extended: false }));

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

app.post("/api/board/add", (req, res) => {
  // boardList.unshift(req.body);
  // console.log(req.body);

  const users = {
    id: [e.target["main-id"].value],
    pw: [e.target["main-pw"].value],
  };

  if (users.id == req.body.id || users.pw == req.body.pw) {
    res.send({ status: 200, data: "정상입력" });
  }

  // console.log(id);

  // res.send({ status: 200, data: "정상입력" });
});

app.listen(8080, () => {
  console.log("서버열음");
});
