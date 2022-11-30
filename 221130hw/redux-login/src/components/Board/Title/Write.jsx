import styled from "styled-components";
import { useState } from "react";
const WriteCompo = ({ userName }) => {
  const [Title, setTitle] = useState("");
  return (
    <Textboard>
      <input type="text" placeholder="제목" />
      <textarea name="" id="" cols="30" rows="10"></textarea>
      <button>등록</button>
    </Textboard>
  );
};

export default WriteCompo;

const Textboard = styled.div`
  width: 50px;
`;
