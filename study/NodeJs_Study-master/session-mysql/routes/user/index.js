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


router.get('/login', (req, res)=>{
    res.render('./user/login.html')
})

router.post('/login', async (req,res)=>{
    const {userid, userpw} = req.body
    let sql = "SELECT * FROM user WHERE userid=? AND userpw=?"
    const [rows, fields] = await conn.promise().query(sql, [userid, userpw])
    // console.log(rows)
    if (rows[0] != undefined) {
        req.session.user = rows[0]
        res.redirect('/')
    } else {
        res.send(alertMove('사용자 정보가 없습니다.', '/user/login'))
    }
})

router.get('/logout', (req, res)=>{
    req.session.destroy(()=>{
        req.session
    })
    res.send(alertMove('로그아웃 되었습니다.', '/'))
})

router.get('/profile/:id', async (req, res)=>{
    const id = req.params.id
    let sql = "SELECT * FROM user WHERE id=?"
    const [rows, fields] = await conn.promise().query(sql, [id])
    res.render('./profile/profile.html', {
        user: rows[0]
    })
})

router.post('/profile/:id', async (req, res)=>{
    const id = req.params.id;
    const {userpw, username} = req.body;
    let sql = "UPDATE user SET userpw=?, username=? WHERE id=?"
    await conn.promise().query(sql, [userpw, username, id])
    req.session.destroy(()=>{
        req.session
    })
    res.send(alertMove('회원정보가 수정되었습니다. 다시 로그인 해주세요.', '/user/login'))
})

router.post('/delete/:id', async(req, res)=>{
    const id = req.params.id;
    let sql = "DELETE FROM user WHERE id=?"
    await conn.promise().query(sql, [id])
    req.session.destroy(()=>{
        res.session
    })
    res.send(alertMove('회원탈퇴가 완료되었습니다.', '/'))
})

module.exports = router