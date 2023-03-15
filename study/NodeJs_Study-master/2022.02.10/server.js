const express = require('express')
const nunjucks = require('nunjucks')
const app = express()

app.set('view engine', 'html')
nunjucks.configure('./views', {
    express: app,
    watch: true
})

app.get('/', (req, res)=>{
    res.render('index.html')
})

app.get('/category/menu1', (req, res)=>{
    res.render('menu1.html')
})

app.get('/category/menu2', (req, res)=>{
    res.render('menu2.html')
})

app.get('/category/menu3', (req, res)=>{
    res.render('menu3.html')
})

app.get('/category/menu4', (req, res)=>{
    res.render('menu4.html')
})

app.listen(3000, ()=>{
    console.log('server onload')
})