import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
//Router 설정에 있어서 root를 설정한다.
// 해당 컴포넌트가 없을시 라우터를 구현하지 못한다.
// src의 index.js에 넣고 React 시작할때 무조건 넣는다고 생각해라
// <App/>태그를 밑에처럼 감싸줘야함

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
