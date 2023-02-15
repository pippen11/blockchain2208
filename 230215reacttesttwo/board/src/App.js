// import logo from "./logo.svg";
// import "./App.css";
import { Route, Routes, Link } from "react-router-dom";
import AddBoardContainer from "./containers/Addboard";
import { BoardContainer } from "./containers/Board";
import RegistContainer from "./containers/Regist";
import LogInContainer from "./containers/Login";
import { useState } from "react";
import { UserContainer } from "./containers/User";

function App() {
  const [user, setUser] = useState({ name: "" });
  return (
    <div className="App">
      <div>
        <Link to={"/"}>home</Link>
        {user.name ? (
          <>
            <Link to={"/new"}>new Board</Link>
          </>
        ) : (
          <>
            (<Link to={"/user/sign"}>Sign In</Link>
            <Link to={"/user/in"}>Log In</Link>)
          </>
        )}
      </div>
      {user.name && <UserContainer userName={user.name} setUser={setUser} />}
      <Routes>
        <Route path="/" element={<BoardContainer />} />
        <Route
          path="/new"
          element={<AddBoardContainer userName={user.name} />}
        />
        <Route path="/user/sign" element={<RegistContainer />} />
        <Route path="/user/in" element={<LogInContainer setUser={setUser} />} />
      </Routes>
    </div>
  );
}

export default App;
