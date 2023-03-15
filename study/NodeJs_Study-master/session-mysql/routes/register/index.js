const { command } = require('commander')
const express = require('express')
const router = express.Router()
const mysql = require('mysql2')
const {alertMove} = require('../../util/alert.js')

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'won0701',
    database: 'session_mysql'
})


router.get('/on', (req,res)=>{
    res.render('./register/register.html')
})

router.post('/on', async (req,res)=>{
    const {userid, userpw, username} = req.body
    let sql = "INSERT INTO user (userid, userpw, username) VALUES (?, ?, ?)"
    await conn.promise().query(sql, [userid, userpw, username])
    res.send(alertMove('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.', '/user/login'))
})


module.exports = router