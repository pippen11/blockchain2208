import AddBoardComponent from "../components/AddBoard";
import { useState } from "react";
import { newBoard } from "../api";
import { useNavigate } from "react-router-dom";

// import AddBoardComponent from "../components/AddBoard";

const AddBoardContainer = ({ userName }) => {
  const [boardData, setBoardData] = useState({
    title: "",
    text: "",
  });
  const navigate = useNavigate();

  const changeTitle = (e) => {
    setBoardData((state) => ({ ...state, title: e.target.value }));
  };

  const changeText = (e) => {
    setBoardData((state) => ({ ...state, text: e.target.value }));
  };

  const upload = async () => {
    console.log(boardData);
    if (!boardData.title || !boardData.text) return;
    const result = await newBoard({ ...boardData, userName });
    console.log(result);
    if (!result.isError) navigate("/");
  };

  return (
    <AddBoardComponent
      changeFuncs={{ changeTitle, changeText }}
      upload={upload}
    />
  );
};

export default AddBoardContainer;
