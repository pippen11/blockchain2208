const fs = require("fs");
const path = require("path");

const parser = (client, req) => {
  function createMessage(data) {
    const dataBuffer = Buffer.from(data);
    let contentType = req.headers.accept;
    if (contentType.indexOf("text/html") > -1) contentType = "text/html";
    return `HTTP/1.1 200 OK
Connection: Close 
Conntent-Type: ${contentType}; charset=UTF-8
Content-Length: ${dataBuffer.length}
//데이터의 길이로 잡으면 스트링1은 1 버퍼로잡으면 3 스트링렝스는 더짧게나와서 잘림(최대길이수는 우리가정함)

${dataBuffer.toString()}`;
  }
  return {
    send: (data) => {
      const message = createMessage(data);
      client.write(message);
    },
    sendFile(fileName) {
      const target = path.join(__dirname, "../public", fileName);
      const readLine = fs.readFileSync(target, "utf-8");
      const message = createMessage(readLine);
      client.write(message);
    },
  };
};

module.exports = parser;
