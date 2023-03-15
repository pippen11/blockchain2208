# History.pushState()
url을 바꿔주지만 요청을 하지 않는 메소드

<br>
<br>

# REACT-ROUTER-DOM
```
npm install react-router-dom
```
현재 버전 : V6 - 2021-12-17
<br>
Context API처럼
라우터 역시 최상위에 올려놓고 시작해야 함.
<br>
App 컴포넌트 안에서 끝나야 한다. 
<br>
<br>
BrowserRouter - 최상위에 올라가는 컴포넌트  //  import BrowserRouter as Router 형태로 사용.
<br>
Link의 props 중 to의 속성값으로 이동할 경로 입력
<br>
Router 컴포넌트 안에서 모든 컴포넌트를 그리면 된다.
<br>
Routes 컴포넌트 안에 url을 이동했을 때 보이고 싶은 컴포넌트를 넣어준다.
<br>
Route 컴포넌트 안에는 path와 element라는 props 존재
<br>
path에 해당하는 경로로 접근했을 때 element의 값으로 들어간 component를 보여줌
<br>
<br>

- BrowserRouter - 최상위 컴포넌트
- Link - A 태그 대신 써야할 컴포넌트
- Routes - 컴포넌트를 보여주게 할 영역을 감싸는 컴포넌트
- Route - URI에 맞는 컴포넌트를 찾아주는 컴포넌트

<br>
<br>

## 디렉토리 구조
- src
    - components - 공통적으로 들어갈 컴포넌트 모음
        - common
            - header.jsx  :  헤더 전체의 디자인
            - responsive.jsx  :  컨텐츠 영역을 잡아주는 컴포넌트
    - hook - 훅에 관련된 내용을 넣는 컴포넌트
    - pages - 실제 화면에 출력할 컴포넌트를 넣는 디렉토리
        - comment
            - index.jsx
            - ...
            - ...
            - css
    - reducers - reducer 모음 (redux에 관련된 reducer)
    - store - context , 전역상태를 만들어주는 디렉토리 

- css
    - styled-components
```
npm install styled-components
```
<br>
<br>

# Redux setting
Context API와 비슷
<br>
비동기 처리 때문에 Redux를 더 많이 사용
<br>
dispatch() 가 action을 reducer에게 전달.
<br>
reducer는 action을 이용해서 state를 반환
<br>
Redux를 사용하면 reducer가 상태를 반환하기 전에 미들웨어를 거친다.
<br>
미들웨어 영역에서 비동기 통신을 통해 상태를 변환시킬지 여부를 체크.
<br>
<br>

## redux === Context API
redux는 상태 추적이 가능.
<br>
context API로 상태를 만든다면,,

```
state = {
    comment: {
        list: []
    },
    counter: {
        number: 0
    },
    user: {
        
    },
    board: {

    }
}
```

이런 형태로 되어있는 상태를 redux를 사용해서 보다 쉽게 관리할 수 있다.

<br>
<br>
redux는 리액트에서 만든 것이 아니기 때문에 redux와 React를 연결해주는 라이브러리 설치 필요

```
npm install redux react-redux
```

브라우저의 devTools로 확인하기 위해 설치.
```
npm install redux-devtools-extension
```

redux === context API
<br>
useReducer, useDispatch