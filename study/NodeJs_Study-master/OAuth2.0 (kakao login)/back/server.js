const express = require('express')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const app = express()

app.use(cookieParser())

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
})

app.listen(8080, ()=>{
    console.log('back server onload')
})