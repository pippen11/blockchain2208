const express = require('express')
const nunjucks = require('nunjucks')
const multer = require('multer')
const path = require('path')
const app = express()

app.set('view engine', 'html')
nunjucks.configure('./views', {
    express: app,
    watch: true
})

app.use(express.static('./public'))

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, done)=>{
            done(null, 'public/uploads/')
        },
        filename: (req, file, done)=>{
            const ext = path.extname(file.originalname)
            const filename = 'userid' + '_' + 'profileImg' + ext
            done(null, filename)
        }
    }),
    limits: {fileSize: 5*1024*1024}
})

app.get('/', (req, res)=>{
    res.render('index.html')
})

app.post('/uploads', upload.single('upload'), (req, res)=>{
    res.redirect('/')
})

app.listen(3000, ()=>{
    console.log('server onload')
})