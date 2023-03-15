const express = require('express')
const cors = require('cors')
const axios = require('axios')
const qs = require('qs')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
// const session = require('express-session')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use(cors({
    origin: true,
    credentials: true
}))

const client_id = '87359e08ef3ee7df394072e4e0cd8648'
const redirect_uri = 'http://localhost:4001/auth/kakao/callback' 
const client_secret = 'gfUfAeILPZjetP9HXVHZFB20yGcYOX91'
const grant_type = 'authorization_code'


app.get('/auth/kakao', (req, res)=>{
    // 인가 코드 받기
    const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}`
    res.redirect(kakaoAuthURL)
})

app.get('/auth/kakao/callback', async (req, res) => {
    const {code} = req.query
    const host = 'https://kauth.kakao.com'
    const tokenURI = host + '/oauth/token'
    const userURI = 'https://kapi.kakao.com/v2/user/me'

    // let response;

    try {
        const body = {
            grant_type,
            client_id,
            redirect_uri,
            code,
            client_secret
        }
        
        const response = await axios.post(tokenURI, qs.stringify(body), {
            'Content-type': 'application/x-www-form-urlencoded'
        })        

        const {access_token} = response.data
        console.log(response.data)

        const userResponse = await axios({
            method:'get',
            url:'https://kapi.kakao.com/v2/user/me',
            headers:{
                Authorization: `Bearer ${access_token}`
            }
        })

        // console.log(userResponse.data)
        const userInfo = userResponse.data.properties
        const {nickname, profile_image} = userInfo

        const secretKey = 'ingoo'
        const opt = {
            algorithm: 'HS256'
        }
        const payload = {
            nickname,
            profile_image
        }
        const token = jwt.sign(payload, secretKey, opt)
        console.log(token)
        res.cookie('jwt', token, {
            path: '/',
            httpOnly: true,
            domain: 'localhost'
        })
        res.redirect('http://localhost:3001/user')

        
    } catch (err) {
        console.log(err)
    }

    
    // const {access_token} = response.data
    // let userResponse;

    // try {
    //     userResponse = await axios.get(userURI, {
    //         Authorization: `Bearer ${access_token}`,
    //         'Content-type': 'application/x-www-form-urlencoded'
    //     })

    // } catch (err) {
    //     console.log(err)
    // }
})

app.listen(4001, ()=>{
    console.log('api server onload')
})