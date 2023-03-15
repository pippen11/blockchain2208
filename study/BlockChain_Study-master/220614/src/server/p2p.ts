import { WebSocket } from 'ws';
import { Chain } from '@core/blockchain/chain';

// 클라이언트도 될 수 있고 서버도 될 수 있다.
// 똑같이 동작하는 코드를 작성.

enum MessageType {
    latest_block = 0,
    all_block = 1,
    receivedChain = 2,
}

interface Message {
    type: MessageType;
    // data의 경우 다양한 형태로 들어올 수 있기 때문에 any 사용.
    payload: any;
}

export class P2PServer extends Chain {
    public sockets: WebSocket[];
    // public blockchain: Chain;

    constructor() {
        super();
        // this.blockchain = new Chain();
        this.sockets = [];
    }

    // 서버 시작하는 실행코드
    listen() {
        // 서버에서 웹소켓을 받을 포트
        const server = new WebSocket.Server({ port: 7545 });
        server.on('connection', (socket) => {
            console.log(`webSocket connection`);

            // 나는 서버
            // 클라이언트가 연결을 시도했을 때 실행되는 코드
            // 클라이언트가 서버에게 보내는 내용이 담겨 있는 소켓
            this.connectSocket(socket);
        });
    }

    // client 입장에서의 연결코드
    connectToPeer(newPeer: string) {
        // newPeer : "ws://~"
        const socket = new WebSocket(newPeer);

        // 나는 클라이언트
        // 서버에서 클라이언트에게 보내는 내용이 담겨 있는 소켓
        // 'open' : 클라이언트가 서버 쪽에 연결이 완료되었을 때 실행되는 코드. 클라이언트 기준 'open' / 서버 기준 'connection'
        socket.on('open', () => {
            this.connectSocket(socket);
        });
    }

    // connectSocket(socket: WebSocket) {
    //     // broadcasting 하기 위해 배열에 담는다.
    //     this.sockets.push(socket);
    //     socket.on('message', (data: string) => {
    //         console.log(data);
    //         console.log(Buffer.from(data).toString());
    //     });

    //     socket.send('재즈가 뭐라고 생각하세요?');
    // }

    connectSocket(socket: WebSocket) {
        // broadcasting 하기 위해 배열에 담는다.
        this.sockets.push(socket);

        this.messageHandler(socket);

        // socket 에서도 type에 따라 다른 데이터를 보내줘야 한다.
        // {type:'', payload: ''}
        // 응답 string -> object
        // 요청 object -> string

        const data: Message = {
            type: MessageType.latest_block,
            payload: {},
        };

        // socket.send(JSON.stringify(data));
        const send = P2PServer.send(socket);
        send(data);
    }

    messageHandler(socket: WebSocket) {
        const callback = (_data: string) => {
            console.log(_data); // buffer

            // JSON.parse(Buffer.from(_data).toString());
            const message: Message = P2PServer.dataParse<Message>(_data);
            const send = P2PServer.send(socket);

            switch (message.type) {
                // type이 두가지 이상 생겼을 때 case문으로 처리 가능
                case MessageType.latest_block: {
                    // 내용
                    const message: Message = {
                        type: MessageType.all_block,
                        payload: [this.getLatestBlock()],
                    };
                    send(message);
                    break;
                }
                case MessageType.all_block: {
                    const message: Message = {
                        type: MessageType.receivedChain,
                        payload: this.getChain(),
                    };
                    // 블록 검증 코드 (이후 블록을 넣을지 말지 결정)
                    send(message);
                    break;
                }
                case MessageType.receivedChain: {
                    const receivedChain: IBlock[] = message.payload;
                    console.log(receivedChain);
                    // 체인 바꿔주는 코드
                    break;
                }
            }
        };

        socket.on('message', callback);
    }

    static send(_socket: WebSocket) {
        return (_data: Message) => {
            _socket.send(JSON.stringify(_data));
        };
    }

    static dataParse<T>(_data: string): T {
        // const result = JSON.parse(Buffer.from(data).toString());

        // if (result === undefined) return { isError: true, error: '변환 실패' };
        // return { isError: false, value: result };

        return JSON.parse(Buffer.from(_data).toString());
    }
}
