const express = require('express');
const nunjucks = require('nunjucks');
const mysql = require('mysql2');
const { title } = require('process');
const app = express()

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'won0701',
    database: 'notice'
})


app.use(express.urlencoded({extended: true}));

app.set('view engine', 'html');
nunjucks.configure('./views', {
    express: app,
    watch: true
})

app.get('/', (req, res)=>{
    res.render("index.html")
})

app.get('/board', async (req, res)=>{
    try {
        let sql = 'SELECT * FROM notice'
        const [rows, fields] = await conn.promise().query(sql)
        res.render('board.html', {
            data: rows
        })        
    } catch {
        res.send("Internal Server Error")
    }
})

app.get('/board/write', (req, res)=>{
    res.render('board_write.html')
})

app.post('/board/write', async (req, res)=>{
    try {
        const {title, content, author} = req.body
        let sql = 'INSERT INTO notice (title, content, author) VALUES (?, ?, ?)'
        await conn.promise().query(sql, [title, content, author])  // 질문
        res.redirect('/board')
    } catch {
        res.send("Internal Server Error")
    }
})

app.get('/board/view/:id', async (req, res)=>{
    try{
        let id = req.params.id
        let sql = "SELECT * FROM notice WHERE id=?"
        const [rows, fields] = await conn.promise().query(sql, [id])
        res.render('board_view.html',{
            data: rows[0],
            id: id
        })
    } catch {
        res.send("Internal Server Error")
    }
})

app.get('/board/update/:id', async (req, res)=>{
    try {
        let id = req.params.id
        let sql = "SELECT * FROM notice WHERE id=?"
        const[rows, fields] = await conn.promise().query(sql, [id])
        res.render('board_update.html', {
            data: rows[0],
            id: id
        })
    } catch {
        res.send("Internal Server Error")
    }
})

app.post('/board/update/:id', async (req, res)=>{
    try {
        let id = req.params.id
        const {title, content, author} = req.body
        let sql = "UPDATE notice SET title=?, content=?, author=? WHERE id=?"
        await conn.promise().query(sql, [title, content, author, id])
        res.redirect('/board')
    } catch {
        res.send('Internal Server Error')
    }
})

app.post('/board/delete', async (req, res)=>{
    try{
        const {id} = req.body
        // console.log(id)
        let sql = "DELETE FROM notice WHERE id=?"
        await conn.promise().query(sql, [id])
        res.redirect('/board')
    } catch {
        res.send("Internal Server Error")
    }
})

app.listen(3000, ()=>{
    console.log("server onload")
})