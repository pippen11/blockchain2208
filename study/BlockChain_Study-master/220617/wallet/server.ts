import express from 'express';
import nunjucks from 'nunjucks';
import { Wallet } from './wallet';

const app = express();

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

app.listen(3005, () => {
    console.log('server onload #port: 3005');
});
