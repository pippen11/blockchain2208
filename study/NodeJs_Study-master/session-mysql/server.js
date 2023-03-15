const express = require('express')
const nunjucks = require('nunjucks')

const session = require('express-session')
const mySQLstore = require('express-mysql-session')(session)
const router = require('./routes/index.js')
const app = express();

app.set('view engine', 'html')
nunjucks.configure('./views', {
    express: app,
    watch: true
})

app.use(session({
    secret: "qwer1234",
    resave: false,
    saveUninitialized: true,
    store: new mySQLstore({
        host: 'localhost',
        user: 'root',
        password: 'won0701',
        database: 'session_mysql'
    })
}))

app.use(express.urlencoded({extended:true}))

app.use(router)

app.listen(3000, ()=>{
    console.log('server onload')
})