const express = require('express')
const nunjucks = require('nunjucks')
const { user } = require('./models/user')
const { createToken } = require('./utils/jwt')
const { auth } = require('./middlewares/auth')
const { join } = require('nunjucks/src/filters')
const app = express()

app.set('view engine','html')
nunjucks.configure('views',{
    express:app,
    watch:true, // nodemon 사용하기위해서 npm install chokidar
})
// {userid:asdf,userpw=asdfgfg}
// asdf=userid&asdfgfg=userpw
// userid=asdf&userpw=asdfgfg

// req.body.userid = asdf
// req.body.userpw = asdfgfg
app.use(express.urlencoded({extended:true,})) // http body영역을 해석해주는아이 Content-type : application/x-www-form-urlencoded
app.use(express.json()) // Content-type : application/json
app.use(express.static('public'))

// app.use(auth)

app.get('/',(req,res)=>{
    res.render('index.html')
})

app.get('/user',(req,res)=>{
    res.render('index')
})

app.get('/login',(req,res)=>{
    res.render('login')
})

app.post('/login2',(req,res)=>{
    console.log(req.body)
    res.send('이 텍스트를 받아보거라~')
})

app.post('/login',(req,res)=>{ // POST http://localhost:3000/login
    const { userid ,userpw } = req.body
    const [ item ] = user.filter( v => v.userid == userid && v.userpw == userpw )
    
    try {
        if(item === undefined) throw new Error('item undefined')

        // 로그인 성공적으로 되어야함

        // 1. JWT 토큰을 생성
        //      JWT 토큰을 생성하기위해서 필요한 값이 무엇일까?  payload에 해당되는 값 Object
        //      객체 필요하구나! 
        //      JWT 토큰을 만드는 함수를 만들자! 


        // 이런건 저도 만들때 보고만듬 JWT 만들기 <<
        const payload = {
            userid:item.userid,
            username:item.username,
            level:1
        }
        const token = createToken(payload)
        // JWT 토큰이 잘 만들어졌는지. 확인하는 작업을 할거에요. 표준에 맞춰어져있는지. 
        // https://jwt.io 
        console.log(token)
        // 2. 생성한 토큰을 쿠키로 생성해서 보내주어야 합니다.
        res.setHeader('Set-cookie',`AccessToken=${token}; HttpOnly; Secure; Path=/;`)
        res.redirect('/')
    } catch (e) {
        res.status(500).send('실패')
    }

    console.log(item)
    // request message  HTTP
    // response message HTTP  200 OK http/1.1
})

app.get('/admin',(req,res)=>{
    try{
        if( req.user === undefined ) throw new Error('로그인하고 와라 슈뱌')
        console.log(req.user)
        res.send('하하하하하하하하하하하하하하하하하하')
    } catch( e ) {
        res.send('로그인 하고와라~')
    }
})

// router 2개 
app.get('/join',(req,res)=>{
    res.render('join')
})

app.post('/idcheck',(req,res)=>{
    const { userid } = req.body
    const [ item ] = user.filter( v => v.userid == userid )

    let result = 1 
    if (item !== undefined) result = 2

    const response =  {
        result,  // 성공은 가입가능 1 , 실패는 가입불가능 2
    }

    // console.log(userid,response)

    res.send( JSON.stringify(response) )
})
// 화면 1개 

// POST 회원가입
app.post('/join', (req, res)=>{
    // console.log(req.body)
    const {userid, userpw, username} = req.body

    // user.js에 내용 추가
    const [check] = user.filter(v => v.userid === userid)

    // const data2 = [
    //     ...user,
    //     {...req.body}
    // ]
    try {
        if (check !== undefined) throw new Error ('아이디중복')
        user.push({...req.body})
    } catch (err) {
        // 아이디 중복처리
        res.send('중복된 아이디야~')
    }

    // 검증
    // userid 혹시 중복된 게 있나??
    // data2 객체와 user객체를 검증하는 코드를 작성할거임

    res.redirect(`/welcome?userid=${userid}`)
})

app.post('/join2', (req, res)=>{
    const {userid, userpw, username} = req.body
    const [check] = user.filter(v => v.userid === userid)

    // const data2 = [
    //     ...user,
    //     {...req.body}
    // ]
    try {
        if (check !== undefined) throw new Error ('아이디중복')
        user.push({...req.body})
        res.send(JSON.stringify(user[user.length-1]))
        // 백엔드는 데이터만 던져줄 뿐,,
    } catch (err) {
        // 아이디 중복처리
        res.send('중복된 아이디야~')
    }
})

app.get('/welcome', (req, res)=>{
    const {userid} = req.query
    const [item] = user.filter(v => v.userid === userid)
    res.render('welcome.html', {
        item
    })
})

app.listen(3000,()=>{
    console.log('서버 시작')
})

// npm install -g nodemon 