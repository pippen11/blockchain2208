# redux 활용해서 로그인 기능 구현하기
stack : custom Hook, redux, redux-saga
<br>
Issues

- 새로고침을 해도 로그인 상태 유지되도록 하기
- 백엔드 서버에 실제 요청을 보내서 결과물 가져오기

<br>

## 로그인 정보 저장

- cookie
  - React에서는 전역 상태에 isLogin: true 로 저장해 놓고 사용.
  - 쿠키는 요청할 때마다 전달. 
  - 전역상태에 로그인 정보를 담아놓고 사용하기 때문에 굳이 쿠키를 브라우저에 저장하는 방식으로 사용하지 않는 경우가 많다.
  - 대신 브라우저의 Local Storage에 로그인 정보를 저장한다.
- session


<br>

## redux에서 Local Storage 사용
이동이 잦은 사이트의 경우 로그인 정보 뿐만 아니라 데이터도 localStorage에 저장해 놓고 사용.
<br>

```
npm install redux-persist
```
