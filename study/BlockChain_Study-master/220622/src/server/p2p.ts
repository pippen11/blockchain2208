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
    private sockets: WebSocket[];
    // public blockchain: Chain;

    constructor() {
        super();
        // this.blockchain = new Chain();
        this.sockets = [];
    }

    getSockets() {
        return this.sockets;
    }

    // 서버 시작하는 실행코드
    listen() {
        // 서버에서 웹소켓을 받을 포트
        const server = new WebSocket.Server({ port: 7545 });
        server.on('connection', (socket) => {
            // 클라이언트 연결 소켓
            console.log(`webSocket connection`);

            // 서버 입장
            // 클라이언트가 연결을 시도했을 때 실행되는 코드
            // 클라이언트가 서버에게 보내는 내용이 담겨 있는 소켓
            this.connectSocket(socket);
        });
    }

    // client 입장에서의 연결코드
    connectToPeer(newPeer: string) {
        // newPeer : "ws://~"
        const socket = new WebSocket(newPeer);

        // 클라이언트 입장
        // 서버에서 클라이언트에게 보내는 내용이 담겨 있는 소켓
        // 'open' : 클라이언트가 서버 쪽에 연결이 완료되었을 때 실행되는 코드. 클라이언트 기준 'open' / 서버 기준 'connection'
        socket.on('open', () => {
            this.connectSocket(socket); // 서버 소켓
        });
    }

    // 서버쪽, 클라이언트쪽 모두에서 실행되는 코드 (둘 다 데이터를 주고 받는다.)
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

        this.errorHandler(socket); // 접속이 끊겼을 때 sockets 배열에서 제거

        // socket.send(JSON.stringify(data));
        const send = P2PServer.send(socket);
        send(data);
    }

    messageHandler(socket: WebSocket) {
        const callback = (_data: string) => {
            console.log(_data); // buffer

            // JSON.parse(Buffer.from(_data).toString());
            const result: Message = P2PServer.dataParse<Message>(_data);
            const send = P2PServer.send(socket);

            switch (result.type) {
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
                    // 블록 검증 코드 이후 블록을 넣을지 말지 결정
                    // ToDo : 내가 가지고 있는 체인에 넣을지 말지 결정
                    // 내 블록의 hash 값와 상대방 블록의 previousHash 값이 같은가?
                    // 같다면 내 체인에 상대방 블록을 넣으면 된다.

                    const [receivedBlock] = result.payload; // [this.getLatestBlock()]

                    const isValid = this.addToChain(receivedBlock);
                    // addToChain 이 성공했을 때는 추가적인 요청이 불필요. break
                    if (!isValid.isError) break;

                    send(message);
                    break;
                }
                case MessageType.receivedChain: {
                    const receivedChain: IBlock[] = result.payload;
                    // 체인 바꿔주는 코드
                    // 긴 체인 선택하기
                    this.handleChainResponse(receivedChain);
                    break;
                }
            }
        };

        socket.on('message', callback);
    }

    errorHandler(socket: WebSocket) {
        const close = () => {
            this.sockets.splice(this.sockets.indexOf(socket), 1);
        };

        // socket 끊겼을 때
        socket.on('close', close);

        // error 발생시
        socket.on('error', close);
    }

    handleChainResponse(receivedChain: IBlock[]): Failable<Message | undefined, string> {
        // 전달 받은 체인이 올바른가?
        const isValidChain = this.isValidChain(receivedChain);

        if (isValidChain.isError) return { isError: true, error: isValidChain.error };

        // 내 체인과 상대방 체인에 대해서 검사하는 코드
        // 1. 받은체인의 최신블록.height === 1 (상대방이 제네시스 블록만 가지고 있음) return
        // 2. 받은체인의 최신블록.height <= 내체인의 최신블록.height return
        // 3. 받은체인의 최신블록.previousHash === 내체인의 최신블록.hash : length 1 차이
        // 여기서 return은 내체인을 바꿀 이유가 없다는 뜻.

        // 4. 내 체인이 더 짧다. 다 바꾸자.
        const isValid = this.replaceChain(receivedChain);
        if (isValid.isError) return { isError: true, error: isValid.error };

        // broadcast
        const message: Message = {
            type: MessageType.receivedChain,
            payload: receivedChain,
        };
        this.broadcast(message);

        return { isError: false, value: undefined };
    }

    broadcast(message: Message): void {
        this.sockets.forEach((socket) => P2PServer.send(socket)(message));
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
