import { useDispatch, useSelector } from "react-redux";
import { action } from "../../../modules/comment";

import CommentComponent from "./Component";

const CommentContainer = ({ userName, boardId }) => {
  const dispatch = useDispatch();
  const list = useSelector(
    (state) => state.comment.filter((item) => item.boardId == boardId)
    //find는 조건에 맞는 (콜백함수의 결과가 true가되는) 것을 순서대로
    //찾아보다가 맞는게 있으면 그것 하나만 가져온다.
    //filter는 find와 같으나 조건에 맞는 아이템들을 배열로 가져온다
  );

  const edit = (id, text) => {
    dispatch(action.edit(id, text));
  };
  const remove = (id) => {
    dispatch(action.remove(id));
  };

  const add = (text) => {
    dispatch(action.add(text, userName, boardId));
  };

  return <CommentComponent add={add} list={list} edit={edit} remove={remove} />;
};

export default CommentContainer;
