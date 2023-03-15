const express = require('express')
const nunjucks = require('nunjucks')
const cookieParser = require('cookie-parser')
const axios = require('axios')
const app = express()

const router = require('./routes')

app.set('view engine','html')
nunjucks.configure('views',{
    express:app,
    watch:true,
})

app.use(cookieParser())

// 메인페이지
app.get('/',(req,res)=>{
    res.render('index')
})

// 회원가입
app.get('/user/join',(req,res)=>{
    res.render('join')
})

// 로그인페이지
app.get('/user/login',(req,res)=>{
    res.render('login')
})

// 프로필페이지
app.get('/user/profile',(req,res)=>{
    res.render('profile')
})

app.use(router)


app.listen(3001,()=>{
    console.log(`front server 시작`)
})