const express = require('express');
const app = express();


app.get('/:ingoo', (req, res)=>{
    let name = req.params.ingoo
    res.send(`<h1>hello ${name}</h1>`)
})

app.get('/express', (req, res, next)=>{
    console.log("next")
    next()
}, (req, res)=>{
    res.send('<h1>Hello server!!</h1>')
})

app.listen(3000, ()=>{
    console.log('server onload')
})