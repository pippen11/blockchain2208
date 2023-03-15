# 고차함수
함수 안에 함수를 만들어서 콜백함수가 인자값을 받을 수 있도록 해줄 수 있다.
<br>
<br>

# Webpack
javascript의 역사 ~
2015년 이전와 이후
<br>
ES6 전과 후로 나눠질 수 있다.
<br>
webpack은 2015년 전에 나왔다.
<br>
2015년 이전에는 module 개념이 없었다. ES6 문법부터 module 개념이 등장.
<br>
webpack은 module을 사용하기 위해 등장했던 개념
<br>
파일을 나눠서 작성하는 것 <- module
<br>
Webpack ?
<br>
bundle.js 파일을 만들어서 js파일들을 뭉쳐줬다. 단, 코드가 꼬이지 않게..
<br>
webpack은 코드를 바꿔서 bundle 파일을 만들어준다.
<br>
<br>

## Webpack 어떻게 돌아가나?
기본적으로 nodejs 환경에서 돌아간다.
<br>
브라우저에서 돌아갈 코드를 npm에 있는 코드와 같이 module을 연결시켜서 브라우저에서 돌아갈 수 있는 코드로 만들어 준 것. <= webpack의 기능
<br>
1. 간단한 javascript 파일을 만들고
2. 이것을 합쳐주는 원리를 파악할 수 있는 예제파일을 만들어 볼 예정.
3. 원리를 파악한 후 React에 webpack을 설정해보기
   
<br>
브라우저에서 실행하는 파일을,,
<br>
nodejs에 있는 코드와 같이 쓴 것
<br>
"npm install 라이브러리"를 해서 쉽게 설치하고 가져다 사용한 것
<br>
nodejs 환경에서 코드를 작성한 것을 bundle 한 것이다.
<br>
webpack을 사용하면,,

- module.exports 마음대로 사용가능 / nodejs에 있는 코드를 가져와서 사용 가능.
- 브라우저 환경 버전도 세팅해서 내보낼 수 있다.
- cross browsing 가능 (webpack을 통해 자연스럽게 처리 가능)

<br>
브라우저는 모듈화를 하지 못한다. 
<br>
하지만 webpack을 사용하면 브라우저에서도 돌아갈 수 있는 코드로 하나의 파일로 만들어주기 때문에 
<br>
구현에만 집중해서 코드를 작성할 수 있다.

<br>
webpack을 사용해서 조건 같은걸 걸 수도 있고
<br>
babel 세팅 가능
<br>
js, css, 이미지, 웹폰트 등등 bundling 가능.
<br>
<br>

## webpack.config.js
webpack 환경설정.
<br>
webpack.config.js 파일을 만들어서 어떻게 bundling을 할지 설정할 수 있다.
<br>
세팅값을 적어놓으면 해당 세팅값에 알맞게 bundle 파일을 제작해준다.
<br>
터미널에 "npx webpack" 명령어를 입력하면 같은 디렉토리에 있는 webpack.config.js 파일을 읽어서 해당 내용에 맞게끔 bundle 파일 제작
<br>
webpack을 사용해서 조건 같은걸 걸 수도 있고
<br>
babel 세팅 가능
<br>
js, css, 이미지, 웹폰트 등등 bundling 가능.
<br>

## create-react-app
src 폴더 안에 있는 파일들을 bundling 해준다.