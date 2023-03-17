import { WebSocket } from 'ws'
import { Chain } from '@core/blockchain/chain'

export enum MessageType {
    latest_block = 0,
    all_block = 1,
    receivedChain = 2,
    receivedTx = 3,
}

export interface Message {
    type: MessageType
    payload: any
}

export class P2PServer extends Chain {
    private sockets: WebSocket[]

    constructor() {
        super()
        this.sockets = []
    }

    getSockets() {
        return this.sockets
    }

    // 서버 시작하는 실행코드
    listen() {
        const server = new WebSocket.Server({ port: 7545 })
        server.on('connection', (socket) => {
            console.log(` websocket connection `)

            this.connectSocket(socket)
        })
    }

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
        this.errorHandler(socket)
        this.send(socket)(data)
    }

    messageHandler(socket: WebSocket) {
        const callback = (data: string) => {
            // export interface Message {
            //     type: MessageType
            //     payload: any
            // }
            const result: Message = P2PServer.dataParse<Message>(data)
            const send = this.send(socket)

            switch (result.type) {
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
                        payload: this.getChain(),
                    }

                    const [receivedBlock] = result.payload
                    // 블록2개인사람이 전달받은 블럭이 제네시스블럭일때
                    const isVaild = this.addToChain(receivedBlock)
                    if (!isVaild.isError) break

                    send(message)
                    break
                }
                case MessageType.receivedChain: {
                    const receivedChain: IBlock[] = result.payload
                    this.handleChainResponse(receivedChain)
                    break
                }

                case MessageType.receivedTx: {
                    const recivedTransaction: ITransaction = result.payload
                    if (recivedTransaction === null) break

                    const withTransaction = this.getTransactionPool().find((_tx: ITransaction) => {
                        return _tx.hash === recivedTransaction.hash
                    })

                    if (!withTransaction) {
                        // 받은 트랜잭션 내용이 내 트랜잭션풀에 없다면.
                        this.appendTransactionPool(recivedTransaction)

                        const message: Message = {
                            type: MessageType.receivedTx,
                            payload: recivedTransaction,
                        }
                        this.broadcast(message)
                    }

                    break
                }
            }
        }

        socket.on('message', callback)
    }

    errorHandler(socket: WebSocket) {
        const close = () => {
            this.sockets.splice(this.sockets.indexOf(socket), 1)
        }
        socket.on('close', close)
        socket.on('error', close)
    }

    send(_socket: WebSocket) {
        return (_data: Message) => {
            _socket.send(JSON.stringify(_data))
        }
    }

    broadcast(message: Message): void {
        this.sockets.forEach((socket) => this.send(socket)(message))
    }

    handleChainResponse(receivedChain: IBlock[]): Failable<Message | undefined, string> {
        // 전달받은체인이 일단 옳바른가 ?
        const isVaildChain = this.isValidChain(receivedChain)
        if (isVaildChain.isError) return { isError: true, error: isVaildChain.error }

        const isVaild = this.replaceChain(receivedChain)
        if (isVaild.isError) return { isError: true, error: isVaild.error }

        // broadcast
        const message: Message = {
            type: MessageType.receivedChain,
            payload: receivedChain,
        }
        this.broadcast(message)
        return { isError: false, value: undefined }
    }

    static dataParse<T>(_data: string): T {
        return JSON.parse(Buffer.from(_data).toString())
    }
}
