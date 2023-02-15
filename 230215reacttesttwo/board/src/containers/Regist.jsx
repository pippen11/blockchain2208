import AddBoardComponent from "../components/AddBoard";

import { useState } from "react";
import { newBoard, signIn } from "../api";
import { useNavigate } from "react-router-dom";
import RegistComponent from "../components/Regist";

// import AddBoardComponent from "../components/AddBoard";

const RegistContainer = () => {
  const [registData, setRegistData] = useState({
    id: "",
    pw: "",
    name: "",
  });
  const navigate = useNavigate();

  const changeId = (e) => {
    setRegistData((state) => ({ ...state, id: e.target.value }));
  };

  const changePw = (e) => {
    setRegistData((state) => ({ ...state, pw: e.target.value }));
  };
  const changeName = (e) => {
    setRegistData((state) => ({ ...state, name: e.target.value }));
  };

  const regist = async () => {
    // console.log(boardData);
    if (!registData.id || !registData.pw) return;
    const result = await signIn(registData);
    // console.log(result);
    if (!result.isError) navigate("/");
  };

  return (
    <RegistComponent
      changeFuncs={{ changeId, changePw, changeName }}
      regist={regist}
    />
  );
};

export default RegistContainer;
