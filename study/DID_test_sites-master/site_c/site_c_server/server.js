require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();
const router = require("./routers");

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.listen(4003, async () => {
  try {
    // DB 연결
    // const connection = await mongoose
    //   .createConnection(
    //     `mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@127.0.0.1:27017/siteA`
    //   )
    //   .asPromise();
    // if (connection.readyState === 1)
    //   console.log("Successfully connected to MongoDB");
    mongoose.connect(
      `mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@127.0.0.1:27017/siteC`
    );
    mongoose.connection.on("connected", () => {
      console.log("Successfully connected to MongoDB");
    });
    console.log("site C back server #port : 4003");
  } catch (err) {
    console.log(err);
  }
});
