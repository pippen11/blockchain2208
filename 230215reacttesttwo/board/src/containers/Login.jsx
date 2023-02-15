import AddBoardComponent from "../components/AddBoard";

import { useState } from "react";
import { newBoard, signIn } from "../api";
import { useNavigate } from "react-router-dom";
import LogInComponent from "../components/Login";
import { logIn } from "../api";

// import AddBoardComponent from "../components/AddBoard";

const LogInContainer = ({ setUser }) => {
  const [logInData, setLogInData] = useState({
    id: "",
    pw: "",
  });
  const navigate = useNavigate();

  const changeId = (e) => {
    setLogInData((state) => ({ ...state, id: e.target.value }));
  };

  const changePw = (e) => {
    setLogInData((state) => ({ ...state, pw: e.target.value }));
  };

  const logInFunc = async () => {
    // console.log(boardData);
    if (!logInData.id || !logInData.pw) return;
    const result = await logIn(logInData);
    // console.log(result);
    if (!result.isError) {
      setUser({ name: result.user.name });
      navigate("/");
    }
  };

  return (
    <LogInComponent changeFuncs={{ changeId, changePw }} logIn={logInFunc} />
  );
};

export default LogInContainer;
