// BlockChain HTTP 서버

import { P2PServer } from './src/server/p2p';
import peers from './peer.json';
import express, { Request, Response } from 'express';
import { ReceivedTx, Wallet } from '@core/wallet/wallet';

console.log(peers);

const app = express();

const ws = new P2PServer();

app.use(express.json());

// 다른 사람이 내 노드의 블록을 조회하는 것을 방지하기 위함.
// header에 있는 authorization 조회
app.use((req, res, next) => {
    // console.log(req.headers.authorization);
    // req.headers.authorization 타입 -> string | undefined
    const baseAuth: string = (req.headers.authorization || '').split(' ')[1];
    if (baseAuth === '') return res.status(401).send();

    const [userid, userpw] = Buffer.from(baseAuth, 'base64').toString().split(':');
    if (userid !== 'web7722' || userpw !== '1234') return res.status(401).send();
    // console.log(userid, userpw);

    next();
});

app.get('/', (req: Request, res: Response) => {
    res.send('bit-chain');
});

// 블록 내용 조회 api
app.get('/chains', (req: Request, res: Response) => {
    res.json(ws.getChain());
});

// 블록 채굴 api
app.post('/mineBlock', (req: Request, res: Response) => {
    const { data } = req.body;
    const newBlock = ws.addBlock(data);
    if (newBlock.isError) return res.status(500).send(newBlock.error);

    res.json(newBlock.value);
});

app.post('/addToPeer', (req: Request, res: Response) => {
    const { peer } = req.body;
    ws.connectToPeer(peer);
});

app.get('/addPeers', (req: Request, res: Response) => {
    peers.forEach((peer) => {
        ws.connectToPeer(peer);
    });
});

// 연결된 sockets 조회
app.get('/peers', (req: Request, res: Response) => {
    // 배열 안에 있는 소켓 정보 가져오기 (socket 주소)
    const sockets = ws.getSockets().map((s: any) => s._socket.remoteAddress + ':' + s._socket.remotePort);

    res.json(sockets);
});

// sendTransaction 라우터 추가
app.post('/sendTransaction', (req, res) => {
    /* receivedTx 내용
        {
            sender: '02193cc6051f36c77b7dd92d21513b6517f5f8c7efca0f10441a8fa9c52b4fae2f',
            received: 'c0b87bcc610be3bf7d3b26f6dd6ae0a63bb97082',
            amount: 10,
            signature: Signature {
                r: BN { negative: 0, words: [Array], length: 10, red: null },
                s: BN { negative: 0, words: [Array], length: 10, red: null },
                recoveryParam: 0
            }
        }    
    */

    try {
        const receivedTx: ReceivedTx = req.body;

        Wallet.sendTransaction(receivedTx);
    } catch (e) {
        if (e instanceof Error) console.log(e.message);
    }

    res.json({});
});

app.listen(3000, () => {
    console.log('server onload 3000');
    ws.listen();
});
