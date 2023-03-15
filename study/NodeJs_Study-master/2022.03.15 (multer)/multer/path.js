// 파일업로드를 하기 위해 알아야할 내부 라이브러리
const path = require('path')

// 윈도우는 C:\program files (x86)\ ...
// 리눅스는 /home/romantiker/..

// 개발을 할 때는 경로를 컨트롤해야 하는 경우가 굉장히 많다.

console.log(__dirname)
// pwd : 절대경로

// windows \ingoo.js
// linux /ingoo.js
// 디렉토리를 붙여서 경로를 만들어 주는 기능 : path.join()
let dir1 = path.join(__dirname, '/ingoo.js')
// join은 절대경로를 무시
console.log(dir1)

let dir2 = path.resolve(__dirname, '/ingoo.js')
console.log(dir2)
// resolve는 절대경로를 우선시



// 4가지 케이스를 알아볼 겁니다.
// server.js 에서 js라는 텍스트만 얻고싶다.

let str = 'server.js'
// 확장자명 가져오기
path.extname('server.js')
console.log(path.extname('server.js'))

// 파일 경로를 알고 싶다면
console.log(path.dirname(`C:/Users/82102/Documents/workspace/ingoo/NodeJs/2022.03.15/multer/ingoo.js`))

// 현재 디렉토리에서 파일명 가져오기
console.log(path.basename('C:/Users/82102/Documents/workspace/ingoo/NodeJs/2022.03.15/multer/ingoo.js'))

// 인자값 하나를 더 넣어주면 해당 내용을 빼고 가져온다.
console.log(path.basename('/home/path/server.js', path.extname('server.js')))
// output : server

console.log(path.basename('/home/path/server.js', '.js'))
// output : server
