// html 파일을 가져와서 수정하여 완성된 HTMl을 반환하도록 한다.
// 템플릿 : 만들어져있는 틀,
//-PPT 디자인적으로 완성된 상태에서 우리가 원하는 정보를 넣어서 발표 자료를 만든다.
// -디자인적 또는 코드상에서 완성된 html을 가져다가 우리가 원하는 데이터를 입력하여 페이지를 만든다.
const fs = require("fs");
const path = require("path");

const createHtml = (fileName, data, { styleName, scriptName }) => {
  const target = path.join(__dirname, "../views", fileName);
  //어떤식으로 해석해야하나? /views/board/index.html
  let readLine = fs.readFileSync(target, "utf-8");
  //파일을 읽어온다정도?

  const keys = Object.keys(data); // li
  console.log("keys", keys);
  //여기서의 data는뭐?
  for (let i = 0; i < keys.length; ++i) {
    console.log("keys[i]", keys[i]);
    if (Array.isArray(data[keys[i]])) {
      // console.log("data", data);
      // console.log("data[keys]", data[keys]);
      // console.log("data[keys[i]]", data[keys[i]]);
      //data로 받은 값이 배열이냐? borard부분
      console.log(path.join(target, "../"));
      const subTarget = path.join(target, "../", keys[i] + ".html");
      //li파일을 가져오는것
      // console.log("subTarget", subTarget);
      // C:\Users\KGA_18\Documents\GitHub\blockchain2208\blockchain2208\230120\makeHttp\views\board\li.html
      const subLine = fs.readFileSync(subTarget, "utf-8");
      //이거 가져온이유?
      // console.log("subLine", subLine);
      // <li>{{item}}</li>

      let subReadLine = "";
      for (let j = 0; j < data[keys[i]].length; ++j) {
        subReadLine += subLine.replace(`{{item}}`, data[keys[i]][j]);
        // console.log("test", data[keys[i]][j]);
        //이부분잘모르겠음 data[keys[i][j]]
        console.log("subReadLine", subReadLine);
      }

      readLine = readLine.replace(`{for{${keys[i]}}}`, subReadLine);
      // 파일에 {for{}}부분을 읽어서 subReadLine으로변경?
    } else {
      //배열이 아니면
      readLine = readLine.replace(`{{${keys[i]}}}`, data[keys[i]]);
    }
  }

  if (styleName) {
    const styleTarget = path.join(__dirname, "../views", styleName);
    // 이부분 잘이해안감
    let styleLine = fs.readFileSync(styleTarget, "utf-8");
    readLine = readLine.replace(`{{style}}`, styleLine);
  }

  if (scriptName) {
    const scriptTarget = path.join(__dirname, "../views", scriptName);
    let scriptLine = fs.readFileSync(scriptTarget, "utf-8");
    readLine = readLine.replace(`{{script}}`, `<script>${scriptLine}</script>`);
  }

  // console.log(readLine);
  //   readLine = readLine.replace("{{title}}", "SSR 테스트중?");
  //   readLine = readLine.replace("{{text}}", req.query.text || "처음 써봐요 SSR");
  //req.query.text잇으면 이게뜨고 없으면 처음써봐요가뜸
  //   readLine = readLine.replace("{{link}}", "/test");
  //   readLine = readLine.replace("{{linkName}}", "들어가면 404에요");
  // console.log(readLine);
  return readLine;
};

module.exports = createHtml;
