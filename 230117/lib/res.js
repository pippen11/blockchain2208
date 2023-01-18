const fs = require("fs");
const path = require("path");

const parser = (client, req) => {
  function createMessage(data) {
    const dataBuffer = Buffer.from(data);
    // console.log(dataBuffer);
    let contentType = req.headers.accept;
    // console.log(contentType);
    //text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;
    // q=0.8,application/signed-exchange;v=b3;q=0.9 두줄이이어서들어옴
    if (contentType.indexOf("text/html") > -1) contentType = "text/html";
    return `HTTP/1.1 200 OK
Connection: Close
Conntent-Type: ${contentType}; charset=UTF-8
Content-Length: ${dataBuffer.length}

${dataBuffer.toString()}`;
  }
  return {
    send: (data) => {
      const message = createMessage(data);
      // console.log(message);
      client.write(message);
    },
    sendFile(fileName) {
      const target = path.join(__dirname, "../public", fileName);
      const readLine = fs.readFileSync(target, "utf-8");
      // console.log(readLine);
      const message = createMessage(readLine);
      client.write(message);
    },
  };
};

module.exports = parser;
