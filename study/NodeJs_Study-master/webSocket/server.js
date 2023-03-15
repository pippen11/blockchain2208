const express = require('express')
const nunjucks = require('nunjucks')
const app = express()
const webSocket = require('./socket.js')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.set('view engine', 'html')
nunjucks.configure('./views', {
    express: app,
    watch: true
})

app.get('/', (req, res)=>{
    res.render('index.html')
})

const server = app.listen(3000, ()=>{
    console.log('server onload')
})
// expres와 포트 공유하기
// express 서버 위에 websocket 서버를 만들었다.
webSocket(server)
