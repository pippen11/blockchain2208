import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Boardcomponent from "./Component";
import { action } from "../../../modules/board";
const BoardContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams(useLocation());
  //useparams의 결과는 {id:***}으로 나와서 구조분해할당해야함
  //이걸로 id값 받아옴
  const item = useSelector((state) =>
    state.board.find((item) => item.id == id)
  );

  const userName = useSelector((state) => state.userInfo.userName);

  const remove = () => {
    dispatch(action.remove(item.id));
    navigate("/");
  };

  return (
    <Boardcomponent
      item={item}
      remove={remove}
      isCreator={userName == item.userName}
    />
  );
};

export default BoardContainer;
