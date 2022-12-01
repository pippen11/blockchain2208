import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { action } from "../../../modules/board";
import Editcomponent from "./Component";

const EditContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams(useLocation());

  //전체를 가져와서 뒤에 id만가져옴
  console.log(useLocation());

  const item = useSelector((state) =>
    state.board.find((item) => item.id == id)
  );

  const onClick = (title, text) => {
    dispatch(action.edit(id, title, text));
    navigate(`/board/${id}`);
  };
  return <Editcomponent onClick={onClick} item={item} />;
};

export default EditContainer;
