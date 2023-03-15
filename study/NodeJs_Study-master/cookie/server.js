const express = require('express')
const nunjucks = require('nunjucks')
const app = express();

// 임시 데이터
let user = {
    userid: 'web7722',
    userpw: '1234',
    username: 'ingoo'
}

app.use(express.urlencoded({extended: true}))

app.set('view engine', 'html')
nunjucks.configure('./views', {
    express: app,
    watch: true
})

// Set-Cookie: <cookie-name>=<cookie-value>
// let a = 1;

app.get('/', (req, res)=>{
    // res.setHeader('headerKey', 'headerValue') // 응답을 줄 때 헤더에 내용을 추가하겠다는 뜻.  인자값은 스트링 형태로 전달 
    // 헤더의 내용은 우리가 임의로 만들어서 넣어줄 수 있지만 , 컴퓨터가 읽을 수 있는 내용으로 작성해서 넣어주어야 웹서버, 혹은 브라우저 쪽에서 해석이 가능하다.
    // res.setHeader('Set-Cookie', 'token=1')  // 브라우저에 쿠키를 저장하게 된다. 응답헤더에 Set-Cookie값이 저장되게 된다.
    // token=1 이라는 내용의 텍스트를 그대로 저장한다.
    let isLogin = false;
    if (req.headers.cookie === undefined ) {
        res.render('index', {
            isLogin
        })
    } else {
        let cookie = req.headers.cookie.split('=')  // npm install cookie-parser
        let userid = cookie[1] //web7722
        if (userid === 'web7722') {
            isLogin = true
        }
    
        res.render('index.html', {
            userid,
            isLogin
        })
    }

})

app.get('/login', (req, res)=>{
    res.render('login.html')
})

// 브라우저에서 입력한 정보와 user라는 객체에 있는 정보랑 내용이 맞는가?
app.post('/login', (req, res)=>{
    const {userid, userpw} = req.body;
    console.log(userid, userpw)
    if(user.userid === userid && user.userpw === userpw) {
        // 로그인 성공
        console.log('success')
        res.setHeader('Set-Cookie', `login=${userid}`)  // set-Cookie를 이용해 브라우저에 쿠키를 저장
        res.redirect('/')
    } else {
        // 로그인 실패
        console.log('fail')
        res.redirect('/login')
    }
})

app.get('/logout', (req, res)=>{
    res.setHeader('Set-Cookie', 'login=web7722; Max-Age=0;')
    res.redirect('/')
})

// 내 정보 보기
// 서버는 쿠키를 가지고 있는 상태가 아니기 때문에 브라우저에서 서버쪽에 요청을 할 때 쿠키를 주면서 해야한다.
app.get('/profile', (req, res)=>{
    // (선행) 쿠키가 존재하는지 여부를 먼저 검사한다.
    if (req.headers.cookie === undefined) {
        res.redirect('/')
    } else {
        // 1단계 , 먼저 요청에 들어간 cookie를 꺼내와야 합니다.
        let cookie = req.headers.cookie.split('=')
        let userid = cookie[1]
        if (user.userid === userid) {
            res.render('profile.html', {
                userid: user.userid,
                username: user.username
            })
        } else {
            res.redirect('/')
        }
    }
})

app.listen(3000, ()=>{
    console.log('Server Onload')
})