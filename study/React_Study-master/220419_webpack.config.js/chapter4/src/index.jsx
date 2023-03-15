const React = require('react')
const ReactDOM = require('react-dom/client')  // webpack5 로 오면서 변경됨
const App = require('./App.jsx')

// ReactDOM.render(
//     <App />,
//     document.querySelector('#root')
// )

// ReactDOM 사용법 변경.
// React Router가 버전업 되면서 랜더되는 부분도 같이 변경됨.

const container = document.querySelector('#root')  // html에 존재하는 엘리먼트를 담은 변수
const root = ReactDOM.createRoot(container)  // container를 최상위 엘리먼트로 만든다는 내용
root.render(<App />)  // root 안에 <App /> 컴포넌트를 넣어서 랜더

