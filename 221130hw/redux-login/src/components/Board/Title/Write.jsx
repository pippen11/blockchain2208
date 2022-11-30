import styled from "styled-components";
import { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import BoardtitleComponent from "./Component";

const WriteCompo = ({ userName }) => {
  const [inputTitle, setinputTitle] = useState("");
  const [inputContent, setinputContent] = useState("");
  return (
    <Textboard>
      <input
        type="text"
        value={inputTitle}
        onInput={(e) => {
          setinputTitle(e.target.value);
        }}
        placeholder="제목"
      />
      <textarea
        type="text"
        value={inputContent}
        onInput={(e) => {
          setinputContent(e.target.value);
        }}
        name=""
        id=""
        cols="30"
        rows="10"
      ></textarea>
      <Link to={"/Board"}>
        <button onClick={() => {}}>등록</button>
      </Link>
      <Routes>
        <Route
          path="/Board"
          element={
            <BoardtitleComponent
              userName={userName}
              inputTitle={inputTitle}
              inputContent={inputContent}
            />
          }
        />
      </Routes>
    </Textboard>
  );
};

export default WriteCompo;

const Textboard = styled.div`
  width: 50px;
`;
