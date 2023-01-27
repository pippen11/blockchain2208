//npm i ws express
//npm i -D @types/ws @types/express 타입스크립트에서 지원 @types는 폴더가아님

import { WebSocket, WebSocketServer } from "ws";
// websocket서버 라이브러리
import Chain from "@core/chain";
// 체인 가져옴

// const TYPE = {
//   BLOCK: 1,
//   CHAIN: 2,
// };

//TYPE.BLOCK

enum MessageType {
  // enum : 배열과 비슷한 순서가 있는 데이터이다.
  //  -열거형 이라고 한다.
  // -위의 코드와 같은 역할을 한다.
  // - 변수에 정의할 값을 미리 정의했다고 생각하자.
  // MesseageType << 왜정의 했느냐? 어떤 메세지를 주고 받았는지 확인하기 위해서 타입으로 설정했다.
  lastBlock = 0,
  // 마지막 블록을 달라고 하고 준다
  allBlock = 1,
  // 전체 체인 달라고 하고 준다.
  addBlock = 2,
  // 블록이 추가됐다고 알려주고 뭐가 추가됐는지 알려준다.
}
// 오타 같은 오류를 줄이기 위해서 사용한다.

interface IMessage {
  // 주고 받을 메세지에 대한 타입
  type: MessageType;
  // 어떤 메세지를 주고 받았는지 확인
  payload: any;
  // 메세지에 담긴 데이터
  msg: string;
}

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
  connectSocket(socket: WebSocket, type?: MessageType): void {
    //요청한사람입장에서 type없음
    console.log("connectSocket");
    // 소켓을 연결한다.
    this.sockets.push(socket);
    // 따로따로 동시에 소켓정보를 저장(소켓정보:주소)
    // 연결된 소켓을 소켓 목록에 추가한다.(peer 목록에 추가)
    // - 후에 어디랑 연결됐는지 확인할 때 등 사용한다.
    socket.on("message", (_data: string) => {
      //메세지를 받았을때 난 이런행동하겠다
      // messeage 이벤트가 발생하면 로그로 남긴다.
      // console.log(_data.toString());
      console.log("message");

      const data: IMessage = JSON.parse(_data.toString());
      console.log(data);
      // 받은 메세지를 객체로 파싱
      switch (data.type) {
        //어떤 요청이 왔는가 type으로 확인해서
        case MessageType.lastBlock: {
          // 마지막 불록 달라고 했으니까.
          const message: IMessage = {
            type: MessageType.allBlock,
            //제대로 받았나 확인위해
            payload: [this.lastBlock],
            // 마지막 블록을 payload에 담아서
            msg: "lastBlock 신상목이 보냈다.",
          };
          socket.send(JSON.stringify(message));
          // 보내자
          break;
        }
        case MessageType.allBlock: {
          const [newBlock]: [IBlock] = data.payload;
          const isValid: IBlock | null = this.add2Chain(newBlock);

          if (isValid !== null) break;
          // isValid가 null이 아니다 => 체인에 블록이 정상적으로 추가됐다.

          //체인에 블록이 정상적으로 추가되지 않았을때 전체 체인(getChain)을 보내서 확인해보자.
          const message: IMessage = {
            type: MessageType.addBlock,
            payload: this.getChain,
            msg: "allBlock 신상목이 보냈다.",
          };

          socket.send(JSON.stringify(message));
          break;
        }
        case MessageType.addBlock:
          const isValidChain = this.isValidChain(data.payload);
          if (isValidChain.isError === true) {
            console.log(isValidChain.msg);
            break;
          }

          const isValid = this.replaceChain(data.payload);
          if (isValid.isError === true) {
            console.log(isValid.msg);
            break;
          }
          //오류없어서 체인 덮어씌움

          // 나랑 연결된 피어들에게 내가 데이터 바뀌었음을 알림
          const message: IMessage = {
            type: MessageType.addBlock,
            payload: data.payload,
            msg: "addBlock 신상목이 보냈다.",
          };

          this.sockets.forEach((item) => {
            item.send(JSON.stringify(message));
            //JSON.stringify-> JSON화 한다(객체는 키와값으로 이루어져있어서)
          });

          break;
      }
    });

    const message: IMessage = {
      //
      // 처음 연결 시 요청을 보내자 , 마지막 블럭 주세요
      type: type | MessageType.lastBlock,
      payload: type ? this.getChain : [],
      msg: "처음 신상목이 보냈다.",
    };
    socket.send(JSON.stringify(message));
    //상대방한테 메세지를 보냄
    // message 객체를 주고받을때는 JSON형식으로 보내야함
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
      //요청한쪽은 socket start
      console.log("socket start");
      this.connectSocket(socket);
      //매개변수하나 socket뒤에 , 값이없어서 undefined들어감
      //socket을 추가한다.
    });
  }
  //blcokmin/ chains은 http방식
  //여기서 부터 peer
  addToPeer(peer: string): void {
    //연결함
    console.log("addToPeer");
    console.log("peer :", peer);
    // 소켓을 생성하고 연결한다.
    // 요청을 받았는데 열려있냐
    //이게 peer2?
    //peer은 주소 라서 스트링
    const socket: WebSocket = new WebSocket(peer);
    //소켓을 연결해달라
    //여기가 주파수(peer)맞추는것
    // 상대 소켓 서버 주소를 받아서 연결을 시도한다.
    //연결 요청(socket, peer1 connection 이벤트 발생, peer2 open 이벤트 발생) 여기까지는 순차적할때씀
    socket.on("open", () => {
      // 연결 성공시 open 이벤트가 발생한다.(처음 요청받은쪽)
      console.log("open");
      this.connectSocket(socket, MessageType.addBlock);
      // 연결에 성공하면 소켓을 추가한다.
    });
  }
}

export default P2P;
