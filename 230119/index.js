const net = require("net"); //A

const reqParser = require("./lib/req");
const resParser = require("./lib/res");
const staticFunc = require("./lib/static");
//처음에 이파일이 실행 index.js그리고 불러옴
global.isJson = true;
global.board = ["asdf", "qwer", "1234"];
global.isStatic = true;
//app.use(express.static(path.join(...,...,...)))

if (global.isStatic) staticFunc();
//if(global.isStatic)global.staticRoutes=staticFunc() 이렇게쓰면 return으로 썼을때임
const server = net.createServer((client) => {
  client.on("data", (data) => {
    const req = reqParser(data.toString());
    const res = resParser(client, req);
    console.log(req.path);
    let isStatic = false;
    // static을 실행했는가?

    if (global.isStatic) {
      // 여기는 public안에있는 파일만 확인함
      //static 넣었으면~
      //static은 브라우저 주소입력창에 못넣어서 post불가능
      // const staticRoutes = staticFunc();
      //여기안에 매개변수들어가면 static파일안에 root에 들어감
      if (req.method === "GET" && global.staticRoutes[req.path]) {
        isStatic = true;
        res.sendStaticFile(staticRoutes[req.path]);
        console.log(staticRoutes[req.path]);
      }
    }

    //위에서 요청에대한 응답을 이미보냈으니 다시보내면안됨
    if (!isStatic) {
      //이쪽은 파일이아니라서 따로 실행됨 /board/list 이런거 요청되면
      if (req.method === "GET" && req.path === "/board/list") {
        res.send(JSON.stringify(global.board));
      } else if (req.method === "POST" && req.path === "/board/add") {
        global.board.unshift(req.body.value);
        res.send(JSON.stringify(global.board));
      } else {
        res.send("404");
      }
    }
  });

  client.on("close", () => {
    console.log("요청에 대한 응답 완료");
  });
});

server.on("close", () => {
  console.log("연결이 끊겼다.");
});

server.on("connection", () => {
  console.log("연결이 생겼다.");
});

server.listen(4193, "127.0.0.1", () => {
  console.log("4193 서버를 열었다.");
});
