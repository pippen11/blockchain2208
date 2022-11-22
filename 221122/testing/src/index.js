import React from "react";
import ReactDOM from "react-dom/client";
// React와 외부를 연결하는 라이브러리
import "./index.css";
import App from "./App"; // 컴포넌트를 가져온다
import reportWebVitals from "./reportWebVitals"; // 성능 층적용 파일?

const root = ReactDOM.createRoot(document.getElementById("root"));
// document.getElementById=> 아이디를 기준으로 엘리먼트를 가져온다
//React의 Root Dom을 만든다. << virtual dom(가상돔)의 시작점이 필요하다
// 리액트의 장점은 코드의 재활용이 쉽다

root.render(
  //React 의 Root Dom에 매개변수로 전달된 컴포넌트를 생성한다(Mount)
  // <React.StrictMode>
  <App />
  // {/* </React.StrictMode> */}
);
{
  /* 엄격모드를 쓰면 콘솔이 두번출력되는이유? 정확하게 출력하기위해서 생성할때 한번 삭제후 다시생성한다 */
}
{
  /* mount -> unmount -> mount << 때문에 2번 출력된다 .*/
}
{
  /* redux라는것과 함께 설명할듯 */
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

//Redux -> useCountext , useReducer, StrictMode
