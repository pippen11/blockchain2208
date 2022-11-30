//5번
//6번
// 인풋만들어주고 초기값 설정
import styled from "styled-components";
import { useState } from "react";

//3. onClick을 부모 컴포넌트(Registcontainer)로부터 props로 받는다
const RegistComponent = ({ onClick }) => {
  //온클릭 부모한테서 프롭스로 받아옴
  //여기 ()안에 넣어주는이유?
  const [userId, setId] = useState("");
  const [userPw, setPw] = useState("");
  const [userName, setName] = useState("");

  console.log("3. RegistComponent", onClick);

  return (
    //db값 세개라서 인풋세개
    //다설정후 버튼 온클릭 함수설정
    <RegistBox>
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
      <input
        type={"text"}
        value={userName}
        onInput={(e) => {
          setName(e.target.value);
        }}
        placeholder={"NAME"}
      />
      <button
        onClick={() => {
          console.log("4.button onClick");
          //4.사용자가 Regist버튼을 클릭했을때 onClick함수를 호출한다.
          // 매개변수로 userId,userPw,userName를 전달한다.
          onClick(userId, userPw, userName);
          //객체로묶어도되긴함 이름이 같으면됨 양쪽다 매개변수로 묶으면 괜찮: 키와값으로 매칭을시킴
          //보내는순서 받는순서 중요하다 순서대로 적어줘야함 (콘테이너 매개변수쪽)
          //프롭스로 들어온놈 부모가 전달한거다
          //매개변수로 인풋값 세개넘겨줌 인풋함수호출
        }}
      >
        Regist
      </button>
    </RegistBox>
  );
};

export default RegistComponent;

const RegistBox = styled.div`
  input {
    padding: 5px;
  }
`;
