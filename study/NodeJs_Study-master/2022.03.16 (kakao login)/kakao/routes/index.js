const express = require('express')
const router = express.Router()
const axios = require('axios')
const qs = require('qs')

const client_id = '87359e08ef3ee7df394072e4e0cd8648'
const redirect_uri = 'http://localhost:3000/oauth/kakao'
const host = 'https://kauth.kakao.com'
const client_secret = 'gfUfAeILPZjetP9HXVHZFB20yGcYOX91'

router.get('/', (req, res)=>{
    res.render('index.html')
})

// 1. 인가코드 받기
router.get('/kakao/login', (req, res)=>{
    const redirectURI = host + `/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`
    res.redirect(redirectURI)
})

// 2. 토큰 받기
router.get('/oauth/kakao', async (req, res)=>{
    const {code} = req.query  // 인가코드
    const token_url = host+'/oauth/token'
    const headers = {
        'Content-type': 'application/x-www-form-urlencoded'
    }
    const body = qs.stringify({
        grant_type: 'authorization_code',
        client_id,
        redirect_uri,
        code,
        client_secret
    })

    const response = await axios.post(token_url, body, headers)

    response.data.access_token
    
// 3. 토큰을 활용하여 사용자 정보 가져오기
try {
    const {access_token: ACCESS_TOKEN} = response.data
    const url = 'https://kapi.kakao.com/v2/user/me'

    const userInfo = await axios.post(url, null, {
        headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`
        }
    })

    console.log(userInfo.data)

} catch (err) {
    console.log(err)
}

    res.send('로그인 성공')
})

module.exports = router