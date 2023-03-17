import express, { urlencoded } from 'express'
import nunjucks from 'nunjucks'
import { Wallet } from './wallet'
import axios from 'axios'

const app = express()

const userid = process.env.USERID || 'web7722'
const userpw = process.env.USERPW || '1234'
const baseURL = process.env.BASEURL || 'http://localhost:3000'

const baseAuth = Buffer.from(userid + ':' + userpw).toString('base64')

// authorization <-
const request = axios.create({
    baseURL,
    headers: {
        Authorization: 'Basic ' + baseAuth,
        'Content-type': 'application/json',
    },
})

app.use(express.json())
app.set('view engine', 'html')
nunjucks.configure('views', {
    express: app,
})

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/newWallet', (req, res) => {
    res.json(new Wallet())
})

// list
app.post('/walletList', (req, res) => {
    console.log('wallet lsit')
    const list = Wallet.getWalletList()
    res.json(list)
})

// view
app.get('/wallet/:account', (req, res) => {
    const { account } = req.params
    console.log('wallet', account)
    const privateKey = Wallet.getWalletPrivateKey(account) // private Key
    res.json(new Wallet(privateKey))
})

// sendTrnasaction
app.post('/sendTransaction', async (req, res) => {
    console.log(req.body)
    const {
        sender: { account, publicKey },
        received,
        amount,
    } = req.body

    // 서명만들떄 필요한값 SHA256(보낼사람:공개키+받는사람:계정+보낼양).toString
    // HASH + PrivateKey -> 서명
    const signature = Wallet.createSign(req.body)
    // 보낼사람:공개키 , 받는사람:계정,  보낼양, 서명
    const txObject = {
        sender: publicKey,
        received,
        amount,
        signature,
    }

    console.log(txObject)

    const response = await request.post('/sendTransaction', txObject)
    console.log(response.data)
    res.json({})
})

app.listen(3005, () => {
    console.log('서버시작 ', 3005)
})
