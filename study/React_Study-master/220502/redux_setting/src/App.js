// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom'
import Index from './pages/index'
import Counter from './pages/counter'
import Comment from './pages/comment'
import Login from './pages/login'
import Header from './components/common/header.jsx'

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/comment" element={<Comment />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
