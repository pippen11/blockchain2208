import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";

export default function Regist({ users, setUsers }) {
  const [userId, setId] = useState("");
  const [userPw, setPw] = useState("");
  const [ableId, setAbleId] = useState(false);
  const [ablePw, setAblePw] = useState(false);

  useEffect(() => {
    setId(userId.length ? userId.match(/[a-z]/gi)?.join("") : "");

    //a~z , A~Z까지만 입력 가능하도록 한다.
    if (userId.length < 5) setAbleId(false);
    else setAbleId(true);
  }, [userId]);

  useEffect(() => {
    //a~z , A~Z까지만 입력 가능하도록 한다.
    if (userPw.length < 10) setAblePw(false);
    else {
      setAblePw(true);
    }
  }, [userPw]);

  function onRegist() {
    if (users.find((item) => item.userId === userId)) return;
    setUsers([...users, { userId, userPw }]);
    console.log(users);
    console.log("회원가입완료");
    // setUsers((state) => [...state, { userId, userPw }]);
    //users.push({userId,userPw})// 적용은 되나 절대적으로 비추되는 방식
    //setUsers(users);
  }

  return (
    <RegistBox>
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
          onRegist();
        }}
      >
        Regist
      </button>
    </RegistBox>
  );
}

const RegistBox = styled.div``;
