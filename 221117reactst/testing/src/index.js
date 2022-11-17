import React from "react";
// ES6 문법으로 되어있다
// 기본적으로 import, export를 사용한다.
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// 라우터 구현시 수정. 이외에는 수정할 일 없음
const root = ReactDOM.createRoot(document.getElementById("root"));
//root는 public의 id가 root인 Elemnet를 가져와서 그안에 react의 구조를 그리도록 한다.
root.render(
  <React.StrictMode>
    {/* HTML 문법을 자바스크립트와 함께 사용한다. */}
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
