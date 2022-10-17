const fs = require("fs");
//fs는 파일 시스템

const fsProm = fs.promises;
//텀을두고 주고받음

fsProm
  .readFile("./test.txt")
  .then((data) => {
    console.log(data);
    console.log(data.toString());
  })
  .catch((err) => {
    console.log(err);
  });
