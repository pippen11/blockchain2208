// const ReactDOM = require('react-dom/client')
// const App = require('./App.jsx')
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'


const container = document.querySelector('#root')
const root = ReactDOM.createRoot(container)
root.render(<App />)


// import 와 require
// 둘 다 모듈처럼 내용을 가져오는 것.
// import 의 경우 내보내는 방식이 다르다.
// require : module.exports = { }
// import : export default ' '