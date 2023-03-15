const express = require("express")
const nunjucks = require("nunjucks")
const app = express()


app.set("view engine", "html")
nunjucks.configure("./views", {
    express: app,
    watch : true
})

app.use(express.urlencoded({extended: true}))

const list = [
    {
        subject: "안녕하세요_",
        username: "web7722_",
        date: "2022-02-03"
    },
    {
        subject: "안녕하세요_2",
        username: "web7722_2",
        date: "2022-02-03"
    },
    {
        subject: "안녕하세요_3",
        username: "web7722_3",
        date: "2022-02-03"
    },
    {
        subject: "안녕하세요_4",
        username: "web7722_4",
        date: "2022-02-03"
    }
]


app.get("/", (req, res)=>{
    res.render("index.html")
})

// board
app.get("/board/list", (req, res)=>{

    // render() 메소드는 기본적으로 2개의 인자값을 갖는다.
    // 첫번째 인자값은 파일을 가져온다.
    // 두번째 인자값은 객체 형태로 데이터를 넘겨준다.
    // 서버에서 만들어진 데이터를 보내주고 싶을 때 사용하는 것이 render()의 두번째 인자값이 하는 역할이다.

    res.render("board_list.html", {
        content: list,
    })
})

app.get("/board/write", (req, res)=>{
    res.render("board_write.html")
})

app.post("/board/write", (req, res)=>{
    let board = {...req.body}
    list.push(board)
    // redirect() 메소드를 사용하면 URL을 다른 곳으로 보내준다.
    // URL을 바꿔서 응답을 준 것이다. (웹서버 쪽에서 링크를 이동시킨 것)
    res.redirect("/board/list")
})

app.get("/board/view", (req, res)=>{
    res.render("board_view.html")
})

app.listen(3000, ()=>{
    console.log("server onload")
})