const http = require("http");
const fs = require("fs").promises;

//const app=express()
//app.use((req,res)=>{})
// //생성해두고 어떤거 받을지 추가
// http
//   .createServer((req, res) => {
//     res.writeHead(200, { "content-Type": "text/html; charset=utf-8" });
//     res.write("<h1>할룽</h1>");
//     res.end("<p>완료</p>");
//   })
//   .listen(8080, () => {
//     console.log("8080번 포트로 접속해봐");
//   });

//원래는 각각 이게 기본이 되는애다 각각 옵션마다 따로 설정해줘서저장
//원시적인 방법 이렇게 쓴다정도로 알면된다
http
  .createServer(async (req, res) => {
    try {
      if (req.method === "GET") {
        if (req.url === "/") {
          const data = await fs.readFile("./web/index.html");

          return res.end(data);
        }
      } else if (req.method === "POST") {
        if (req.url === "/api/user") {
          const data = await fs.readFile("./web/index.html");
          return res.end(data);
        } else if (req.method === "OPTIONS") {
        } else if (req.method === "PUT") {
        } else if (req.method === "DELIETE") {
          //등등 일수있따
        }
      }
    } catch (err) {
      console.log(err);
    }
  })
  .listen(8080, () => {
    console.log("8080 포트");
  });
