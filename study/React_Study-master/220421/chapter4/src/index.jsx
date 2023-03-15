import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'


const container = document.querySelector('#root')
const root = ReactDOM.createRoot(container)
root.render(<App />)  // App 컴포넌트를 호출한다고 생각하자.