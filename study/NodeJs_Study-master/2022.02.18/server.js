// Express + MySQL 연결하기
// 192.168.246.183

const express = require('express')
const app = express();
const nunjucks = require('nunjucks')
const PORT = process.env.PORT || 3000
// 없다면 3000이라는 값을 넣어주겠다는 뜻
const router = require('./routes/index.js')

app.set('view engine', 'html')
nunjucks.configure('./views', {
    express: app
})

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

app.use(router)

app.listen(PORT, ()=>{
    console.log(`server onload port : ${PORT}`)
})

