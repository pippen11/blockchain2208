import BoardtitleComponent from "./Component";
import { useSelector } from "react-redux";

const BoardContainer = () => {
  const list = useSelector((state) => state.board);
  return <BoardtitleComponent list={list} />;
};

export default BoardContainer;
