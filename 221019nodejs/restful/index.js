const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

app.set("port", process.env.PORT || 8080);

app.use((req, res, next) => {
  if (process.env.NODE_ENV === "production") morgan("combined")(req, res, next);
  else morgan("dev")(req, res, next);
});

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(express.json());

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: "session-cookie",
  })
);

app.use((req, res, next) => {
  console.log(req.body);
  next();
  //next->다음걸로 넘어가라 이게끝나면 다음걸로 넘어가게된다
});

app.post("/*", (req, res, next) => {
  //받는라우터
  res.cookie("name", req.body.name);
  //쿠키를 추가한다.
  next();
});

app.post("/api/user", (req, res) => {
  //받는라우터
  res.cookie("name", req.body.name);
  //쿠키를 추가한다.
  res.end("정보를 추가했다.");
});

app.listen(app.get("port"), () => {
  console.log("서버");
});
