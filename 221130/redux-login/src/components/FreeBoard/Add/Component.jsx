import { useState } from "react";
import styled from "styled-components";

const Addcomponent = ({ onClick }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  return (
    <AddBox>
      <input
        type={"text"}
        value={title}
        onInput={(e) => {
          setTitle(e.target.value);
        }}
        placeholder={"Title"}
      />
      <textarea
        value={text}
        onInput={(e) => {
          setText(e.target.value);
        }}
        placeholder={"Text"}
      />
      <button
        onClick={() => {
          onClick(title, text);
        }}
      >
        Add Board
      </button>
    </AddBox>
  );
};

export default Addcomponent;

const AddBox = styled.div``;
