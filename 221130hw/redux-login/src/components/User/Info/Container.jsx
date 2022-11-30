//5번
import { connect } from "react-redux";
import InfoComponent from "./Component";
import store from "../../../modules/store";
import { action } from "../../../modules/userInfo";

const InfoContainer = ({ userName }) => {
  console.log(userName);
  const onClick = () => {
    store.dispatch(action.logOut());
  };
  //onClick함수를 보내줌
  return <InfoComponent userName={userName} onClick={onClick} />;
};

//밑에 두줄쓰면 위에 값 넘겨주는거 바로가능 connect
const mapStateToProps = (state, props) => {
  return {
    userName: state.userInfo.userName,
    //userInfo에서 가져옴
    //이부분 질문
  };
};

export default connect(mapStateToProps)(InfoContainer);
