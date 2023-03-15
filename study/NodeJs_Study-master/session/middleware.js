const express = require('express')
const nunjucks = require('nunjucks')
const app = express();

app.set('view engine', 'html')
nunjucks.configure('./views', {
    express: app,
    watch: true
})

app.use('/', express.static('./public'))  // 파일을 가져오는 미들웨어
// 이미지파일, html파일, css파일, js파일 등 정적 파일을 가져오는 미들웨어
// /:라우트 매개변수 -> 파일명과 같다면 그 파일을 열어서 보내줘
// 1. 라우터의 경로를 일단 확인한다. (여기서는 '/')
// 2. 미들웨어를 실행한다. (express.static)
// express.static('내가 실행시킬 파일의 경로')
// '/' 이후에 적는 내용 이후에
// 라우트 매개변수명이 파일명이랑 같다면 그 파일을 열어서 보내줘.
// next를 실행하지 않습니다.



app.use('/', (req, res, next)=>{  // 미들웨어에 next라는 매개변수가 존재
    console.log('나 next야 실행되게 해줘~')
    next() // 맨 마지막에 next() 함수를 호출해 주면 된다.
})  
// app.use -> request method가 어떤 것이든 실행하게 해줘
// 라우터 역시 기본적으로 앞에 있는 코드가 먼저 실행된다.
// next() 함수가 호출되면 아래쪽에서 나에게 맞는 라우터가 있는지 한번더 찾겠다는 뜻
// 조건에 맞는 라우터가 있다면 한번 더 실행되게 된다.


// app.get 은 라우터
app.get('/', (req, res)=>{  // 미들웨어
    console.log('실행')
    res.render('index.html')
})

app.get('/profile', (req, res)=>{
    console.log('실행')
    res.send('hello profile')
})

// 라우터에 미들웨어를 두개 넣을 수 있다. (가끔가다 사용)
// 이 때 next()를 사용해야만 한다.
// 기본적으로 같은 라우터 안에 있는 미들웨어를 찾고 없다면 다른 라우터에서 찾는다. (4교시 20분)
// 여기서는 코드의 실행순서가 중요하다.

let a = (req, res, next)=>{
    console.log('hello join');
    next()
}
// 미들웨어는 변수에 담아서도 사용이 가능하다
app.get('/join', a, (req, res)=>{
    console.log('hello join2')
})


app.get('/login', (req, res)=>{
    res.send('hello login')
})

// 라우트 매개변수
// '/' 다음에 나오는 내용을 변수로 받겠다는 뜻
// 순서가 굉장히 중요하다. 
// 또한 1 dept 이상에서 사용하는 것을 권장한다.
app.get('/:ingoo', (req, res)=>{
    let a = req.params.ingoo  // 변수로 받아오는 방법
    res.send(`hello ${a}`)
})

app.listen(3000, ()=>{
    console.log('server onload')
})