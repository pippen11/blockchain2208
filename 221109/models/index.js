"use strict";

const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

const BookInfo = require("./bookInfo.js");
//bookInfo쓰기위한것

const db = { BookInfo };
//bookInfo쓰기위한것

let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

BookInfo.init(sequelize);
//bookInfo쓰기위한것

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
