// 메인페이지
// Login
// GET 로그인
// POST 로그인
// 마이페이지
// 로그아웃 기능

const express = require('express')
const nunjucks = require('nunjucks')
const session = require('express-session')
// session은 미들웨어이다.
// 클라이언트의 요청에 쿠키가 있는지 검사하는 용도

const Memorystore = require('memorystore')(session)
// memorystore -> 세션을 담을 공간을 설정할 수 있다.
// const user = require('./models/user.js')
// const {alertmove} = require('./util/alert.js')
const app = express();
const router = require('./routes/index.js')


app.set('view engine', 'html')
nunjucks.configure('./views', {
    express: app,
    watch: true
})


// session 함수 안에 객체형태의 인자값이 들어간다. 
// 3가지 핵심
// 암호화  --> 세션 아이디가 겹치지 않게 하기 위한 작업
// 세션을 저장할 공간  -->  세션의 저장 주체는 서버이다. 서버의 어느 위치에 저장할지 지정하는 작업
// 쿠키의 설정  -->  세션은 기본적으로 쿠키를 사용한다.(쿠키가 없이는 세션도 없다) 쿠키의 만료시간이라든가 범위를 지정할 때 사용

const maxAge = 60*60*1000
let sessionObj = {
    secret: "qwer1234",  // salt  -->  암호화를 할 때 필요한 요소값
    resave: false,
    saveUninitialized: true,
    // store에 따라 메모리에 저장할지, 파일에 저장할지, DB에 저장할지 설정
    store: new Memorystore({ checkPeriod: 1000 }),   // 세션을 저장할 객체 생성,  서버쪽 세션의 유효기간
    cookie: {
        maxAge: maxAge  // 브라우저쪽 세션의 유효기간
    }
}

// session 미들웨어 안에는 객체형태의 인자값이 들어간다. 
app.use(session(sessionObj))
// session 미들웨어가 동작하면서 sessionObj 객체에 있는 내용으로 쿠키를 만들어준다. (세션쿠키)
// session을 만들고 공간확보를 해놓는 부분.

app.use(express.urlencoded({extended: true}))

app.use(router)
// 모든 uri에 대해 실행됨.


app.listen(3000, ()=>{
    console.log("server onload")
})