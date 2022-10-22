const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const path = require("path");

dotenv.config();

const app = express();

// app.set("port", process.env.PORT || 8080);

app.use((req, res, next) => {
  if (process.env.NODE_ENV === "production") morgan("combined")(req, res, next);
  else morgan("dev")(req, res, next);
});

app.use(express.json());

app.use("/", express.static(path.join(__dirname, "web")));
//경로확인 제대로 하기 add안에있으면 add/web임

app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    resave: false,
    saveUninitaialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: "session",
  })
);

app.listen(8081, () => {
  console.log("서버열음");
});
