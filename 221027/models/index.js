"use strict";

const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

const Newtalble1 = require("./table1.js");

const db = { Newtalble1 };

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//Sequelize는 대문자는 라이브러리 자체고 소문자는 결과값

Newtalble1.init(sequelize);
Newtalble1.associate(db);

module.exports = db;

//그냥외우면됨
