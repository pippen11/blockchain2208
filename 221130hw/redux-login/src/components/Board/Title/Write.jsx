import styled from "styled-components";
import { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import BoardtitleComponent from "./Component";

const WriteCompo = ({ onClick }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  return (
    <Textboard>
      <input
        type={"text"}
        value={title}
        onInput={(e) => {
          setTitle(e.target.value);
        }}
        placeholder={"제목"}
      />
      <textarea
        type={"text"}
        value={text}
        onInput={(e) => {
          setText(e.target.value);
        }}
        name=""
        id=""
        cols="30"
        rows="10"
      ></textarea>
      <Link to={"/Board"}>
        <button
          onClick={() => {
            onClick(title, text);
          }}
        >
          등록
        </button>
      </Link>
      <Routes>
        <Route path="/Board" element={<BoardtitleComponent />} />
      </Routes>
    </Textboard>
  );
};

export default WriteCompo;

const Textboard = styled.div`
  width: 50px;
`;
