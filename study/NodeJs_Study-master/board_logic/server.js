const express = require("express");
const nunjucks = require('nunjucks');
const list = require('./boardData')
const app = express()
const data = [...list.data]

app.set("view engine", "html")
nunjucks.configure("./views", {
    express: app,
    watch: true
})

app.use(express.urlencoded({extended: true}))

app.use(express.static("public"))


app.get('/', (req, res)=>{
    res.render("index.html")
})


// board
app.get('/board/list', (req, res)=>{
    res.render('board_list.html', {
        list: data
    })
})

app.get('/board/write', (req, res)=>{
    res.render('board_write.html')
})

// 하나의 라우터에는 최소단위의 기능만 구현될 수 있도록 넣어주는 것이 좋다.
app.post('/board/write', (req, res)=>{
    let item = {...req.body}
    data.push(item)
    res.redirect('/board/list')
})

app.get('/board/view', (req, res)=>{
    const index = req.query.index
    const view = data[parseInt(index)-1]
    
    res.render('board_view.html', {
        data: view,
        index: index
    })
})

app.post('/board/delete', (req, res)=>{
    const index = req.body.index-1
    data.splice(index, 1)
    // console.log(data)
    res.redirect('/board/list')
})

app.get('/board/update', (req, res)=>{
    const index = req.query.index
    const view = data[parseInt(index)-1]
    res.render('board_update.html', {
        data: view,
        index: index
    })
})

app.post('/board/update', (req, res)=>{
    const index = req.body.index;
    const {subject, username, date} = req.body
    const item = {subject, username, date};

    // const item = {
    //     subject: req.body.subject,
    //     username: req.body.username,
    //     data: req.body.date
    // }

    // 배열을 바꿔주는 행위를 해야됨.
    data[index-1] = item;
    res.redirect(`/board/view?index=${index}`)
})

app.listen(3000, ()=>{
    console.log("server onload")
})

