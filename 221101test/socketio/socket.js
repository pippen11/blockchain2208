const socket = require("socket.io");

module.exports = (server) => {
  const io = socket(server);
  //이걸해야 소켓이 연결됨
  io.on("connection", (ws) => {
    ws.on("hi1", () => {
      io.emit("message1", ws.data);
    });

    ws.on("aa", (data) => {
      ws.data = data;

      console.log(data);
      //   console.log(ws.data);

      io.emit("message1", data);

      //   ws.broadcast.emit("message1", data);
    });
    ws.on("disconnect", () => {
      console.log("disconnection");
      io.emit("disconnect1", "연결끝");
    });
  });
};
