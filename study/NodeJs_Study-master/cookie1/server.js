const express = require('express')
const nunjucks = require('nunjucks')
const app = express();

app.set('view engine', 'html')
nunjucks.configure('./views', {
    express: app,
    watch: true
})

app.get('/', (req, res)=>{
    res.setHeader("Set-Cookie", "token=1")
    // set-cookie를 이용해 브라우저에 쿠키값 저장
    // Response Header의 Set-Cookie에 "token=1" 이라는 내용의 텍스트가 저장된다.
    res.render('index.html')
})

app.get('/cookie', (req, res)=>{
    let cookie = req.headers.cookie;  // 브라우저에서 보내 온 cookie값을 받기 위한 처리
    if (cookie === undefined) {
        res.send("<h1>There is no cookie</h1>")
    } else {
        res.send(`<h1>Cookie: ${cookie}</h1>`)    
    }
})

app.listen(3000, ()=>{
    console.log("server onload")
})