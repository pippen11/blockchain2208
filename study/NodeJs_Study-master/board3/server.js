const express = require('express')
const nunjucks = require('nunjucks')
const app = express();

app.set('view engine', 'html')
nunjucks.configure('./views', {
    express: app,
    watch: true
})


app.get('/', (req, res)=>{
    res.render('index.html')
})

const board = require('./board.js')(app);
app.use('/board', board)

const todoList = require('./todo.js')(app);
app.use('/todo', todoList)



app.listen(3000, ()=>{
    console.log("server onload")
})