// HTTP 통신 : 80번 포트사용 , 클라이언트가 요청을 하고 서버가 그요청에 대해서 응답한다.
//요청과 응답 << 요청이 없으면 응답을 보낼수 없지 << 서버가 클라이언트에게 마음대로 데이터나 정보등을 보낼수없다.
//이러한 방식이 아닌 서버에서도 마음대로 데이터를 보낼수있도록 하는 방식이
//SOKET통신이다 <보통 C++ ,C ,JAVA등으로 구현한다.<< 프로그램에서 사용한다.
// 웹에서도 이러한 방식이 필요하다고 느껴서 만들어진게 web socket
//요즘은 거의 쓰이지 않지만 기초적인 라이브러리가 ws
// HTTPS 통신이랑 비교를 할때 인증서 언급

const WebSocket = require("ws");

//소켓쪽은 응답주고받는게 무조건은 아님
module.exports = (server) => {
  const socket = new WebSocket.Server({ server });
  //소켓을 연결한다 (계속 연결이 되어잇는 상태)
  //무언가 안뜨더라도 /확인이 안되더라도 연결은 계속 되어있다

  //on으로 주고받음
  let count = 0;
  socket.on("connection", (ws, req) => {
    console.log("socket start");
    ws.on("message", (msg) => {
      console.log(msg.toString());
    });

    ws.interval = setInterval(() => {
      ws.send(count++);
      //데이터를 전송한다 << 데이터를 보낸다
      //연결된곳에 보냄
    }, 1100);
    ws.on("close", () => {
      clearInterval(ws.interval);
      console.log("disconnection");
    });
  });
};
