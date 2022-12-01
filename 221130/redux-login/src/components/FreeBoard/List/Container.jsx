import { useSelector } from "react-redux";
import Listcomponent from "./Component";

const ListContainer = () => {
  const list = useSelector((state) => state.board);

  return <Listcomponent list={list} />;
};

export default ListContainer;
