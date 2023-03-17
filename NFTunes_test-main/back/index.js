const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes/index");
const mongoose = require("mongoose");

require("dotenv").config();
const PORT = process.env.PORT || 4000;
const MONGODB_PW = process.env.MONGODB_PW;

const mongoAtlasUrl = `mongodb+srv://team1:${MONGODB_PW}@nftmarket.skj99nw.mongodb.net/nftMarket?retryWrites=true&w=majority`;

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);
app.use(express.static("public"));

mongoose
  .connect(mongoAtlasUrl)
  .then((client) => {
    console.log(
      ` connected to mongo atlas db : ${client.connections[0].name} `
    );
  })
  .then(
    app.listen(PORT, () => {
      console.log(`server's running on ${PORT} 🚀`);
    })
  )
  .catch((err) => console.log(err));
