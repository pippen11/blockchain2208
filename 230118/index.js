const net = require("net");

const reqParser = require("./lib/req");
const resParser = require("./lib/res");

global.isJson = true;
global.board = ["asdf", "qwer", "1234"];
//게시판 목록이다.

const server = net.createServer((client) => {
  //TCP 서버를 만든다.
  client.on("data", (data) => {
    //연결이 생성됐을때 요청보냄 data을 받아서 처리 데이터로는 다른파일에 주석처리해놓은 긴 문장 전체가 들어옴
    // 연결이 생성 됐을때 그 연결된 클라이언트에서 요청이 들어오는 것을 처리한다.
    const req = reqParser(data.toString());
    // console.log("req다", req);
    const res = resParser(client, req);
    // console.log(req.path);
    // console.log(res);
    // console.log("----------");
    //연결이 생겼다.
    // / 일단 html읽고  연결이 생겼다는 요청을 보낼때마다 나옴
    // 연결이 생겼다.
    // /index.css 읽다가 css파일읽고
    // 연결이 생겼다.
    // /index.js 읽다가 js파일 읽고
    // 연결이 생겼다.
    // /favicon.ico 읽다가 파비콘 파비콘은 못읽어서 요청한번나옴?
    // 연결이 생겼다.

    //라우터 구현
    // Routes해서 쓴게 이거다
    // req, 요청으로 들어온 정보를 가져와서 path와 method에 따라 라우터를 구분하여 응답을 보낸다.
    if (req.method === "GET" && req.path === "/") {
      //get형식이면서 path가 /면 index.html로 응답
      // app.get("/",(req,res)=>{})
      //GET 형식으로 / 라우터로 요청이 왔을때 public 폴더의 index.html파일으로 응답한다.
      res.sendFile("index.html");
    } else if (req.method === "GET" && req.path === "/index.css") {
      res.sendFile("index.css");
    } else if (req.method === "GET" && req.path === "/index.js") {
      res.sendFile("index.js");
    } else if (req.method === "GET" && req.path === "/board") {
      // console.log("test1");
      res.sendFile("/board/board.html");
    } else if (req.method === "GET" && req.path === "/board.js") {
      // console.log("test2");
      res.sendFile("/board/board.js");
    } else if (req.method === "GET" && req.path === "/board/list") {
      // console.log("asdfsdf");
      console.log(req.body.value);
      res.send(JSON.stringify(global.board));
      //배열을 보내면 안들어가서 JSON.stringify ->json으로 변환한다
      // string + -ify => string, 문자열로 -ify, -화한다. => 문자열로 변환한다.
    } else if (req.method === "POST" && req.path === "/board/add") {
      global.board.unshift(req.body.value);
      // console.log("test");
      res.send(JSON.stringify(global.board));
      //배열을 보내면 안들어가서 JSON.stringify ->json으로 변환한다
      // string + -ify => string, 문자열로 -ify, -화한다. => 문자열로 변환한다.
    } else {
      //들어온 요청의 형식과 라우터가 정해진 형식과 라이터가 아닐시 404를 응답한다
      res.send("404");
    }

    //app.get, app.post , app.route('/').get().post()
    // if (req.method === "GET") {
    //   switch (req.path) {
    //     case "/":
    //       break;
    //     case "/board":
    //       break;
    //   }
    // }

    // res.sendFile("index.html");
  });
  client.on("close", () => {
    //연결된클라이언트가 연결이 끊었다.
    console.log("요청에 대한 응답 완료");
  });
});

server.on("close", () => {
  //연결 자체가 끊겼을때
  console.log("연결이 끊겼다.");
});

server.on("connection", () => {
  //클라이언트와 연결이 생성됐을때, 핸드쉐이킹이 일어난다. 파일을 받기위해 연결을 다시?
  console.log("연결이 생겼다.");
});

server.listen(4193, "127.0.0.1", () => {
  //서버를 연다 요청받을 준비를 해둔다.
  console.log("4193 서버를 열었다.");
});
