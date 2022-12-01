import { useDispatch, useSelector } from "react-redux";
import { action } from "../../../modules/board";
import Addcomponent from "./Component";

const AddContainer = () => {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.userInfo.userName);
  //store의 초기값으로 접근 state대신store로 적어도됨
  //store파일의 state는 { userInfo: userInfoIni, userDB: userDBIni, board: boardIni },
  //이부분인데 여기서 userInfo에있는 userName을 끌고와서 넣어줌
  //connect가 필요가 없다

  const onClick = (title, text) => {
    dispatch(action.add(title, text, userName));
    //store.dispatch랑 똑같은거다
  };
  //userName이 필요함

  return !userName || <Addcomponent onClick={onClick} />;
  //로그인 안하면 add가 사라짐
};

export default AddContainer;
