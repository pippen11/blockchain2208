import express from 'express';
import nunjucks from 'nunjucks';
import { Wallet } from './wallet';
import axios from 'axios';

const app = express();

// axios 디폴트 세팅
// axios.create() 메소드 : axios 인스턴스를 반환
// 디폴트값을 세팅할 때 사용하는 메소드

const userid = process.env.USERID || 'web7722';
const userpw = process.env.USERPW || '1234';
const baseURL = process.env.BASEURL || 'http://localhost:3000';
const baseAuth = Buffer.from(userid + ':' + userpw).toString('base64');

const request = axios.create({
    // baseURL , header, authorization 내용 세팅
    baseURL,
    headers: {
        Authorization: 'Basic ' + baseAuth,
        'Content-type': 'application/json',
    },
});
// axios.post('http://localhost:3000') === request.post('/')
/*
    const userid = process.env.USERID || 'web7722'
    const userpw = process.env.USERPW || '1234'
    const baseURL = process.env.BASEURL || 'http://localhost:3000'
    const baseAuth = Buffer.from(userid + ':' + userpw).toString('base64')
    header: {
        authorization: 'basic ' + baseAuth
    }
*/

app.use(express.json());
app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app,
    watch: true,
});

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/newWallet', (req, res) => {
    res.json(new Wallet());
});

// list
app.post('/walletList', (req, res) => {
    // console.log('wallet list');
    const list = Wallet.getWalletList();
    res.json(list);
});

// view
app.get('/wallet/:account', (req, res) => {
    const { account } = req.params;
    console.log('wallet', account);
    const privateKey = Wallet.getWalletPrivateKey(account); // privateKey 가져오기
    res.json(new Wallet(privateKey));
});

// sendTransaction
app.post('/sendTransaction', async (req, res) => {
    console.log(req.body);
    const {
        sender: { publicKey, account },
        received,
        amount,
    } = req.body;

    // 서명 만들 때 필요한 값: SHA256(보낼사람:공개키 + 받는사람:계정 + 보낼금액).toString()
    // HASH + PrivateKey -> 서명
    const signature = Wallet.createSign(req.body);

    // txObject 내용 -> 보낼사람:공개키, 받는사람:계정, 보낼금액, 서명
    const txObject = {
        sender: publicKey, // publicKey를 사용해 account를 구할 수 있다.
        received,
        amount,
        signature,
    };

    console.log(txObject);

    const response = await request.post('/sendTransaction', txObject);
    console.log(response.data);
    res.json({});
});

app.listen(3005, () => {
    console.log('server onload #port: 3005');
});
