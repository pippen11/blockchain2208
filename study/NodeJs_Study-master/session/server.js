const express = require('express')
const nunjucks = require('nunjucks')
const {user, findUser} = require('./user.js')  // user 데이터
const app = express();

const session = {}

app.use(express.urlencoded({extended: true}))

app.set('view engine', 'html')
nunjucks.configure('./views', {
    express: app,
    watch: true
})


app.get('/', (req, res)=>{
    
    if (req.headers.cookie) {
        let data = req.headers.cookie
        let sessionId = data.split('=')[1]
        res.render('index_login.html', {
            sessionId
        })
    } else {
        res.render('index.html')
    }
})


// user
app.get('/user/login', (req, res)=>{
    let msg = req.query.msg
    res.render('./user/login.html', {  // 디렉토리 설정
        msg
    })  
})

app.post('/user/login', (req, res)=>{
    let {userid, userpw} = req.body;  // post로 받은 값 (사용자가 입력한 값)
    // user : 서버 관리자가 가지고 있는 정보

    // 1단계 
    // form에서 받은 값과 user 변수에 있는 내용이 일치하는지 확인
    let loginFlag = findUser(userid, userpw)
    if ( loginFlag ) {
        // 성공일 때 세션을 생성하고 메인으로 돌려주기
        const privateKey = parseInt(Math.random()*10000000000)
        const item = user.filter(v=>v.userid === userid)
        // console.log(item)
        session[privateKey] = item[0]
        // console.log(session)
        res.setHeader('Set-Cookie', `connect.id=${privateKey}; path=/`)
        res.redirect('/')
    } else {
        // 실패일 때 로그인 페이지로 msg랑 같이 던져주기
        res.redirect('/user/login?msg=아이디와 패스워드가 일치하지 않습니다.')
    }
})


app.get('/user/profile', (req, res)=>{
    let data = req.headers.cookie;
    let sessionId = data.split('=')[1];
    let userData = session[sessionId]
    console.log
    if (sessionId) {
        res.render('./user/profile.html',{
            userData
        })
    }
})

app.listen(3000, ()=>{
    console.log("server onload")
})