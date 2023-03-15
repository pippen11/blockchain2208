/* Connection Pool 샘플코드 */

require('dotenv').config()
let host = process.env.DB_HOST
let user = process.env.DB_USER
let password = process.env.DB_PASSWORD
let database = process.env.DB_DATABASE

const mysql = require('mysql')
const pool = mysql.createPool({
    host,
    user,
    password,
    database,
    connectionLimit: 5  // 커넥션 풀에 몇개의 커넥션을 가지게끔 할 것인지.
})

pool.getConnection((error, connection)=>{  // getConnection -> 커넥션 풀에서 커넥션 가져오기
    connection.query('SELECT * FROM user', (error, result, fields)=>{
        if (!error) {
            // result
            console.log(result)
            connection.release()  // 커넥션 풀에 커넥션 반환
        } else {
            throw error
        }
    })
})

// DB서버가 몇개의 커넥션을 가질 수 있는지가 커넥션 풀에서는 관건이다.