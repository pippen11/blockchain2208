import { WebSocket } from 'ws'

export class P2PServer {
    // 서버 시작하는 실행코드
    listen() {
        const server = new WebSocket.Server({ port: 7545 })
        server.on('connection', (socket) => {
            console.log(` websocket connection `)
        })
    }

    // client 연결코드
    connectToPeer(newPeer: string) {
        const socket = new WebSocket(newPeer)
    }
}
