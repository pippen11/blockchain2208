const express = require('express')
const nunjucks = require('nunjucks')
const cookieParser = require('cookie-parser')
const {user} = require('./models/user.js')
const {createToken} = require('./utils/jwt.js')
const {auth} = require('./middlewares/auth.js')
const app = express()
const {cookieAuth} = require('./middlewares/test.js')


app.set('view engine', 'html')
nunjucks.configure('./views', {
    express: app,
    watch: true
})

app.use(express.urlencoded({extended: true}))
// http body 영역을 해석해주는 아이
// Content-type: application/x-www-form-urlencoded

app.use(cookieParser())
app.use(auth)

app.get('/', (req, res)=>{
    console.log(req.cookies)
    res.send('hello server11')
})

app.get('/user', (req, res)=>{
    res.render('index.html')
})

app.get('/login', (req, res)=>{
    res.render('login.html')
})

app.post('/login', (req, res)=>{
    const {userid, userpw} = req.body;
    const [ item ] = user.filter(v => v.userid == userid && v.userpw == userpw)
    // try에는 성공에 대한 부분, catch에는 실패에 대한 부분
    try {
        // throw new Error('그냥 넌 아무이유없이 에러야,,')  // 사용자가 임의로 에러를 만들수도 있다.
        if (item === undefined) throw new Error('너는 아이디가 존재하지 않아.')
        // 로그인에 대한 처리부분
        // 1. JWT 토큰 생성        
        //      JWT 토큰을 생성하기 위해서 필요한 값이 무엇일까? -> payload에 해당되는 값, Object
        const payload = {
            userid: item.userid,
            username: item.username,
            level: 1
        }
        //      JWT 토큰을 만드는 함수를 만들자.
        const token = createToken(payload)
        console.log(token)
        // 2. 생성한 토큰을 쿠키로 만들어서 보내주어야 한다. 
        // res.setHeader('Set-Cookie', `AccessToken=${token}; HttpOnly; Secure; Path=/;`)
        res.cookie('AccessToken', token, {
            path: '/',
            HttpOnly: true,
        })
        res.cookie('temp', 'null', {
            path: '/',
            HttpOnly: true
        })
        res.redirect('/')
    } catch (err) {
        console.log(err)
        res.send('실패')
    }
    // res.status(200).send('도착~')   // 강태라는 것은 꼭 필요한 것이다. 적어주지 않으면 200이 생략되어 있는 것
    // request message HTTP
    // response message HTTP 200 OK http/1.1
})

app.get('/admin', cookieAuth, (req, res)=>{
    try {
        const {user} = req
        console.log(req.user)
        if (req.user == undefined) throw new Error('로그인 안됨')
        // res.send('하하하하하하하하 성공했지롱~')
        res.render('./user_home.html',{
            user
        })
    } catch(err) {
        res.send('로그인하고 오세요~')
    }
})

app.get('/logout', (req, res)=>{
    res.clearCookie('AccessToken', {path: '/'})
    res.redirect('/')
})

app.listen(3000, ()=>{
    console.log('server onload')
})