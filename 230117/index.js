const net = require("net");

const reqParser = require("./lib/req");
const resParser = require("./lib/res");

global.isJson = true;
// app.use(express.json())

const server = net.createServer((client) => {
  client.on("data", (data) => {
    console.log(data.toString());
    const req = reqParser(data.toString());
    console.log("req", req);
    const res = resParser(client, req);
    //client.write 이거 보내줌

    // res.send("Hi Block 7 with res send");
    res.sendFile("index.html");

    //express 서버에서 응답 보낼때 => res.send(보낼 데이터)

    //     client.write(`HTTP/1.1 200 OK
    // Connection: Close
    // Conntent-Type: image/avif,image/webp,image/apng,*/*;q=0.8; charset=UTF-8
    // Content-Length: 10

    // Hi Block 7`);
  });
});

server.on("close", () => {
  // Socket 했을때와 마찬가지로 통신에 대한 이벤트를 추가한다.
  console.log("연결이 끊겼다.");
});

server.on("connection", () => {
  console.log("연결이 생겼다.");
});

server.listen(4193, "127.0.0.1", () => {
  console.log("4193 서버를 열었다.");
});
