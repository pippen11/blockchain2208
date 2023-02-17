# React + Node.js(Express) Server all in one

## 1. REact Project 설치할 폴더 이동

```sh
cd C:\Users\KGA_18\Documents\GitHub\blockchain2208\blockchain2208\230215reacttesttwo>/board
```

## 2. React Project 설치

- 설치는 폴더 기준으로

- 현재는 C:\Users\KGA_18\Documents\GitHub\blockchain2208\blockchain2208\230215reacttesttwo>/board

```sh
yarn create react-app ./
```

## 3. 라이브러리 설치

yarn create react-app ./
yarn add express dotenv express-session cookie-parser morgan styled-components react-router-dom mysql2 sequelize sequelize-cli axios cors
yarn add -D npm-run-all nodemon

- Express Server
  - express : Node.js의 HTTP 서버 구현
  - dotenv : .env 폴더 자동 파싱, process 객체에 env 프로퍼티에 추가
  - express-session : express 서버용 session 라이브러리
  - cookie-parser : Front End에서 보내온 쿠키 자동 파싱
  - morgan : 테스트 로그 작성용
  - mysql2 : Sequelize와 함께 사용하는 mySQL 라이브러리
  - sequelize : DB 파싱용 라이브러리
  - sequelize-cli : sequelize 명령어 라이브러리
  - cors :Cross Origin Resource Sharing 문제해결

-React

- react-router-dom: React에서 Router 사용하기 위한 라이브러리
- axios : Back End와 API 통신을 하기위한 Front End 라이브러리
  -Dev
- nodemon : Node.js 실행 시 파일 수정에 대해 즉각적인 적용 라이브러리
- npm-run-all : 여러 서버를 한번에 실행하기 위한 라이브러리

## 4. Sequelize 기본 설정 설치

```sh
cd server
npx sequelize init
```

---

```sh
yarn start # in baord에서
npx nodemon index #in board/server
```

<!--  예전엔 nodemon app 이건전역이라 npx nodemone index는 전역아닐때  -->

- npx sequelize init 이거하면 server폴더안에 config models등 생김 이거두개랑 build빼고 지워도되고 냅둬도된다

- 서버에서 npx nodemon index board에서 yarn start

- yarn build하면 server쪽 업데이트 파일 바뀔때마다(배포할거면 마지막에 할때만) yarn build

- "start": "npm-run-all --parallel start:\*\*",
  "start:server":"nodemon ./server",
  "start:client":"react-scripts start",
  패키지 json에 이거 넣어준다

.env 밖이랑 안에 둘다생성
