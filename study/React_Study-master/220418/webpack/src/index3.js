import moment from "moment"
// 라이브러리가 설치되어 있지 않다면 구동되지 않는다.

function currentTime() {
    return moment().format("H:m:s")
}

const div = document.createElement('div')
document.body.appendChild(div)
setInterval(()=>{
    div.innerHTML = currentTime()
}, 1000)




// npm init
// npm install moment

// webpack
// npm install -D webpack webpack-cli
// npx webpack-cli ./src/index3.js  =>  dist 디렉토리 안에 bundle 파일을 생성해준다. 디폴트 디렉토리명 : dist

// index3.js + moment => ???.js  (두개를 합쳐서 하나의 js파일을 만들 것)
// index3.html src = ???.js

// TypeScript 
// TypeScript는 런타임이 없다.
// TypeScript로 작성해도 컴퓨터는 읽지 못한다. 
// TypeScript를 사용할 때는 webpack과 함께 사용해야 한다.
// 왜? TypeScript 문법을 javascript로 바꿔서 node로 돌려야 하기 때문. 문법만 TypeScipt 처럼 쓰는 것.