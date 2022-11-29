import { useState } from "react";

const RegistComp = ({ registvalue, regist, login, logout, input }) => {
  const [inputUser, setInputUser] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [inputName, setInputName] = useState("");
  return (
    <div>
      <div>
        <input
          type={"text"}
          value={inputUser}
          onInput={(e) => {
            setInputUser(e.target.value);
          }}
          placeholder={"아이디 입력"}
        />
        <input
          type={"text"}
          value={inputPw}
          onInput={(e) => {
            setInputPw(e.target.value);
          }}
          placeholder={"비밀번호 입력"}
        />
        <input
          type={"text"}
          value={inputName}
          onInput={(e) => {
            setInputName(e.target.value);
          }}
          placeholder={"이름입력"}
        />
      </div>
      <button
        onClick={() => {
          regist({ inputUser, inputPw, inputName });
        }}
      >
        회원가입
      </button>
      <button
        onClick={() => {
          login({ inputUser, inputPw });
        }}
      >
        로그인
      </button>
      <button onClick={() => {}}>로그아웃</button>
    </div>
  );
};

export default RegistComp;
