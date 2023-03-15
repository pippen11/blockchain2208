const express = require("express")
const app = express()
const nunjucks = require("nunjucks")

// nunjucks 세팅
app.set("view engine", "html")
nunjucks.configure("./views", {
    express: app,
    watch: true
})

// HTTP 패킷의 body 영역에 있는 queryString을 읽기 위한 세팅
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res)=>{
    console.log("요청 들어옴")
    res.render("index.html")

    // 웹브라우저는 아래와 같은 텍스트를 읽어서 랜더해준다.

    // # 헤더영역
    // HTTP/1.1 304 Not Modified
    // X-Powered-By: Express
    // ETag: W/"12c-rAvXfQATu5XcanT9L/eGAuh6z4E"
    // Date: Thu, 03 Feb 2022 00:39:02 GMT
    // Connection: keep-alive
    // Keep-Alive: timeout=5
    //
    // # body 영억
    // <!DOCTYPE html>
    // <html lang="en">
    // <head>
    //     <meta charset="UTF-8">
    //     <meta http-equiv="X-UA-Compatible" content="IE=edge">
    //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //     <title>Document</title>
    // </head>
    // <body>
    //     <h1>hello world</h1>
    // </body>
    // </html>

})

app.get("/board", (req, res)=>{
    // console.log(req)
    // req 객체는 웹브라우저가 만들어서 보낸 텍스트를 잘라서 활용한다.
    console.log(req.query)
    res.render("board_list.html")
})

app.post("/board", (req, res)=>{
    console.log(req.body)
    res.send("POST board")
})

app.listen(3000, ()=>{
    console.log("server onload")
})

