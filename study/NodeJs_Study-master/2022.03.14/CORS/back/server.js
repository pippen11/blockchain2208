const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { createToken } = require('./utils/jwt')
const pool = require('./db').pool
const app = express()
const { Auth } = require('./middlewares/auth2')

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

app.get('/',(req,res)=>{
    console.log(req.user)
    res.setHeader('Set-cookie','name=ingoo; Domain=localhost;')
    res.send('123123')
})
// POST http://localhost:4001/api/user/join
app.post('/api/user/join',async (req,res)=>{
    console.log(req.body) // req.body 
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
    } catch (e){
        console.log(e.message)
        const response = {
            result:{
                row:0,
                id:0
            },
            errno:1,
        }
        
        res.json(response)  
    }
})

app.post('/api/user/login', async (req,res)=>{
    const {userid,userpw} = req.body

    const sql = `SELECT userid,name,nickname,userlevel FROM user WHERE userid=? and userpw=?`
    const prepare = [userid,userpw]

    try {
        const [result] = await pool.execute(sql,prepare)
        
        // result 값이 
        // 아이디와 패스워드가 일치한 값이 존재한다면, 배열안에 요소가 존재할것이고,
        // 없다면 배열안에 요소가없습니다 = [] 
        if (result.length <= 0) throw new Error('회원이없음')

        const jwt = createToken( result[0] )
        console.log(jwt)

        res.cookie('token',jwt,{
            path:'/',
            httpOnly:true,
            domain:'localhost'
        })

        const response = {
            result,
            errno:0,
        }

        res.json(response)
    } catch (e) {
        const response = {
            result:[],
            errno:1,
        }

        res.json(response)
    }
})


app.post('/api/auth',(req,res)=>{    
    const {token} = req.body
    // ... token 인증 코드..
    if (token) {
        res.send('true')
    } else {
        res.send('false')
    }
})

app.post('/api/board/write',async (req,res)=>{
    const {subject,content} = req.body
    const { nickname } = req.user

    const sql = `INSERT INTO board(subject,content,nickname) values(?,?,?)`
    const prepare = [subject,content,nickname]
    let response = {
        errno:0
    }
    try{
        const [result] = await pool.execute(sql,prepare)
        response = {
            ...response,
            result:{
                affectedRows:result.affectedRows,
                insertId:result.insertId
            }
        }
    } catch (e) {
        console.log(e.message)
        response = {
            errno:1
        }
    }
    
	res.json(response)
})

app.post('/api/board/view/:idx', async (req,res)=>{
    const {idx} = req.params
    const sql = `SELECT * FROM board WHERE idx=?`
    const prepare = [idx]
    let response = {
        errno:0
    }
    try {
        const [result] = await pool.execute(sql,prepare)
        response = {
            ...response,
            result
        }
    } catch (e) {
        console.log(e.message)
        response = {
            errno:1
        }
    }

    res.json(response)
})

app.post('/api/board/list', async (req, res) => {
    const sql = `SELECT idx, 
                        subject, 
                        nickname, 
                        DATE_FORMAT(date, '%Y-%m-%d') AS date, 
                        hit 
                 FROM board 
                 ORDER BY idx DESC`

    const sql2 = `SELECT count(idx) AS total_record FROM board`

    let response = {
        errno: 1
    }

    try {
        const [rows,] = await pool.execute(sql)
        // console.log(rows)
        const [[{total_record}]] = await pool.execute(sql2)
        response = {
            ...response,
            total_record,
            errno: 0,
            result: rows
        }
    } catch(err) {
        console.log(err.message)
    }

    res.json(response)
})

app.listen(4001,()=>{
    console.log(`server 시작`)
})
