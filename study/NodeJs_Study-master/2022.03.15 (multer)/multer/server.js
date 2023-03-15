const express = require('express')
const nunjucks = require('nunjucks')
const app = express()
const multer = require('multer')
const path = require('path')

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, done)=>{

            done(null, 'uploads/')
            // 첫번째 인자값은 에러처리에 대한 부분
            // 두번째 인자값은 파일이 저장 될 디렉토리
        },
        filename: (req, file, done)=>{
            const ext = path.extname(file.originalname)
            const filename = path.basename(file.originalname, ext) + '_' + Date.now() + ext
            done(null, filename)
            // 첫번째 인자값은 에러처리에 대한 부분
            // 두번째 인자값은 실제로 저장할 파일명
        }
    }),
    limits: { fileSize: 5*1024*1024 }
})

app.set('view engine', 'html')
nunjucks.configure('./views', {
    express: app,
    watch: true
})

app.get('/axios', (req, res)=>{
    res.render('axios.html')
})

app.post('/upload', upload.single('upload'), (req, res)=>{
    // upload.single() 미들웨어가 req.file을 만들어준다.
    // req.file에 파일에 대한 데이터가 담긴다. 
    console.log(req.file)
    console.log(req.body)
    res.send('uploaded')
})

app.listen(3000, ()=>{
    console.log('server onload')
})