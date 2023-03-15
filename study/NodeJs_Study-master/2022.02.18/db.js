require('dotenv').config() // .env 파일 내용 가져오기
const mysql = require('mysql')

const host = process.env.DB_HOST || 'localhost'
const user = process.env.DB_USER || 'bitkunst'
const password = process.env.DB_PASSWORD || 'won0701'
const database = process.env.DB_DATABASE || 'example'

const config = { host, user, password, database }

const pool = mysql.createPool(config)

// pool.getConnection((err, conn)=>{
//     // 2개의 인자값
//     // sql, ()={ } callback
//     conn.query('select * from board', (err, result)=>{
//         console.log(result)
//     })
// })

// const getConnection = (cb) => {
//     pool.getConnection((err, conn)=>{
//         cb(conn)
//     })
// }

// getConnection( conn => {
//     conn.query('select * from board', (err, result)=>{
//         console.log(result)
//     })
// })

module.exports = pool

