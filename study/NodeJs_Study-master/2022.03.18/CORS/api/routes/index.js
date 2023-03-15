const axios = require('axios')
const express = require('express')
const router = express.Router()
const qs = require('querystring')
const {client_id,client_secret,redirect_uri} = require('../config/config')


/*
    REST API KEY
    Autherication 인증
    Authorization 허가

    REST API KEY : b5e74e5a2f7691fb9ff2fd44e91e2488
    redirect uri : http://localhost:3000/auth/kakao/callback
    secret key : PUr6yxoxT0ZyCiCpWLyL8YUNH4zwWs3z
*/

router.get('/',(req,res)=>{
    res.render('index')
})

router.get('/login',(req,res)=>{

})

router.post('/login',(req,res)=>{

})

router.get('/auth/kakao',(req,res)=>{
    // 1. 인가 코드 받기
    const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}`
    res.redirect(kakaoAuthURL)
})

router.get('/auth/kakao/callback', async (req,res)=>{
    const { query:{ code } } = req
    const host = 'https://kauth.kakao.com'
    const tokenURI = host+'/oauth/token'
    const userURI = 'https://kapi.kakao.com/v2/user/me'
    
    try {
        // 2. 토큰 받기
        const tokenBody = {
            grant_type:'authorization_code',
            client_id,
            client_secret,
            redirect_uri,
            code
        }

        console.log(qs.stringify( tokenBody ))
        const response = await axios.post(tokenURI,qs.stringify(tokenBody),{
            'Content-Type': 'application/x-www-form-urlencoded'
        })
        const {data:{access_token,token_type,refresh_token}} = response
        console.log(access_token,token_type,refresh_token)
        
        const user = await axios.post(userURI,null,{
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization':`Bearer ${access_token}`,
            }
        })

        console.log(user.data)

        // 3. 
        res.render('profile',{
            kakao:user.data.kakao_account.profile
        })
    } catch (e) {
        console.log(e)
        res.json(e)
    }
})

module.exports = router;