require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const Block = require('./block')(sequelize, DataTypes);
const Transaction = require('./transaction')(sequelize, DataTypes);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Block = Block;
db.Transaction = Transaction;

module.exports = db;
