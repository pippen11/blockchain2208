import { BlockChain } from '@core/index'
import { P2PServer, Message, MessageType } from './src/serve/p2p'
import peers from './peer.json'
import express from 'express'

const app = express()
const bc = new BlockChain()
const ws = new P2PServer()

app.use(express.json())

app.use((req, res, next) => {
    const baseAuth: string = (req.headers.authorization || '').split(' ')[1]
    if (baseAuth === '') return res.status(401).send()

    const [userid, userpw] = Buffer.from(baseAuth, 'base64').toString().split(':')
    if (userid !== 'web7722' || userpw !== '1234') return res.status(401).send()

    next()
})

app.get('/', (req, res) => {
    res.send('ingchain')
})

// 블록내용
app.get('/chains', (req, res) => {
    res.json(ws.getChain())
})

// 블록채굴 ->
app.post('/mineBlock', (req, res) => {
    const { data } = req.body
    const newBlock = ws.addBlock(data)
    if (newBlock.isError) return res.status(500).send(newBlock.error)
    const msg: Message = {
        type: MessageType.latest_block,
        payload: {},
    }
    ws.broadcast(msg)
    res.json(newBlock.value)
})

app.post('/sendTransaction', (req, res) => {
    try {
        const { sender, received, amount, signature } = req.body
    } catch (e) {}
})

app.post('/addToPeer', (req, res) => {
    const { peer } = req.body

    ws.connectToPeer(peer)
})

app.get('/addPeers', (req, res) => {
    peers.forEach((peer) => {
        ws.connectToPeer(peer)
    })
})

app.get('/peers', (req, res) => {
    const sockets = ws.getSockets().map((s: any) => s._socket.remoteAddress + ':' + s._socket.remotePort)
    res.json(sockets)
})

app.listen(3000, () => {
    console.log('서버시작 3000')
    ws.listen()
})

//192.168.0.232
//192.168.0.243
