import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import LogIn from "./components/Login";
import Log from "./components/Log";

function App() {
  const [num, setNum] = useState(0);

  return (
    <div className="App">
      <Header />
      {/* 이동할때마다 헤더는 항상 있어야하니까 따로 위에 잇는것 */}
      <Routes>
        {/* 라우터를 나누기 위해서는 Routes 컴포넌트로 묶어야한다. */}
        <Route path="/" element={<Home propsNum={num} />} />
        {/* /넣으면 절대경로 안넣으면 상대경로 path안에 /넣든안넣든 여기서는 똑같다  */}
        {/* Route는 각 라우터에 대한 구현이다 path는 라우터의 주소 , element는 출력할 엘리먼트(컴포넌트) */}
        <Route path="/login" element={<LogIn />} />
        <Route path="log/*" element={<Log />} />
        {/* *을붙이면 전부다되게함 log뒤에 */}
      </Routes>
    </div>
  );
}

export default App;
