import express from 'express'
import nunjucks from 'nunjucks'

const app = express()

app.set('view engine', 'html')
nunjucks.configure('views', {
    express: app,
})

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/newWallet', (req, res) => {
    res.json([])
})

app.listen(3005, () => {
    console.log('wallet start')
})
