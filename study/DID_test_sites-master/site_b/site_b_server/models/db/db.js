require('dotenv').config();
const mysql = require('mysql2');

const host = process.env.DB_HOST || '127.0.0.1';
const user = process.env.DB_USER || 'ingoo';
const password = process.env.DB_PASSWORD || 'ingoo';
const database = process.env.DB_DATABASE || 'DID';
const timezone = '+00:00';

const config = { host, user, password, database, timezone };
const pool = mysql.createPool(config);
const promisePool = pool.promise();

exports.pool = promisePool;
