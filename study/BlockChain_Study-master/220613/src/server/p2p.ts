import { WebSocket } from 'ws';

export class P2PServer {
    // 서버 시작하는 실행코드
    listen() {
        const server = new WebSocket.Server({ port: 7545 });
        server.on('connection', (socket) => {
            console.log(`webSocket connection`);
        });
    }

    // client 입장에서의 연결코드
    connectToPeer(newPeer: string) {
        // newPeer : "ws://~"
        const socket = new WebSocket(newPeer);
    }
}
