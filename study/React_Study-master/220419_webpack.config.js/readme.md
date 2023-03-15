# webpack
기본적으로 webpack은 nodejs 환경에서 돌아간다.
<br>
그렇기 때문에 npm을 이용해 패키지를 설치하고 사용하는 것이 가능하다.
<br>
```
npm init -y
npm install react react-dom
npm install -D webpack webpack-cli
```

웹팩 설정파일을 만들어서 빌드하는 것을 해보자.
<br>

파일 생성 (프로젝트 안에서)
> webpack.config.js
<br>

디렉토리 생성 (프로젝트 안에서)
> mkdir src dist

template > index.html을 생성 (프로젝트 안에서)
<br>

*기본적인 html 내용과 div, script 내용 입력*

src 디렉토리 안에서 index.jsx
<br>
리액트 문법을 쓸 때 컴포넌트 내용을 가지고 있으면 jsx 확장자를 사용하기도 한다. ( javascript만 있는 파일과 구별하기 위해 )
<br>
리액트 컴포넌트 문법을 사용한 파일이라는 것을 명시

<br>
바벨이라는 것은
React 만든 사람들이 만든 게 아니다.
<br>
그렇기 때문에 React 만든 사람들이 자기 입맛에 맞게 구현한 바벨을 세팅해줘야 한다.
<br>
<br>

- Webpack Babel 연결해주는 라이브러리

- 옛날 브라우저에서도 구동할 수 있게 코드를 바꿔주는 바벨 필요

- JSX를 사용할 수 있는 바벨이 필요
<br>
<br>

**Webpack Babel 연결해주는 라이브러리**
```
    npm install -D babel-loader
```

**옛날 브라우저에서도 구동할 수 있게 코드를 바꿔주는 바벨**
```
    npm install -D @babel/preset-env
```

**JSX를 사용할 수 있는 바벨**
```
    npm install -D @babel/preset-react
```

npm install
```
    npm install -D babel-loader @babel/preset-env @babel/preset-react
```
<br>
<br>

## devServer
리액트에서 돌아가는 파일은 1개의 html, 1개의 javascript
<br>
src 폴더 안에서 코드를 수정할 때마다 bundle 파일을 계속 생성해줘야한다.
<br>
devServer : 웹서버를 구축해준다. <- index.html 파일을 랜더하는 웹서버
<br>
src 폴더 안에서 코드가 수정된 것을 감지하면,
<br>
서버를 재시작해준다. bundle 파일을 다시 만들어준다. 자동적으로,,
<br>
개발할 때만 사용.
webpack에서 특정한 웹서버를 가져와서 붙여넣은 것. ( webpack에서 연결할 수 있게끔 도와준다. )
<br>
<br>
webpack-dev-server : 서버를 돌리기 전에 src 디렉토리에 있는 파일을 번들링해서 dist 디렉토리 안에 최신화시킨다. 
<br>
그리고 해당 결과물을 가지고 화면에 랜더되는 것을 보여준다.
<br>
cf ) webpack 과 webpack-dev-server는 다른개념. webpack은 번들링.
<br>
```
    npm install -D webpack-dev-server
```
package.json 파일 안의 script 부분에서 devServer를 실행할 수 있는 코드를 작성해준다.
<br>
"dev": "webpack server --env development"
<br>

---
<br>

페이지가 새로고침 되지않고 컴포넌트에서 변경된 부분만 리랜더링 
```
    npm install -D @pmmmwh/react-refresh-webpack-plugin
    npm install -D react-refresh
```