# Next
Next 프레임워크 안에 React가 존재
<br>
Web Server 와 React가 같이 들어가 있는게 Next
<br>
SSR : Server Side Rendering

- SSR은 SPA가 아니다.
- SPA는 검색 봇에 걸리지 않는다는 단점이 있다. 
- 
<br>
CSR : Client Side Rendering

- 화면은 그대로인채 브라우저에서 백엔드에 요청을 해서 데이터만을 가져오는 것

Next의 장점은 필요할 때 SSR을 할 수 있다는 것이다. (8분..)
<br>
<br>

# NEXT project
```
npm init -y
```
> package.json 생성

```
npm install react react-dom next
```

next <- 실행기
<br>
코드를 작업해놓고 next 명령어로 실행시키기만 하면 된다.
<br>
package.json 파일 세팅.

```json
"scripts": {
    "dev": "next dev -p 3001",
    "build": "next build",
    "start": "next start"
}
```
npm run dev -> .next 디렉토리 생성
<br>
<br>

## pages 디렉토리 생성
---
pages 디렉토리 안의 파일명이 uri이 된다.

<br>

## .babelrc 파일
---
.babelrc 파일 생성
<br>
작성된 내용대로 babel을 실행시켜준다.
<br>
{
    "presets": ["next/babel"],
    "plugins": ["styled-components"]
}

<br>

## _app.jsx 파일
---
페이지에 관련된 컴포넌트 상위내용

<br>

## _document.jsx 파일
---
HTML 레이아웃,,
코드가 복잡,,
<br>
실행순서
<br>
_app.jsx -> _document.jsx -> about.jsx

<br>

## 라우팅
---
파일 자체가 하나의 라우터
<br>
`http://localhost:3001/board/list`
<br>
pages 디렉토리 안에서 board 디렉토리 생성
<br>
board 디렉토리 안에서 list.jsx 파일 생성
<br>
`http://localhost:3001/board/view/1`
<br>
board 디렉토리, view 디렉토리, 1 은 파일
<br>
하지만 view/1, view/2, view/3, ... <-  동적 라우팅 사용

<br>

## 동적라우팅
---
[id].jsx 형태로 파일 생성

<br>

## Server Side Rendering
---
```javascript
export function getServerSideProps(context) {

    console.log(context)
    console.log(context.query.id)
    console.log('hello server')
    // axios

    return {
        props: {
            name: 'ingoo'
        }
    }
}
```

<br>

## 디자인
---
google -> Ant Design
```
npm install antd @ant-design/icons styled-components
```

- Grid : 24 Grids System , 전체를 100%라고 했을 때 24조각으로 나눈 것.
- 24 = 100% , 12 = 50%
- layout을 구성할 때 grid를 사용해서 구성.
