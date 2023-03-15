const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001')
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE')  // methods 사용여부
    res.setHeader('Access-Control-Allow-Credentials','true')
    res.setHeader('Access-Control-Allow-Headers','Content-type')
    next()
})

app.post('/', (req, res) => {
    console.log(req.body)
    res.setHeader('Set-Cookie', 'name=bitkunst;')
    res.send('data')
})

app.listen(4001, ()=>{
    console.log('back server onload')
})