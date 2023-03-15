const express = require('express')
const nunjucks = require('nunjucks')
const mysql = require('mysql2')

const app = express();

const conn = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: 'won0701',
    database: 'notice'
});

app.use(express.urlencoded({extended: true}));

app.set('view engine', 'html')
nunjucks.configure('./views', {
    express: app,
    watch: true
})

app.get('/', (req, res)=>[
    res.render('index.html')
])

app.get('/board', (req, res)=>{
    let sql = 'SELECT * FROM notice'
    conn.promise().query(sql)
        .then(([rows, fields])=> {
            res.render('board.html', {
                rows
            })
        })
})

app.get('/board/write', (req, res)=>{
    res.render('board_write.html')
})

app.post('/board/write', (req, res)=>{
    const {title, content, author} = req.body
    // console.log(req.body)
    let sql = 'INSERT INTO notice (title, content, author) VALUES (?, ?, ?)'
    conn.promise().query(sql, [title, content, author])
        .then(() => {
            res.redirect('/board')
        })
})

app.get('/board/view/:id', (req, res)=>{
    const id = req.params.id
    let sql = 'SELECT * FROM notice WHERE id=?'
    conn.promise().query(sql, [id])
        .then(([rows, fields])=>{
            res.render('board_view.html',{
                rows: rows[0],
                id
            })
        })
})

app.get('/board/update/:id', (req, res)=>{
    const id = req.params.id
    let sql = 'select * from notice where id=?'
    conn.promise().query(sql, [id])
        .then(([rows, fields])=>{
            res.render('board_update.html', {
                rows: rows[0],
                id
            })
        })
})

app.post('/board/update/:id', (req, res)=>{
    const id = req.params.id
    const {title, content, author} = req.body; 
    let sql = 'UPDATE notice SET title=?, content=?, author=? WHERE id=?'
    conn.promise().query(sql, [title, content, author, id])
        .then(()=>{
            res.redirect('/board')
        })
})

app.post('/board/delete', (req, res)=>{
    const {id} = req.body;
    let sql = 'DELETE FROM notice WHERE id=?'
    conn.promise().query(sql, [id])
        .then(()=>{
            res.redirect('/board')
        })
})


app.listen(8080, ()=>{
    console.log('server onload')
})

