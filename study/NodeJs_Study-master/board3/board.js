
module.exports = function(app) {
    const express = require('express')
    const mysql = require('mysql2')
    const nunjucks = require('nunjucks')
    const route = express.Router();


    app.use(express.urlencoded({extended: true}))
    app.set('view engine', 'html')
    nunjucks.configure('./views', {
        express: app,
        watch: true
    })

    const conn = mysql.createConnection({
        host:'localhost',
        user: 'root',
        password: 'won0701',
        database: 'notice'
    })

    route.get('/list', async (req, res)=>{
        let sql = 'SELECT * FROM notice'
        const [rows, fields] = await conn.promise().query(sql)
        res.render('board_list.html', {
            rows: rows
        })
    })

    route.get('/write', (req, res)=>{
        res.render('board_write.html')
    })

    route.post('/write', async (req, res)=>{
        const {title, content, author} = req.body
        let sql = "INSERT INTO notice (title, content, author) VALUES (?,?,?)"
        await conn.promise().query(sql, [title,content,author])
        res.redirect('/board/list')
    })

    route.get('/view/:id', async (req, res)=>{
        const id = req.params.id;
        let sql = "SELECT * FROM notice WHERE id=?"
        const [rows, fields] = await conn.promise().query(sql, [id])
        res.render('board_view.html', {
            rows: rows[0],
            id
        })

    })

    route.get('/update/:id', async (req, res)=>{
        const id = req.params.id;
        let sql = "SELECT * FROM notice WHERE id=?"
        const [rows, fields] = await conn.promise().query(sql, [id])
        res.render('board_update.html', {
            rows: rows[0],
            id
        })
    })

    route.post('/update/:id', async (req, res)=>{
        const id = req.params.id;
        const {title, content, author} = req.body;
        let sql = "UPDATE notice SET title=?, content=?, author=? WHERE id=?"
        await conn.promise().query(sql, [title, content, author, id])
        res.redirect('/board/list')
    })

    route.post('/delete/:id', async (req, res)=>{
        const id = req.params.id;
        let sql = "DELETE FROM notice WHERE id=?"
        await conn.promise().query(sql, [id])
        res.redirect('/board/list')
    })    

    return route;
}