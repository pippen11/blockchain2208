import { BlockChain } from '@core/index'
import { P2PServer } from './src/serve/p2p'
import express from 'express'

const app = express()
const bc = new BlockChain()
const ws = new P2PServer()

app.use(express.json())
app.get('/', (req, res) => {
    res.send('ingchain')
})

// 블록내용
app.get('/chains', (req, res) => {
    res.json(bc.chain.getChian())
})

// 블록채굴 ->
app.post('/mineBlock', (req, res) => {
    const { data } = req.body
    const newBlock = bc.chain.addBlock(data)
    if (newBlock.isError) return res.status(500).send(newBlock.error)

    res.json(newBlock.value)
})

app.post('/addToPeer', (req, res) => {
    const { peer } = req.body
    ws.connectToPeer(peer)
})

app.listen(3000, () => {
    console.log('서버시작 3000')
    ws.listen()
})

//192.168.0.232
//192.168.0.243
