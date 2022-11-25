import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);

//strictmode가 무엇이냐?
//- 안전하지 않은 생명 주기 메서드를 체크해서 알려준다.
//(componentDidMount)
// - componentWillMount<< 라는 놈이 잇었따. 이런것들을 확인해준다. < 현재없어짐
// - ref에 대한 경고를 해준다.
// - 스트링 형식의 ref가 있었다 << 결국 과거의 잔재다.
// - 메모리 누수등의 부작용 검사를 해준다.
// - 메로리가 삭제되지않는 현상(메모리 누수)등의 문제가 발생했을때 알려준다.
// - 레거시 Context API에 대한 검사를 해준다.
// -Context API만 남았으며 레거시 Context API가 없다 << 결국 과거의 잔재다.
// 개인적 생각으론 지금은 없어도 상관 없다.

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
