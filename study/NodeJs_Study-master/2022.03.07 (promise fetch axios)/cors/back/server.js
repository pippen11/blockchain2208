const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const {pool} = require('./db.js')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(cors({
    origin: true,
    credentials: true
}))  // http://localhost:3001
// app.use((req, res, next)=>{
//     res.setHeader('Access-Control-Allow-Origin', '*')    
//     res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE')
//     res.setHeader('Access-Control-Allow-Credentials', 'true')
//     res.setHeader('Access-Control-Allow-Headers', 'Content-type')
//     next()
// })

app.post('/', (req, res)=>{
    // http://localhost:3001 에서의 요청을 허용한다.
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001')
    // res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE')
    // res.setHeader('Access-Control-Allow-Credentials', 'true')
    // res.setHeader('Access-Control-Allow-Headers', 'Content-type')

    console.log(req.body)

    res.setHeader('Set-Cookie', 'name=ingoo; Domain=localhost;')
    res.send('123123')
})

app.post('/api/user/join', async (req, res)=>{
    try {
        const {userid, userpw, name, nickname, birth, gender, phone, mobile} = req.body
        // const sql = "INSERT INTO user (userlevel, userid, userpw, name, nickname, birth, gender, phone, mobile) VALUES (1,?,?,?,?,?,?,?,?)"
        const sql = `INSERT INTO user(
            userlevel,
            userid,
            userpw,
            name,
            nickname,
            birth,
            gender,
            phone,
            mobile
        ) VALUES (
            ?,?,?,?,?,now(),'M',?,?
        )`
        const prepare = [1, userid, userpw, name, nickname, phone, mobile]
        const [rows] = await pool.execute(sql, prepare)  // SQL: string , 2.prepare: array
        console.log(rows)
        // await pool.execute(sql, [userid, userpw, name, nickname, birth, gender, phone, mobile])  
        // const user = {
        //     userid,
        //     userpw,
        //     name,
        //     nickname,
        //     birth,
        //     gender,
        //     phone,
        //     mobile
        // }  
        const response = {
            result:{
                row: rows.affectedRows,
                id: rows.insertId
            },
            errno: 0
        }
        // response: Object
        // 통신을 할 때는 string으로만 가능합니다.
        res.setHeader('Set-Cookie', 'name=ingoo; path=/; Domain=localhost;')
        res.cookie('name2', 'ingoo2', {
            path: '/',
            httpOnly: true,
            secure: true,
            domain: 'localhost'
        })
        res.json(response)  // == res.send(JSON.stringify(response))
    } catch (err) {
        console.log(err)
        res.status(500).send('Error 발생')
    }
})

app.listen(4001, ()=>{
    console.log('back server onload')
})