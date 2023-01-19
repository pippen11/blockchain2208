const fs = require("fs");
const path = require("path");

const parser = (client, req) => {
  function createMessage(data) {
    const dataBuffer = Buffer.from(data);
    let contentType = req.headers.accept;
    if (contentType.indexOf("text/html") > -1) contentType = "text/html";
    return `HTTP/1.1 200 OK
Connection: Close
Content-Type: ${contentType}; charset=UTF-8
Content-Length: ${dataBuffer.length}

${dataBuffer.toString()}`;
  }

  return {
    send: (data) => {
      const message = createMessage(data);
      client.write(message);
    },
    sendFile(fileName) {
      const target = path.join(__dirname, "../public", fileName);
      //퍼블릭폴더를 찾아가는 기준이됨 전체폴더경로
      const readLine = fs.readFileSync(target, "utf-8");
      const message = createMessage(readLine);
      client.write(message);
    },
    sendStaticFile(target) {
      const readLine = fs.readFileSync(target, "utf-8");
      const message = createMessage(readLine);
      client.write(message);
    },
  };
};

module.exports = parser;
