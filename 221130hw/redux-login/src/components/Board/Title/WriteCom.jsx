import { useDispatch, useSelector } from "react-redux";
import { action } from "../../../modules/board";
import WriteCompo from "./Write";

const WriteCom = () => {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.userInfo.userName);

  const onClick = (title, text) => {
    dispatch(action.add(title, text, userName));
    //dispatch로 action의 add값에 매개변수로보냄?
  };
  return <WriteCompo onClick={onClick} />;
};

export default WriteCom;
