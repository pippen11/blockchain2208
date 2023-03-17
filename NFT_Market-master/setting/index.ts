import { BlockChain } from './core'
import { P2PServer } from './server/p2p'

import express from 'express'

const HTTP_PORT = process.env.HTTP_PORT || 3000
const WS_PORT = process.env.WS_PORT || 7545

const app = express()
const ws = new P2PServer()

app.use(express.json())

app.get('/', (req, res) => {
    res.send(',,')
})

app.get('/blocks', (req, res) => {
    res.json(ws.getChain())
})

app.post('/mineBlock', (req, res) => {
    const newBlock = ws.addBlock(req.body.data)
    if (newBlock.isError) return res.status(500).json(newBlock.error)
    res.json(newBlock.value)
})

app.get('/peers', (req, res) => {
    const sockets = ws.getSocket().map((s: any) => s._socket.remoteAddress + ':' + s._socket.remotePort)
    res.json(sockets)
})

app.post('/addPeer', (req, res) => {
    try {
        ws.connectToPeer(req.body.peer)
    } catch (e) {
        if (e instanceof Error) console.log(e.message)
    }
    res.send()
})

app.post('/mineTrasnaction', (req, res) => {
    const address = req.body.address
    const amount = req.body.amount
    // const resp =
})

app.post('/sendTransaction', (req, res) => {
    // sender : publicKey
    // recived : adddress
    try {
        const { sender, received, amount, signature } = req.body
    } catch (e) {}
})

app.listen(HTTP_PORT, () => {
    console.log('server listening port :' + HTTP_PORT)
    ws.listen(WS_PORT)
})
