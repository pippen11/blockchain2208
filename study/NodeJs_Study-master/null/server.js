const express = require('express')
const nunjucks = require('nunjucks')

const app = express();

app.set('view engine', 'html')
nunjucks.configure('./views', {
    express: app,
    watch: true
})

app.use(express.static('./public'))

app.get('/', (req, res)=>{
    res.render('./index.html')
})


app.listen(3000, ()=>{
    console.log('server onload')
})

