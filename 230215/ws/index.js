const express = require("express");
const Web3 = require("web3");

const app = express();

const web3 = new Web3(
  new Web3.providers.WebsocketProvider("ws://localhost:8081")
);

//처음에 localhost 확인가능?

//geth --datadir ~/myGeth --http --http.addr "0.0.0.0" --http.port 8080 --http.corsdomain "*" --http.api "admin,miner,txpool,web3,personal,eth,net" --allow-insecure-unlock --syncmode full --networkid 50
//geth 에서 Websocket 열기
// --ws --ws.port 8081 --ws.addr "0.0.0.0" --ws.origins "*" console
// addr을 다지우면 됨
// 노드버전 18이면 addr "0.0.0.0"이면 되고 노드 버전 16버전이면 지워야함
// miner.setEtherbase(eth.accounts[0]) 채굴계정 설정해주고
// 게스열고-> node index로 소켓통신열어야함 그리고 miner해주고

// node index.js로 서버열기 express서버(node js쪽에서 블록의 정보를 실시간으로 보여줄수있따)

// http 5500 node 8000 geth 8080 websocket 8081

web3.eth.subscribe("newBlockHeaders", (error, result) => {
  console.log(error);
  if (!error) {
    console.log(result);
  }
});

app.listen(8000, () => {
  console.log("8000 server open");
});
