import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";

export default function Login({ users, setUser }) {
  const [userId, setId] = useState("");
  const [userPw, setPw] = useState("");
  const [ableId, setAbleId] = useState(false);
  const [ablePw, setAblePw] = useState(false);

  useEffect(() => {
    setId(userId.length ? userId.match(/[a-z]/gi)?.join("") : "");
    if (userId.length < 5) setAbleId(false);
    else setAbleId(true);
  }, [userId]);

  useEffect(() => {
    if (userPw.length < 10) setAblePw(false);
    else setAblePw(true);
  }, [userPw]);

  function onLogIn() {
    const tempUser = users.find((item) => item.userId === userId);
    if (tempUser && tempUser.userPw === userPw) setUser(tempUser.userId);
  }
  return (
    <LoginBox>
      <input
        type={"text"}
        onInput={(e) => {
          setId(e.target.value);
        }}
        placeholder="ID"
        value={userId}
        //밸류를 넣어주므로써 스테이트로 제대로들어갈수있게 넣어줌 위에 userId때문에
      />
      <input
        type={"password"}
        onInput={(e) => {
          setPw(e.target.value);
        }}
        placeholder="PW"
        value={userPw}
      />
      <button
        onClick={(e) => {
          if (!(ableId && ablePw)) return;
          onLogIn();
        }}
      >
        Login
      </button>
    </LoginBox>
  );
}

const LoginBox = styled.div``;
