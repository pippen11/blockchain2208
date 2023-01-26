//npm i ws express
//npm i -D @types/ws @types/express 타입스크립트에서 지원 @types는 폴더가아님

import { WebSocket, WebSocketServer } from "ws";
// websocket서버 라이브러리
import Chain from "@core/chain";
// 체인 가져옴

class P2P extends Chain {
  // 기존체인이 P2P에들어감
  //Chain을 상속받는 이유: 현재 P2P 서버에 기존의 체인을 상속함으로써 블록 추가등에 있어서 편함
  private sockets: Array<WebSocket>; // 연결된 peer의 목록 <WebSocket>은 위에 import한거넣어줌

  constructor() {
    super();
    this.sockets = [];
  }

  get getSockets(): Array<WebSocket> {
    return [...this.sockets];
  }

  //이건 양쪽에서 다씀
  connectSocket(socket: WebSocket): void {
    // 소켓을 연결한다.
    this.sockets.push(socket);
    // 연결된 소켓을 소켓 목록에 추가한다.(peer 목록에 추가)
    // - 후에 어디랑 연결됐는지 확인할 때 등 사용한다.
    socket.on("message", (_data: string) => {
      // messeage 이벤트가 발생하면 로그로 남긴다.
      console.log(_data.toString());
    });

    socket.send("sdfsdf");
    // 방금 연결한 소켓 서버에  message 이벤트를 보낸다.
  }

  //1 소켓은 peer다
  listen(port: number): void {
    // 현재 로컬에 서버를 생성, 배포한다.
    const server: WebSocketServer = new WebSocket.Server({ port });
    // 서버를 생성한다.
    // 가나슈(Ganache) 라는 개인(로컬)용 블록체인이 있다.(로컬 네트워크없이 돌아가는애)<< 네트워크없이 진행가능하다
    // 이 가나슈의 초기 port 설정이 7545이다.
    server.on("connection", (socket: WebSocket) => {
      //connection이생길때 메서드를 실행할수있게 준비해놔라
      // 내가 요청보냈을때 연결되면 socketstart
      // 서버에 연결이 들어왔을때 s
      console.log("socket start");
      this.connectSocket(socket);
      //socket을 추가한다.
    });
  }

  addToPeer(peer: string): void {
    // 소켓을 생성하고 연결한다.
    // 요청을 받았는데 열려있냐
    //이게 peer2?
    //peer은 주소 라서 스트링
    const socket: WebSocket = new WebSocket(peer);
    //여기가 주파수(peer)맞추는것
    // 상대 소켓 서버 주소를 받아서 연결을 시도한다.
    //연결 요청(socket, peer1 connection 이벤트 발생, peer2 open 이벤트 발생) 여기까지는 순차적할때씀
    socket.on("open", () => {
      // 연결 성공시 open 이벤트가 발생한다.
      console.log("open");
      this.connectSocket(socket);
      // 연결에 성공하면 소켓을 추가한다.
    });
  }
}

export default P2P;
