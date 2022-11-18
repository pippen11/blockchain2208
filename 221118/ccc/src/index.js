import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
//어디를 기준으로 그릴지 root기준
root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
  //이거있으면 엄격모드로 삭제했다가 다시넣는다
  //테스트할때 확실히해라라는 기본적인 틀
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
