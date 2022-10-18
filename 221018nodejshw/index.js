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

app.use("/", express.static(path.join(__dirname, "hw/220915hw")));

app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(express.urlencoded({ exteneded: false }));

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

app.listen(app.get("port"), () => {
  console.log("서버열었다.");
});
