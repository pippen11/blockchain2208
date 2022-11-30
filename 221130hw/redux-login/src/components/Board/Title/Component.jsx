import styled from "styled-components";
import { useState } from "react";

const BoardtitleComponent = () => {
  const [userName, setName] = useState("");
  const [Title, setTitle] = useState("");
  const [Content, setContent] = useState("");
  const [Time, setTime] = useState("");

  return (
    <>
      <TableBox>
        <thead>
          <tr>
            <th>작성자</th>
            <th>제목</th>
            <th>내용</th>
            <th>작성시간</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
          </tr>
          <tr>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
          </tr>
          <tr>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
          </tr>
          <tr>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
          </tr>
        </tbody>
      </TableBox>
    </>
  );
};

export default BoardtitleComponent;

const TableBox = styled.table`
  border: 2px solid green;
  border-radius: 10px;
  width: 1000px;
  height: 500px;

  thead th {
    border-bottom: 1px solid;
  }

  div {
    text-decoration-line: solid;
    background-color: red;
  }
`;
