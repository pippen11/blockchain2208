import { useSelector } from "react-redux";
import Listcomponent from "./Component";

const ListContainer = () => {
  const list = useSelector((state) => state.board);
  //여기서의 state.board는 boardIni? 배열인데 추가된값들?

  return <Listcomponent list={list} />;
};

export default ListContainer;
