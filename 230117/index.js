const net = require("net");

const reqParser = require("./lib/req");
const resParser = require("./lib/res");

global.isJson = true;
// app.use(express.json())

const server = net.createServer((client) => {
  client.on("data", (data) => {
    //
    // GET / HTTP/1.1
    // Host: localhost:4193
    // Connection: keep-alive
    // Cache-Control: max-age=0
    // sec-ch-ua: "Not_A Brand";v="99", "Google Chrome";v="109", "Chromium";v="109"
    // sec-ch-ua-mobile: ?0
    // sec-ch-ua-platform: "Windows"
    // Upgrade-Insecure-Requests: 1
    // User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36
    // Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
    // Sec-Fetch-Site: none
    // Sec-Fetch-Mode: navigate
    // Sec-Fetch-User: ?1
    // Sec-Fetch-Dest: document
    // Accept-Encoding: gzip, deflate, br
    // Accept-Language: ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7

    //data찍으면 이런것들이찍힘
    // console.log(data.toString());
    const req = reqParser(data.toString());
    // console.log("req", req);

    //이건 req값들
    // req {
    //   method: 'GET',
    //   url: '/',
    //   version: 'HTTP/1.1',
    //   path: '/',
    //   query: {},
    //   headers: {
    //     host: 'localhost:4193',
    //     connection: 'keep-alive',
    //     cacheControl: 'max-age=0',
    //     secchua: '"Not_A Brand";v="99", "Google Chrome";v="109", "Chromium";v="109"',
    //     secchuamobile: '?0',
    //     secchuaplatform: '"Windows"',
    //     upgradeInsecureRequests: 1,
    //     userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
    //     accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    //     secFetchSite: 'none',
    //     secFetchMode: 'navigate',
    //     secFetchUser: '?1',
    //     secFetchDest: 'document',
    //     acceptEncoding: 'gzip, deflate, br',
    //     acceptLanguage: 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7'
    //   },
    //   body: ''
    // }

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
