import { BlockChain } from '@core/index'
import { P2PServer, Message, MessageType } from './src/serve/p2p'
import peers from './peer.json'
import express from 'express'
import { ReceviedTx } from '@core/wallet/wallet'
import { Wallet } from '@core/wallet/wallet'

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

app.post('/sendTransaction', (req, res) => {
    /* blockchain server
    {
        sender: '0376f781b427b7ff84f39bb60b10187335f40af237c8fe4764bdabbf6f34c340ff',
        received: '90efc23505a72d5a7062918585f75994f8d38df6',
        amount: 10,
        signature: Signature {
            r: BN { negative: 0, words: [Array], length: 10, red: null },
            s: BN { negative: 0, words: [Array], length: 10, red: null },
            recoveryParam: 1
        }
    }
    */
    try {
        const receivedTx: ReceviedTx = req.body
        Wallet.sendTransaction(receivedTx)
    } catch (e) {
        if (e instanceof Error) console.error(e.message)
    }

    res.json([])
})

app.listen(3000, () => {
    console.log('서버시작 3000')
    ws.listen()
})

//192.168.0.232
//192.168.0.243
