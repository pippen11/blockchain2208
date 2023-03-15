const express = require('express')
const nunjucks = require('nunjucks')
const mysql = require('mysql')
const app = express();

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'won0701',
    database: 'notice'
})

app.use(express.urlencoded({extended: true}))

app.set('view engine', 'html')
nunjucks.configure('./views', {
    express: app,
    watch: true
})


function queryPromise(query) {
    return new Promise((resolve, reject)=>{
        conn.query(query, (err, rows, fields)=>{
            resolve(rows)
        })
    }) 
}

app.get('/', async (req, res)=>{

    const rows = await queryPromise("SELECT * FROM notice")
    const result = [...rows]
    res.send(result)
})

app.get('/list',(req, res)=>{
    queryPromise("SELECT * FROM notice")
        .then((data)=>res.send(data))
}) 

app.get('/board', (req, res)=>{
    let sql = "SELECT * FROM notice"
    conn.query(sql, (err, rows, fields)=>{
        res.send(rows)
    })
})

app.listen(3000, ()=>{
    console.log("server onload")
})