// import Block from "@core/block/block";
// import Chain from "@core/chain";

// const genesis = new Block(["첫 블록"]);
// console.log("genesis :", genesis);

// const second = new Block(["두번째 블록"], genesis);
// console.log("second :", second);

// // npm i -D ts-jest
// //npx ts-node src/index 로 실행
// const previousBlock = new Block(["이전 블록"]);
// previousBlock.height = 29;
// previousBlock.difficulty = 10;
// const adjustmentBlock = new Block(["단위 개수 전 블록"]);
// adjustmentBlock.height = 20;
// adjustmentBlock.difficulty = 11;

// const newBlock = new Block(["asdf"], previousBlock, adjustmentBlock, {
//   DAI: 10,
//   averageGenerationTime: 60 * 1000,
// });

// console.log(newBlock);

// const chain = new Chain();

// for (let i = 0; i < 300; i++) {
//   chain.addBlock([`test block ${i}`]);
// }

// npm i -g ts-node
//ts-node src/index

import P2P from "./p2p";
import express, { Express, Request, Response } from "express";

//esModuleInterop:true 있어서 한번에 적을수있다 tsconfig.json파일

const app: Express = express();
// 그냥 라이브러리의 Exprsss타입으로 해줌
const ws: P2P = new P2P();

app.use(express.json());

app.get("/chains", (req: Request, res: Response) => {
  res.json(ws.getChain);
  //체인가져올려고 넣음
});

app.post("/block/mine", (req: Request, res: Response) => {
  //체인 추가하려고넣음
  const { data }: { data: Array<string> } = req.body;
  const newBlock: IBlock | null = ws.addBlock(data);
  if (newBlock === null) res.send("error data");
  res.json(newBlock);
});

app.post("/");
// 데이터를 json형식으로 주고받겠다 json형식으로 파싱해줌 string으로바꿈 ->알아서 1,0으로바꿈?
//TCP 이쪽은 1계층에선 1이랑 0으로만 주고받음 4계층까지 binary(1,0)로 내려옴 buffer 를 string으로바꿈 4계층에서는 string으로주고받음

// JSON.stringify({a:1})// 스트링으로 바꾸겟다  자료형에서 json은 스트링

app.post("/peer/add", (req: Request, res: Response) => {
  const { peer }: { peer: string } = req.body;
  ws.addToPeer(peer);
  res.end();
});

app.get("/peer", (req: Request, res: Response) => {
  const sockets = ws.getSockets.map(
    (item: any) => item._socket.remoteAddress + ":" + item._socket.remotePort
  );
  // 나한테 연결된 피어 주소들을 볼수있다.
  res.json(sockets);
});

const ports = [
  [8080, 7545],
  [8081, 7546],
];
const idx = 0;

// peer1에서 peer2로 연결요청을 할꺼다
// 요청을보내는 주체는 peer1(7545) 그래서 포스트맨에서 7545로보냄
// 우리가보낸(포스트맨)에서 보낸 주소를 기준으로 소켓을 보냄 peer1에서는 요청을 받음 peer2는 요청을보냄
//idx 0일때 왼쪽(open) 오른쪽은(peer1) socket start 1로바꾸면 오른쪽실행
app.listen(ports[idx][0], () => {
  console.log("server start" + ports[idx][0]);
  ws.listen(ports[idx][1]);
  //listen함수에 안에있는걸 보냄
  // WebSocket(P2P) 서버 생성/배포
});
