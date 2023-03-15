// /core index.ts 가져오기
import { BlockChain } from '@core/index';
import { P2PServer } from './src/server/p2p';
import express from 'express';

const app = express();
const bc = new BlockChain();
// bc.chain.getChain() <- 체인 가져오기

const ws = new P2PServer();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('bit-chain');
});

// 블록 내용 조회 api
app.get('/chains', (req, res) => {
    res.json(bc.chain.getChain());
});

// 블록 채굴 api
app.post('/mineBlock', (req, res) => {
    const { data } = req.body;
    const newBlock = bc.chain.addBlock(data);
    if (newBlock.isError) return res.status(500).send(newBlock.error);

    res.json(newBlock.value);
});

app.post('/addToPeer', (req, res) => {
    const { peer } = req.body;
    ws.connectToPeer(peer);
});

app.listen(3000, () => {
    console.log('server onload 3000');
    ws.listen();
});
