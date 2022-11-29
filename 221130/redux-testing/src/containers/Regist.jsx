import { useState } from "react";
import RegistComp from "../components/Regist";
import { connect } from "react-redux";
import { action } from "../modules/Regist";
const RegistContainer = ({ registvalue, regist, login, logout, input }) => {
  return (
    <RegistComp regist={regist} login={login} logout={logout} input={input} />
  );
};

const mapStateToprops = (state, props) => {
  // console.log(props);
  return { registvalue: state.registvalue };
};

const mapDispatchToprops = (dispatch) => {
  return {
    input: () => {
      dispatch(action.input);
    },
    login: () => {
      dispatch(action.login);
    },
    logout: () => {
      dispatch(action.logout);
    },
    regist: () => {
      dispatch(action.regist);
    },
  };
};

export default connect(mapStateToprops, mapDispatchToprops)(RegistContainer);
