const express = require('express')
const router = express.Router()
const mysql = require('mysql2')
const { title } = require('process')
const {alertMove} = require('../../util/alert.js')
const {dateParser} = require('../../util/dateParser.js')
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'won0701',
    database: 'session_mysql'
})

const Auth = async (req, res, next) => {
    const boardId = req.query.id;
    const userId = req.params.id;
    let sql1 = "SELECT * FROM user WHERE id=?"
    const [rows, fields] = await conn.promise().query(sql1, [userId])
    const username = rows[0].username;
    let sql2 = "SELECT * FROM board WHERE id=?"
    const [rows2, fields2] = await conn.promise().query(sql2, [boardId])
    const author = rows2[0].author;
    if (username == author) {
        next()
    } else {
        res.send(alertMove('권한이 없습니다.', `/board/list/${userId}`))
    }
}

router.get('/list/:id', async (req, res)=>{
    const userId = req.params.id;
    let sql = 'SELECT * FROM board'
    const [rows, fields] = await conn.promise().query(sql)
    for (let i=0; i<rows.length; i++) {
        rows[i].date = dateParser(rows[i].created)
    }
    let userQuery = "SELECT * FROM user WHERE id=?"
    const [rows2, fields2] = await conn.promise().query(userQuery, [userId])
    const username = rows2[0].username;
    res.render('./board/board_list.html', {
        userId,
        rows,
        username
    })
})

router.get('/view/:id', async (req, res)=>{
    const userId = req.params.id;
    const boardId = req.query.id
    let sql = "SELECT * FROM board WHERE id=?"
    const [rows, fields] = await conn.promise().query(sql, [boardId])
    const date = dateParser(rows[0].created)
    res.render('./board/board_view.html', {
        data: rows[0],
        date,
        userId
    })
})

router.get('/write/:id', (req, res) => {
    const userId = req.params.id;
    res.render('./board/board_write.html', {
        userId
    })
})

router.post('/write/:id', async (req, res)=>{
    const {title, content} = req.body;
    const userId = req.params.id;
    let userQuery = "SELECT * FROM user WHERE id=?"
    const [rows, fields] = await conn.promise().query(userQuery, [userId])
    let username = rows[0].username
    let sql = "INSERT INTO board (title, content, author) VALUES (?, ?, ?)"
    await conn.promise().query(sql, [title, content, username]);
    res.send(alertMove('글작성이 완료되었습니다.', `/board/list/${userId}`))
})

router.get('/update/:id', Auth ,async (req, res)=>{
    const userId = req.params.id;
    const boardId = req.query.id;
    // console.log(boardId)
    let sql = "SELECT * FROM board WHERE id=?"
    const [rows, fields] = await conn.promise().query(sql, [boardId])
    res.render('./board/board_update.html', {
        data: rows[0],
        userId,
        boardId
    })
})

// const Auth = async (req, res, next) => {
//     const boardId = req.query.id;
//     const userId = req.params.id;
//     let sql1 = "SELECT * FROM user WHERE id=?"
//     const [rows, fields] = await conn.promise().query(sql1, [userId])
//     const username = rows[0].username;
//     let sql2 = "SELECT * FROM board WHERE id=?"
//     const [rows2, fields2] = await conn.promise().query(sql2, [boardId])
//     const author = rows2[0].author;
//     if (username == author) {
//         next()
//     } else {
//         res.send(alertMove('권한이 없습니다.', `/board/list/${userId}`))
//     }
// }

router.post('/update/:id', async (req, res)=>{
    const {title, content} = req.body;
    const userId = req.params.id;
    const boardId = req.query.id;
    let sql = 'UPDATE board SET title=?, content=? WHERE id=?'
    await conn.promise().query(sql, [title, content, boardId])
    res.send(alertMove('글수정이 완료되었습니다.', `/board/list/${userId}`))
})

router.post('/delete/:id', Auth ,async (req, res)=>{
    const userId = req.params.id;
    const boardId = req.query.id;
    let sql = 'DELETE FROM board WHERE id=?'
    await conn.promise().query(sql, [boardId])
    res.send(alertMove('글이 삭제되었습니다.', `/board/list/${userId}`))
})

module.exports = router