//lib => library => 어떤 때에 이런 이름을 붙이는가? << 다른 프로젝트에 그대로 적용 가능한 코드일때
// express.static 적용 시 라우터에 따라 파일을 바로 응답한다.
// static.js에서 public 내의 파일, 폴더를 미리 읽어둔다.

const fs = require("fs");
const path = require("path");

// console.log("__dirname", __dirname);
// const publicPath = path.join(__dirname, "../", "public");
// console.log("publicPath", publicPath);
// const derectory = fs.readdirSync(publicPath);
// // readdir<<폴더 내 모든 파일/ 폴더의 이름을 가져온다
// // -Sync <<동기로 실행한다.(Promise가 아니다)
// console.log(derectory);
// // [ 'board', 'index.css', 'index.html', 'index.js' ]

// const folderStatus = fs.statSync(publicPath);
// //stat는 파일의 정보를 가져온다.
// // -Sync <<동기로 실행한다.(Promise가 아니다)
// console.log(folderStatus);
// console.log(folderStatus.isFile());
// //파일인지 확인한다 파일이면 true , 폴더면 false

// fs.stat(path.join(publicPath, "index.html"), (err, stat) => {
//   console.log("index.html", stat.isFile());
// });
// // 파일의 정보를 가져와서 파일인지 확인

//Array.join(a)=>a를 각 아이템 사이에 넣고 string화 한다
// path.join(a,b,c, ...)=> a와 b와 c, ...을 연결하여 경로를 만든다.
//path.join("C:\Users","KGA_18","Documents","GitHub","blockchain2208","blockchain2208","230119")>
//=>C:\Users\KGA_18\Documents\GitHub\blockchain2208\blockchain2208\230119>
//mac이나 linux에서는 /, 윈도우에서는 \

function getStaticPath(root = "public") {
  // root가 전달된 값이 없으면 'public'으로 정의한다.
  const staticRoutes = {};
  const publicPath = path.join(__dirname, "../", root);
  //__dirname(현재의실행중인폴더의경로) ../을해야 public으로 갈수있음

  function find(_currentPath) {
    const directory = fs.readdirSync(_currentPath);
    // console.log("directory", directory);

    for (let i = 0; i < directory.length; ++i) {
      const findPath = path.join(_currentPath, directory[i]);
      // const findPath = path.join(publicPath, "index.html");
      // C:\Users\KGA_18\Documents\GitHub\blockchain2208\blockchain2208\230119\public\index.html
      console.log("findPath", findPath);
      const isFile = fs.statSync(findPath).isFile();

      if (isFile) {
        //파일이면
        //staticRoutes=
        //{"/":C:\Users\KGA_18\Documents\GitHub\blockchain2208\blockchain2208\230119\public\index.html"} 이렇게 만드는게 목표
        let router = findPath.replace(publicPath, "");
        console.log("router 1 :", router);
        if (router.indexOf("index.html") > -1)
          router = path.join(router, "../");
        console.log("router 2 :", router);
        router = router.replace(/\\/g, "/");
        console.log("router 3 :", router);
        if (router.length > 1 && router[router.length - 1] === "/")
          router = router.slice(0, router.length - 1);
        //0.-1이면 뒤에서부터자름 slice(0,-1)
        // \를 붙이면 특수문자를 문자로 인식 \하나를 찾기위해 두개가 들어감
        staticRoutes[router] = findPath;
        console.log(staticRoutes);
      } else {
        // 폴더면
        find(findPath);
        //현재board라는 경로를 넣어서
      }
    }
  }
  find(publicPath);
  console.log("staticRoutes", staticRoutes);

  global.staticRoutes = staticRoutes;

  // return staticRoutes;
  //위에 global.staticRoutes=staticRoutes로 안쓰면 이렇게 리턴해줘야함
}

module.exports = getStaticPath;
