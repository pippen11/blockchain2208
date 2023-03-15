// /core index.ts 가져오기
import { BlockChain } from '@core/index';
import { P2PServer } from './src/server/p2p';
import peers from './peer.json';
import express from 'express';

console.log(peers);

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
    res.json(ws.getChain());
});

// 블록 채굴 api
app.post('/mineBlock', (req, res) => {
    const { data } = req.body;
    const newBlock = ws.addBlock(data);
    if (newBlock.isError) return res.status(500).send(newBlock.error);

    res.json(newBlock.value);
});

app.post('/addToPeer', (req, res) => {
    const { peer } = req.body;
    ws.connectToPeer(peer);
});

app.get('/addPeers', (req, res) => {
    peers.forEach((peer) => {
        ws.connectToPeer(peer);
    });
});

// 연결된 sockets 조회
app.get('/peers', (req, res) => {
    // 배열 안에 있는 소켓 정보 가져오기 (socket 주소)
    const sockets = ws.getSockets().map((s: any) => s._socket.remoteAddress + ':' + s._socket.remotePort);

    res.json(sockets);
});

app.listen(3000, () => {
    console.log('server onload 3000');
    ws.listen();
});
