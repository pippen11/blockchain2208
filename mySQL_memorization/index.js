// cmd : npx sequelize init

const dotenv = require("dotenv");

const db = require("./models/index.js");

dotenv.config();

db.sequelize
  .sync({ force: false })
  //force: true도 됨 true하면 mysql에 데이터를 덮어버림 false는 받아옴?
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.error(err);
  });
