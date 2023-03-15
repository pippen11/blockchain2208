const express = require('express')
const nunjucks = require('nunjucks')
const app = express()

app.set('veiw engine', 'html')
nunjucks.configure('./views', {
    express: app,
    watch: true
})

app.use(express.urlencoded({extended: true}))

app.get('/', (req, res)=>{
    res.render('index.html')
})

// 화면없이 post 요청이란걸 보낼 수 있나?/
// 요청이란 건 무엇인가? -> url이 바뀌는 행위
// HTTP 문서의 헤더와 바디
app.post('/', (req, res)=>{
    res.send('hello post')
})

app.listen(3000, ()=>{
    console.log('server onload')
})