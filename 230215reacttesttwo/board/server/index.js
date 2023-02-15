const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");
const db = require("./models");
const routes = require("./routes");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use("/", express.static(path.join(__dirname, "build")));
// build폴더로 경로 설정
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
// console.log(process.env.COOKIE_SECRET);
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: "seed",
  })
);
app.use("/api", routes);

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.error(err);
  });

// app.use("/api", routes);

app.listen(8080, () => {
  console.log(8080, "server start");
});
