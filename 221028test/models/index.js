"use strict";

const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

const Table = require("./.table.js");

// const User = require("./user.js");
// const Board = require("./board.js");
// const Comment = require("./comment.js");

const db = {};
// const db = { User, Board, Comment };

let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

Table.init(sequelize);

Table.associate(sequelize);

// User.init(sequelize);
// Board.init(sequelize);
// Comment.init(sequelize);

module.exports = db;
