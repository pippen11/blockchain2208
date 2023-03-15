require('dotenv').config()
const mysql = require('mysql2')

const host = process.env.DB_HOST || '172.19.155.232'
const user = process.env.DB_USER || 'bitkunst'
const password = process.env.DB_PASSWORD || 'won0701'
const database = process.env.DB_DATABASE || 'home'


const config = {host,user,password,database}
const pool = mysql.createPool(config)
const promisePool = pool.promise()
// async function test(){
//     let [result,fields] = await promisePool.execute('select * from user where userid=?',['admin'])
//     console.log(result,fields)
// }
// test()
exports.pool = promisePool
