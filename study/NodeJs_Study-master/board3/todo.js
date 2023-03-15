module.exports = function (app) {
    const express = require('express')
    const nunjucks = require('nunjucks')
    const mysql = require('mysql2')
    const route = express.Router()

    app.use(express.urlencoded({extended: true}));

    app.set('view engine', 'html')
    nunjucks.configure('./views', {
        express: app,
        watch: true
    })

    const conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'won0701',
        database: 'notice'
    })

    route.get('/list', async (req, res)=>{
        let sql = "SELECT * FROM todo"
        const [rows, fields] = await conn.promise().query(sql)
        res.render('todo_list.html', {
            rows
        })
    })
    
    route.get('/write', (req, res)=>{
        res.render('todo_write.html')
    })    

    route.post('/write', async (req, res)=>{
        const {content, date} = req.body
        let sql = "INSERT INTO todo (content, date) VALUES (?, ?)"
        await conn.promise().query(sql, [content, date])
        res.redirect('/todo/list')
    })

    route.get('/update/:id', async (req, res)=>{
        const id = req.params.id;
        let sql = "SELECT * FROM todo WHERE id=?"
        const [rows, fields] = await conn.promise().query(sql, [id])
        res.render('todo_update.html', {
            rows: rows[0],
            id
        })
    })

    route.post('/update/:id', async (req, res)=>{
        const id = req.params.id;
        const {content, date} = req.body;
        let sql = "UPDATE todo SET content=?, date=? WHERE id=?";
        await conn.promise().query(sql, [content, date, id])
        res.redirect('/todo/list')
    })

    route.post('/list/:id', async (req, res)=>{
        const id = req.params.id;
        let sql = "DELETE FROM todo WHERE id=?"
        await conn.promise().query(sql, [id])
        res.redirect('/todo/list')
    })


    return route
}