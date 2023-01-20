const net = require("net"); // A

const reqParser = require("./lib/req");
const resParser = require("./lib/res");
const staticFunc = require("./lib/static");
const templateFunc = require("./lib/template");

global.isJson = true;
global.board = [];
global.isStatic = false;
// 이거 false면 SSR부터 돈다 // true면 클라이언트렌더링
// SSR 구현을 위해 static 방식을 사용하지 않는다.
// app.use(express.static(path.join(__dirname,"public")))
// SSR, Server Side Rendering: 화면을 서버에서 구성해서 보낸다.(랜더링을 서버에서 처리한다.)
// -쉽게 말하자면 HTML 파일을 서버에서 만들어서 응답한다.
// CSR: Client Side Rendering :  서버에서 응답한 데이터를 Client, 브라우저에서 엘리먼트등을 생성해서 완성한다.

if (global.isStatic) global.staticRoutes = staticFunc(); //파일 확인
// global.isStatic이 false니까 global.staticRoutes안가져옴

const server = net.createServer((client) => {
  //이건 그냥 처음부터 실행?
  client.on("data", (data) => {
    //데이터값은 요청받은메세지들(브라우저가 알아서 보내는값)
    const req = reqParser(data.toString());
    const res = resParser(client, req);
    //여기 매개변수 client는 뭐? 어떤클라이언트와연결이 되는가
    // console.log(req.path);
    let isStatic = false;
    // static을 실행했는가?

    if (global.isStatic) {
      // static 넣었으면~ 파일을 확인
      // const staticRoutes = staticFunc();
      if (req.method === "GET" && global.staticRoutes[req.path]) {
        isStatic = true;
        res.sendStaticFile(global.staticRoutes[req.path]);
      }
    }

    if (!isStatic) {
      if (req.method === "GET" && req.path === "/") {
        let text = Object.keys(req.query);
        let textone = text.join("");
        console.log(textone);
        let test = Object.values(req.query);
        let testone = test.join("");
        console.log(testone);

        // console.log(test);
        const temp = templateFunc(
          "index.html",
          //templateFunc에서의 fileName매개변수
          {
            title: "SSR 테스트중?",
            text: testone || "처음 써봐요 SSR",

            link: "/board",
            linkName: "게시판",
          },
          { styleName: "index.css", scriptName: "index.js" }
          //여기서의 index.css파일 js파일은어느거?
        );
        res.send(temp);
        //get형식이면서 path가 /면 index.html로 응답
        // app.get("/",(req,res)=>{})
        //GET 형식으로 / 라우터로 요청이 왔을때 public 폴더의 index.html파일으로 응답한다.
        res.sendFile("index.html");
      } else if (req.method === "GET" && req.path === "/board") {
        const temp = templateFunc(
          "board/index.html",
          {
            li: global.board,
          },
          { scriptName: "board/index.js" }
        );
        res.send(temp);
        //여기서는 위처럼 sendfile해줄필요없나?

        // res.sendFile("index.html");
        // res.sendFile("/board/board.html");
      } else if (req.method === "POST" && req.path === "/board/add") {
        global.board.unshift(req.body.value);
        //unshift로 값넣어주는이유?
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
