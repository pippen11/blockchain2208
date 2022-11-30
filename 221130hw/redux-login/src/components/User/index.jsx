//6번
import styled from "styled-components";
import { connect } from "react-redux";
import { Routes, Route, Link, redirect } from "react-router-dom";

import RegistContainer from "./Regist/Container";
import LogInContainer from "./LogIn/Container";
import Infocontainer from "./Info/Container";
import BoardComponent from "../Board";

const UserComponent = ({ userName }) => {
  //전달받은 userName props값을 사용해 삼항연산자 사용
  return (
    //이부분잘모르겠음
    <UserBox>
      <div>
        <Link to={"/"}>Home</Link>

        {userName ? (
          //이름이 잇으면 regist랑 login해줄필요가 없어서 반태그
          <></>
        ) : (
          <>
            {" "}
            | <Link to={"/regist"}>Regist</Link>|{" "}
            <Link to={"/login"}>Log In</Link>| <Link to={"/Board"}> Board</Link>
          </>
        )}
      </div>
      {userName ? <Infocontainer /> : <></>}
      <Routes>
        <Route path="/regist" element={<RegistContainer />} />
        <Route path="/login" element={<LogInContainer />} />
        <Route path="/Board" element={<BoardComponent />} />
      </Routes>
      {/* 로그인후 홈주소로 가야하는데 로그인해도 홈주소로 안가는게 문제다 */}
      {/*  useEffect(() => {
    if (userName) navigate("/");
  }, [userName]); */}
      {/* 삼항연산자 */}
    </UserBox>
  );
};

const mapStateToprops = (state, props) => {
  //state는 store에서 받아온다
  return {
    userName: state.userInfo.userName,
    //store에있는 state값의userInfo의 userName을 받아와서 userName으로 props값으로만듬
  };
  //이부분잘모름
};
export default connect(mapStateToprops)(UserComponent);
//감싸준다
//그 props값을 mapStateToprops함수를 사용해 리턴값을 userComponent로 props값을 전달해줌

const UserBox = styled.div`
  border: 1px solid orange;
  border-radius: 5px;
  padding: 30px;

  a {
    text-decoration-line: none;
    color: blue;
  }
`;
