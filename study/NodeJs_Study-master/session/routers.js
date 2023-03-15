// router
// 라우터를 파일을 쪼개서 나눌 겁니다.

const express = require('express')
const app = express();
const router = require('./route/index.js')

app.use(router)

app.listen(3000, ()=>{
    console.log('server onload')
})