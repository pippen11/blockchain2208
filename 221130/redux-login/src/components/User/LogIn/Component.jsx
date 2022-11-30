//5번
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LoginComponent = ({ onClick }) => {
  const [userId, setId] = useState("");
  const [userPw, setPw] = useState("");

  return (
    <LoginBox>
      <input
        type={"text"}
        value={userId}
        onInput={(e) => {
          setId(e.target.value);
        }}
        placeholder={"ID"}
      />
      <input
        type={"password"}
        value={userPw}
        onInput={(e) => {
          setPw(e.target.value);
        }}
        placeholder={"PW"}
      />
      <button
        onClick={() => {
          onClick(userId, userPw);
        }}
      >
        Log In
      </button>
    </LoginBox>
  );
};

export default LoginComponent;

const LoginBox = styled.div`
  input {
    padding: 5px;
  }
`;
