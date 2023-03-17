## Front

> ### 1. `cd front`
> 
> ### 2. git clone, pull 이후 `npm install or npm i` 실행
> 
> ### 3. front 실행 : `npm run dev`

## 디렉토리
```bash


> ### 1. git clone, pull 이후 `npm install` 실행
>
> ### 2. front 실행 : `npm run dev`

## 디렉토리

```shell
|
|-- @types // d.ts 모음
|
|-- pages // 페이지 라우팅
|   |-- api
|   |-- counter
|   |-- markets
|-- public
|
|-- src // 컴포넌트, 기능위주
|   |-- hooks // 반복 사용하는 함수 (ex: customHook, web3)
|   |-- features // 해당 페이지의 기능
|   |   |-- counter
|   |   |-- markets
|   |   |-- zkSync
|   |-- modules // rtk store 모음 (comineReducer)
|
|-- styles
|
```

## 페이지 현황

### market (main) -> localhost:3000

- 페이지 라우팅, `next.js get 함수`, api 응답 체험 ( redux 사용 X )

### counter -> localhost:3000/counter

- redux-toolKit (rtk), rtk-thunk 체험

## todoList

> tailwindCss 설정
>
> eslint, prettier 설정
>
> 회원가입, 로그인 화면

# 스택 설명


## 라우팅

`pages` 디렉토리가 라우터연결의 root 위치가 된다.

- ex) `pages/api/hello` = `http://localhost:3000/api/hello`
- ex) `pages/markets/index` = `http://localhost:3000/markets`

### Next.js 의 'get' 함수들

> 해당 함수들은 호출하지 않아도 빌드시 자동으로 실행된다.
>
> 즉, 해당 페이지의 컴포넌트가 **랜더 되기전에** 먼저 실행됨

### getStaticProps
해당 페이지 별로 데이터를 패칭함. (Props 를 페이지에 내려줌)

### getStaticPaths

정해진 path 에 한해 정적라우팅이 되도록 함 (속도가 매우 빨라짐 ..?)

또한 prams 를 넣어 해당 페이지에서 내려받을수 있다.

### getServerSideProps

빌드와 상관없이 매 페이지 요청마다 데이터를 서버로부터 가져옴.

### styled-component


### tailwindCSS
```bash
/pages/_app.tsx

import '../styles/globals.css'
```
한번 import 로 모든 tsx 에서 `tailwindCSS` 사용 가능

### rtk

### rtk-thunk

파일 주석, 링크 참조

## Back

1. 각자 db에 미리 database 만들기 (`$ create database nftMarket`)
2. `npm install` 해주기
3. 루트쪽에 아래처럼 .env 파일 만들기
   ```
   DB_USER=각자 db 계정
   DB_PASSWORD=계정 비번
   DB_DATABASE=nftMarket
   DB_HOST=127.0.0.1
   ```
4. `npm run dev` 로 서버실행 후 db 상에 User 테이블 제대로 생성되었는지 확인 할 것

```
$ USE nftMarket
$ SHOW TABLES
$ DESC User
```
