const express = require('express')
const nunjucks = require('nunjucks')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const app = express()

app.set('view engine', 'html')
nunjucks.configure('./views', {
    express: app,
    watch: true
})

app.use(cookieParser())

app.get('/', (req, res)=>{
    res.render('index.html')
})

app.get('/user', (req, res)=>{
    const {jwt: jwt_token} = req.cookies
    const secretKey = 'ingoo'
    const userInfo = jwt.verify(req.cookies.jwt, secretKey)
    console.log(userInfo)
    const payload = {
        ...userInfo
    }
    console.log(payload)
    const opt = {
        algorithm: 'HS256'
    }
    const sign = jwt.sign(payload, secretKey, opt)
    if (jwt_token == sign) {
        res.render('user.html',{
            userInfo
        })
    } else {
        res.send('로그인 하고 와라~')
    }

})

app.listen(3001, ()=>{
    console.log('front server onload')
})