//5번
import { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate, userNavigate } from "react-router-dom";

import LoginComponent from "./Component";
import { action } from "../../../modules/userInfo";
import store from "../../../modules/store";

const LoginContainer = ({ userName }) => {
  const navigate = useNavigate(); // location.href 같은 훅이다.

  const onClick = (userId, userPw) => {
    store.dispatch(action.logIn(userId, userPw, store.getState().userDB));
    //store.으로 해서 값을 보내줬다가 reducer에서 처리한다음 store로 다시들어감
    //DB도가져와서 보내준다 userInfo에서 바로 못가져와서(userInfo에서 store로 가져오면 터짐) 여기서 가져와서 보내줌
  };

  useEffect(() => {
    if (userName) navigate("/");
  }, [userName]);
  //로그아웃시 userName스테이트값이 바뀔때 루트로감
  // 이부분이 실행이 안되기때문에 밖으로 뺌

  return <LoginComponent onClick={onClick} />;
};

const mapStateToprops = (state, props) => {
  return {
    userName: state.userInfo.userName,
  };
};
export default connect(mapStateToprops)(LoginContainer);
