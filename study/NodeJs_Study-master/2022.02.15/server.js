// 게시판
// GET 리스트 board/list
// GET 글작성 board/write
// POST 글작성 board/write
// GET 글보기 board/view
// GET 글수정 board/update
// POST 글수정 board/update
// POST 글삭제 board/delete

const express = require('express')
const app = express()

app.get('/', (req, res)=>{
    res.send('<h1>Hello Server</h1>')
})

app.listen(3000, (req, res)=>{
    console.log('server onload')
})

