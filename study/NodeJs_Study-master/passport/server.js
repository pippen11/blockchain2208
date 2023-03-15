const express = require('express')
const nunjucks = require('nunjucks')
const cookieParser = require('cookie-parser')
const {createToken} = require('./utils/jwt.js')
const {cookieAuth} = require('./middlewares/auth.js')
const passport = require('passport')
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const jsonwebtoken = require('jsonwebtoken')
const {user} = require('./models/user.js')
const {findUser} = require('./utils/findUser.js')
const app = express()


app.set('view engine', 'html')
nunjucks.configure('./views', {
    express: app,
    watch: true
})

app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

const opts = {
    secretOrKey: 'secret',
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
}


passport.use('jwt', new JWTStrategy(opts, (jwt_payload, done)=>{
    try {
        console.log(jwt_payload)
        if (user) {
            done(null, user)
        } else {
            done(null, false, {message: 'inaccurate token'})
        }
    } catch(err) {
        done(err)
    }
}))

app.get('/', (req, res)=>{
    res.render('./index.html', {
        
    })
})

app.get('/login', (req, res)=>{
    res.render('./login.html')

})

app.post('/login', findUser, (req, res)=>{
    const {user} = req
    try {
        const payload = {
            userid: user.userid,
            username: user.username,
            level: 1
        }
        
        const signedToken = jsonwebtoken.sign(payload, 'secret', {algorithm: 'HS256'})    
        res.cookie('jwt', signedToken, {
            path: '/',
            HttpOnly: true
        })
        res.redirect('/')
    } catch {
        console.log(err)
    }
    
})

app.get('/admin',
        passport.authenticate('jwt', {session: false}), 
        (req, res)=>{
            res.render('./admin.html')
        }
)


app.listen(3000, ()=>{
    console.log('server onload')
})