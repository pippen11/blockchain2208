//5번
import { useState } from "react";
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
    border: 1px solid orange;
    border-radius: 5px;
    padding: 5px;
  }
  button {
    border: 1px solid orange;
    border-radius: 5px;
    padding: 5px;
    margin-left: 10px;
    background-color: green;
    color: blue;
  }
`;
