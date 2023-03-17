import { WebSocket } from 'ws'
import { Chain } from '@core/blockchain/chain'

enum MessageType {
    latest_block = 0,
    all_block = 1,
    receivedChain = 2,
}

interface Message {
    type: MessageType
    payload: any
}

export class P2PServer extends Chain {
    public sockets: WebSocket[]

    constructor() {
        super()
        this.sockets = []
    }

    // 서버 시작하는 실행코드
    listen() {
        const server = new WebSocket.Server({ port: 7545 })
        server.on('connection', (socket) => {
            console.log(` websocket connection `)

            this.connectSocket(socket)
        })
    }

    // client 연결코드
    connectToPeer(newPeer: string) {
        const socket = new WebSocket(newPeer)
        socket.on('open', () => {
            this.connectSocket(socket)
        })
    }

    connectSocket(socket: WebSocket) {
        this.sockets.push(socket)
        this.messageHandler(socket)
        const data: Message = {
            type: MessageType.latest_block,
            payload: {},
        }

        this.send(socket)(data)
    }

    messageHandler(socket: WebSocket) {
        const callback = (data: string) => {
            const message: Message = P2PServer.dataParse<Message>(data)
            const send = this.send(socket)

            switch (message.type) {
                case MessageType.latest_block: {
                    // 내용
                    const message: Message = {
                        type: MessageType.all_block,
                        payload: [this.getLatestBlock()],
                    }
                    send(message)
                    break
                }
                case MessageType.all_block: {
                    const message: Message = {
                        type: MessageType.receivedChain,
                        payload: this.getChian(),
                    }
                    // 블록검증코드이후 블록을 넣을지말지.
                    send(message)
                    break
                }
                case MessageType.receivedChain: {
                    const receivedChain: IBlock[] = message.payload
                    console.log(receivedChain)
                    // 체인바꿔주는 코드
                    break
                }
            }
        }

        socket.on('message', callback)
    }

    send(_socket: WebSocket) {
        return (_data: Message) => {
            _socket.send(JSON.stringify(_data))
        }
    }

    static dataParse<T>(_data: string): T {
        return JSON.parse(Buffer.from(_data).toString())
    }
}
