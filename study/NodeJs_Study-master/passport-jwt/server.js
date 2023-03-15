require('dotenv').config()
const express = require('express')
const nunjucks = require('nunjucks')
const cookieParser = require('cookie-parser')
const {promisePool} = require('./db.js')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const {alertMove} = require('./alert.js')
const {passportConfig, auth} = require('./passport.js')
const app = express()

app.set('view engine', 'html')
nunjucks.configure('./views', {
    express: app,
    watch: true
})
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())
app.use(passport.initialize())
passportConfig(passport)

app.get('/', (req, res)=>{
    res.render('index.html')
})

app.get('/user/login', (req, res)=>{
    res.render('login.html')
})

app.post('/user/login', async (req, res)=>{
    const {userid, userpw} = req.body
    const sql = "SELECT * FROM user WHERE userid=?"
    const prepare = [userid]

    try {
        const [rows] = await promisePool.query(sql, prepare)
        const password = rows[0].userpw
        if (userpw == password) {
            const {nickname} = rows[0]
    
            const payload = {
                userid,
                nickname
            }
            const secretKey = process.env.secretKey
            const opt = {
                algorithm: 'HS256'
            }
            const token = jwt.sign(payload, secretKey, opt)
            // const jwt_token = "Bearer "+token
            res.cookie("jwt", token, {
                path: '/',
                httpOnly: true,
                domain: 'localhost'
            })
            res.redirect('/')
        } else {
            throw new Error('비밀번호 불일치')
        }
    } catch(err) {
        console.log(err.message)
        res.send('비밀번호 오류')
    }
})

// const auth = (req, res, next)=>{
//     passport.authenticate('jwt', {session: false}, (err, user, info)=>{
//         if (err) {
//             return next(err)
//         }
//         if (!user) {
//             console.log(info)
//             return res.send(info.message)
//             // return res.send(alertMove('로그인 후 이용', '/user/login'))
//         }
//         req.user = user
//         return next()
//     })(req, res, next)
// }

// passport.authenticate('jwt', {session: false})

app.get('/board/list', auth, (req, res)=>{
    
    const {user} = req
    console.log(user)
    // console.log(info.message)
    res.render('board.html', {
        user
    })
})

app.get('/board/view', auth, (req, res)=>{
    console.log(req.user)
    res.send('hi')
})

app.get('/board/update', auth, (req, res)=>{
    console.log(req.user)
})

app.listen(3000, ()=>{
    console.log('server onload')
})