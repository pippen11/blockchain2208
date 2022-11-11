const socket = require("socket.io");
const { Chat } = require("./models/index.js");

module.exports = (server) => {
  const io = socket(server);
  //소켓서버를 만들어주는 서버 app.listen server정의해놓은 기준

  io.on(
    "connection",
    //매개변수가 connection이랑 그뒤에 하나더해서 두개
    (ws) => {
      Chat.findAll().then((data) => {
        //chat의 db의 모든정보를 다갖고온다 findall ,findone은 조건에맞는하나
        ws.emit("list", { list: data });
      });

      ws.on("login", (data) => {
        ws.userId = data.id;
        ws.emit("login", { id: ws.userId });
        // 나한테?
        ws.broadcast.emit("logininfo", { id: ws.userId });
        //남한테만보냄
      });
      ws.on("logout", (data) => {
        ws.emit("logout");
        //자기자신에게
        ws.broadcast.emit("logoutInfo", { id: ws.userId });
        //나를 제외한 전체
        //io.emit은 전체다
        //예외처리는 정규표현식으로 하는게 편함

        ws.userId = undefined;
        // 나한테?
        //남한테만보냄
      });
      ws.on("chat", async (data) => {
        try {
          if (ws.userId) {
            await Chat.create({ userId: ws.userId, text: data.text });

            io.emit("chat", { id: ws.userId, text: data.text });
          } else {
            ws.emit("chat", { text: "이름을쓰세요" });
          }
        } catch (error) {
          ws.emit("chat", { text: "관리자뭐함" });
          console.error(error);
        }
      });
    }
  );
};
