const express = require('express')
const nunjucks = require('nunjucks')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const KakaoStrategy = require('passport-kakao').Strategy
const NaverStrategy = require('passport-naver').Strategy
const app = express()

app.set('view engine', 'html')
nunjucks.configure('./views', {
    express: app,
    watch: true
})

app.use(cookieParser())
app.use(passport.initialize())

passport.use(new GoogleStrategy({
    clientID: "255220871527-ktkvanakh7piv3ut0tj1lfdmvac3ks74.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3001/oauth/google/callback"
}, (accessToken, refreshToken, profile, done)=>{
    console.log(accessToken)
    console.log('구글 로그인 되니?')
    return done(null, profile)
}))

passport.use(new KakaoStrategy({
    clientID: '87359e08ef3ee7df394072e4e0cd8648',
    clientSecret: 'gfUfAeILPZjetP9HXVHZFB20yGcYOX91',
    callbackURL: "http://localhost:3001/oauth/kakao/callback"
}, (accessToken, refreshToken, profile, done)=>{
    console.log(profile)
    console.log("카카오 로그인 되니?")
    return done(null, profile)
}))

passport.use(new NaverStrategy({
    clientID: 'kwyq5xsUEg4X_oTtsTIz',
    clientSecret: 'r1b9fo075f',
    callbackURL: "http://localhost:3001/oauth/naver/callback"
}, (accessToken, refreshToken, profile, done)=>{
    console.log(profile)
    console.log("네이버 로그인 되니?")
    return done(null, profile)
}))

app.get('/', (req, res)=>{
    res.render('index.html')
})

app.get('/oauth/google', passport.authenticate('google', {scope: ['profile', 'email']}))
app.get('/oauth/kakao', passport.authenticate('kakao'))
app.get('/oauth/naver', passport.authenticate('naver'))

app.get('/oauth/google/callback', passport.authenticate('google', { failureRedirect: '/', session: false }), (req, res)=>{
    const userInfo = req.user._json
    const payload = {
        name: userInfo.name,
        email: userInfo.email,
        picture: userInfo.picture
    }
    const secretKey = 'ingoo'
    const option = {
        algorithm: 'HS256'
    }
    const jwt_token = jwt.sign(payload, secretKey, option)
    res.cookie('AccessToken', jwt_token, {
        path: '/',
        httpOnly: true,
        secure: true,
        domain: 'localhost',
        maxAge: 30*1000
    })
    res.render('login.html', {
        userInfo
    })
})

app.get('/oauth/naver/callback', passport.authenticate('naver', { failureRedirect: '/', session: false }), (req, res)=>{
    const userInfo = req.user._json
    res.render('naver.html', {
        userInfo
    })
})

app.get('/oauth/kakao/callback', passport.authenticate('kakao', { failureRedirect: '/', session: false }), (req, res)=>{
    console.log(req.user)
    const userInfo = req.user._json.properties
    const payload = {
        nickname: userInfo.nickname,
        email: userInfo.email,
        profileImg: userInfo.profile_image
    }
    const secretKey = 'ingoo'
    const option = {
        algorithm: 'HS256'
    }
    const jwt_token = jwt.sign(payload, secretKey, option)
    res.cookie('AccessToken', jwt_token, {
        path: '/',
        httpOnly: true,
        secure: true,
        domain: 'localhost',
        maxAge: 30*1000
    })
    res.render('kakao.html', {
        userInfo
    })
})



app.listen(3001, ()=>{
    console.log('server onload')
})