"use strict";

const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

const User_Info = require("./join.js");
const BookInfo = require("./bookInfo.js");
const db = { User_Info, BookInfo };

let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

User_Info.init(sequelize);
BookInfo.init(sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
