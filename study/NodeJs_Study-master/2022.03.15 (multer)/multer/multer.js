const express = require('express')
const nunjucks = require('nunjucks')
const multer = require('multer')
const path = require('path')
const app = express()

// request message -> body 영역을 읽는 방법 2가지를 배웠다.
// application/x-www-form-urlencoded
// application/json

// req 객체 안에는 원래 body라는 속성이 존재하지 않는다.
// express.urlencoded({extended: true} 가 body 객체를 만들어준 것

// express.json()을 통해 JSON 포맷의 데이터를 읽을 수 있다.

// 마찬가지로 multipart/form-data 형태의 데이터를 읽을 수 있는 미들웨어가 필요
// 외부라이브러리 multer  <-  미들웨어 역할을 해주는 아이
// multer : 함수 
// multer가 함수인데 얘를 객체로 만드는 작업을 해줘야함
// 그리고 그 객체 안에 3가지 정도 속성이 있는데 그 3가지가 미들웨어이다
// multer.single() 미들웨어 -> 파일 하나만 업로드할 때

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const upload = multer({
    // 서버에서 저장할 공간 지정 , diskStorage() <- 서버컴퓨터의 하드디스크에 저장
    storage: multer.diskStorage({
        // 미들웨어를 넣어준다.
        // req : 요청
        // done : 콜백함수
        destination: (req, file, done)=>{
            // 첫번째 인자값, 에러에 대한 처리부분
            // 두번째 인자값, 디렉토리
            done(null, 'uploads/')
        },
        // file.originalname : 사용자가 올린 파일명
        filename: (req, file, done)=>{
            const ext = path.extname(file.originalname)
            // 확장자만 뽑아옴
            const filename = path.basename(file.originalname, ext) + '_' + Date.now() + ext  
            // 확장자 제거하고 파일명만 꺼내옴  // 동일한 파일명이 있을 수 있으므로 덮어쓰기 방지용

            // 첫번째 인자값, 에러
            // 두번째 인자값, 실제로 저장할 파일명
            done(null, filename)  
        }
    }),
    limits: { fileSize: 5*1024*1024 }  // 5MB 
})  // 객체 변환

// 이미지 업로드 미들웨어는 업로드를 하는 공간(라우터)에서만 끼워넣는다.
// upload.single()

app.set('veiw engine', 'html')
nunjucks.configure('./views', {
    express: app,
    watch: true
})

// 미들웨어를 사용해서 특정 사용자에게만 데이터 전달
app.use((req, res, next)=>{
    req.ingoo = 'ingoo'
    next()
})

app.get('/single', (req, res)=>{
    console.log(req.ingoo)
    res.render('single.html')
})

app.get('/axios', (req, res)=>{
    res.render('axios.html')
})

app.get('/array', (req, res)=>{
    res.render('array.html')
})

app.get('/uploads', (req, res)=>{
    res.render('uploads.html')
})

// upload.single() 인자값으로 파일업로드 하는 input박스의 name값을 넣어준다.
app.post('/upload', upload.single('upload'), (req, res)=>{
    // upload.single() 미들웨어가 req.file을 만들어준다.
    // req.file에 파일에 대한 데이터가 담긴다.
    console.log(req.file)
    console.log(req.body)  // upload.single()이 파일을 제외한 나머지 값들을 req.body에 넣어준다.
    res.send('upload')
})

app.post('/upload2', upload.array('upload'), (req, res)=>{
    // multiple은 미들웨어가 upload.array()
    // req.files에 파일에 대한 데이터가 담긴다.
    console.log(req.files)
    console.log(req.body) 
    res.send('upload')
})

// upload input 박스가 여러개일 때
app.post('/upload3', upload.fields([{name: 'upload1'}, {name: 'upload2'}, {name: 'upload3'}, {name: 'upload4'}]), (req, res)=>{
    // upload.fields 미들웨어 사용
    // req.files.name값 에 파일에 대한 데이터가 담긴다.
    console.log(req.files.upload1)
    console.log(req.files.upload2)
    console.log(req.files.upload3)
    console.log(req.files.upload4)
    console.log(req.body) 
    res.send('upload')
})

app.listen(3000, ()=>{
    console.log('server onload')
})
