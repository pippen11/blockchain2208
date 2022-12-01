import styled from "styled-components";
import { useState } from "react";

const BoardtitleComponent = ({ list }) => {
  // const [userName, setName] = useState("");
  // const [Title, setTitle] = useState("");
  // const [Content, setContent] = useState("");
  // const [Time, setTime] = useState("");
  // const nowTime = new Date();

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

        <tbody>{list}</tbody>
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
