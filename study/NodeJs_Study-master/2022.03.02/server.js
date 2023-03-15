const express = require('express')
const nunjucks = require('nunjucks')
const crypto = require('crypto')
const {user} = require('./user.js')
const {createToken} = require('./jwt2')
const { Auth } = require('./auth.js')
const app = express()

app.set('view engine', 'html')
nunjucks.configure('./views', {
    express: app,
    watch: true
})

app.use(express.urlencoded({extended: true}));

app.get('/', (req, res)=>{
    res.render('index.html')
})

const header = {
    alg: 'sha256',
    tpy: 'JWT'
}

console.log(Auth)

app.get('/getUser', Auth, (req,res)=>{
    res.send(JSON.stringify(req.user))
})


app.post('/', (req, res)=>{
    const {userid, userpw} = req.body;
    const userInfo = user.filter( v => v.userid == userid && v.userpw == userpw );
    console.log(userInfo)
    if (userInfo[0] != undefined) {
        const state = {
            userid,
            username: userInfo[0].username,
            hi:'hello',
            a:'ingoo'
        }
        
        const jwt = createToken(state)
        
        console.log(jwt)

        // const payload = {
        //     userid,
        //     username: userInfo[0].username
        // }
        // const encodingHeader = Buffer.from(JSON.stringify(header)).toString('base64').replace(/[=]/g,'')
        // const encodingPayload = Buffer.from(JSON.stringify(payload)).toString('base64').replace(/[=]/g,'')
        // const signature = crypto.createHmac('sha256', Buffer.from('web7722'))  
        //                         .update(`${encodingHeader},${encodingPayload}`)
        //                         .digest(`base64`)
        //                         .replace(/[=]/g, '')
        // const jwt = `${encodingHeader}.${encodingPayload}.${signature}`
        res.setHeader('Set-Cookie', `jwt=${jwt}`)
        res.render('welcome.html')
    } else {
        res.send("<h1>go away</h1>")
    }
})



app.get('/user', Auth, (req, res)=>{
    console.log(req.user)
    const cookie = req.headers.cookie
    if (cookie != undefined) {
        const [head, pay, sign] = cookie.split('=')[1].split('.')
        const signature = cookie.split('=')[1].split('.')[2]
        const designature = crypto.createHmac('sha256', Buffer.from('web7722'))  
                                  .update(`${head},${pay}`)
                                  .digest('base64')
                                  .replace(/[=]/g, '')
        if (signature === designature) {
            res.send('<h1>hello user</h1>')
        }
    } else {
        res.send('no user')
    }
})


app.listen(3000, ()=>{
    console.log('server onload')
})
