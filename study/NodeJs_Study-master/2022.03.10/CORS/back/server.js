const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const {createToken} = require('./utils/jwt.js') 
const pool = require('./db').pool
const { Auth } = require('./middlewares/auth2.js')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true,}))
app.use(cookieParser()) 
app.use(cors({
    origin:true,
    credentials:true,
})) // http://localhost:3001
app.use(Auth)
// res.setHeader('Access-Control-Allow-Origin','*')
// res.setHeader('Access-Control-Allow-Methods','POST, GET, OPTIONS, DELETE') // methods 사용여부
// res.setHeader('Access-Control-Allow-Credentials','true')
// res.setHeader('Access-Control-Allow-Headers','Content-type')

app.post('/',(req,res)=>{
    console.log(req.user)
    res.setHeader('Set-cookie','name=ingoo; Domain=localhost;')
    res.send('123123')
})
// POST http://localhost:4001/api/user/join
app.post('/api/user/join',async (req,res)=>{
    // console.log(req.body) // req.body 
    const {userid,userpw,name,nickname,birth,gender,phone,mobile} = req.body
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
                ) values(
                    ?,?,?,?,?,now(),'1',?,?
                )`
    const prepare = [1,userid,userpw,name,nickname,phone,mobile]

    try {
        const [result] = await pool.execute(sql,prepare) // 1. SQL:string , 2. prepare:array
        // DB에다가 해당 SQL을 던져서 요청을보내고.
        // DB가 그 해당 SQL을 실행을해서 결과물을 result라는 변수에 다가 준거에요.
        // console.log(result)

        const response = {
            result:{
                row:result.affectedRows,
                id:result.insertId
            },
            errno:0,
        }
    
        res.setHeader('Set-cookie','name=ingoo; path=/; Domain=localhost;')
        res.cookie('name2','ingoo2',{
            path:'/',
            httpOnly:true,
            secure:true,
            domain:'localhost'
        })
        res.json(response) 

    } catch (err) {
        console.log(err.message)
        const response = {
            result:{
                row: 0,
                id: 0
            },
            errno:1,
        }
        res.json(response)
    }
})

app.post('/api/user/login', async (req, res)=>{
    const {userid, userpw} = req.body
    
    const sql = `SELECT userid, name, nickname, userlevel FROM user WHERE userid=? AND userpw=?`
    const prepare = [userid, userpw]

    try {
        const [rows] = await pool.execute(sql, prepare)

        // 아이디와 패스워드가 일치하는 값이 존재한다면, 배열 안에 요소가 존재할 것이고
        // 없다면 배열 안에 요소가 없습니다. = []
        if (rows.length <= 0) throw new Error('회원이 없음')
        
        // token을 만들고
        const jwt = createToken( {...rows[0]} )
        console.log(jwt)

        res.cookie('token', jwt, {
            path: '/',
            httpOnly: true,
            domain: 'localhost'
        })
        console.log(rows)
        const response = {
            result: rows,
            errno: 0
        }

        res.json(response)
    } catch (err) {
        const response = {
            result: [],
            errno: 1
        }

        res.json(response)
    }
})

app.post('/api/auth', (req, res)=>{
    const {token} = req.body
    // ... token 인증코드
    if (token) {
        res.send('true')
    } else {
        res.send('false')
    }
})

app.post('/api/board/write', async (req, res)=>{
    const {subject, content} = req.body
    const {nickname} = req.user

    const sql = `INSERT INTO board (subject, content, nickname) VALUES (?,?,?)`
    const prepare = [subject, content, nickname]
    let response = {
        errno: 0
    }
    try {
        const [rows] = await pool.execute(sql, prepare)
        response = {
            ...response,
            result: {
                affectedRows: rows.affectedRows,
                insertId: rows.insertId
            }
        }
    } catch(err) {
        console.log(err.message)
        response = {
            errno: 1
        }
    }

    res.json(response)
})

app.listen(4001,()=>{
    console.log(`back server 시작`)
})
// 
// /home/ingoo/workspace/220307/cors/back/SQL/table.sql