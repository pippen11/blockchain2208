import styled from "styled-components";
import { useState } from "react";

const BoardtitleComponent = ({ list }) => {
  // const [userName, setName] = useState("");
  // const [Title, setTitle] = useState("");
  // const [Content, setContent] = useState("");
  // const [Time, setTime] = useState("");
  // const nowTime = new Date();
  console.log(list);
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
          {list.map((item, index) => {
            return (
              <tr key={`tr=${index}`}>
                <td key={`id-${index}`}>{item.id}</td>
                <td key={`title-${index}`}>{item.title}</td>
                <td key={`userName-${index}`}>{item.userName}</td>
                <td key={`createdAt-${index}`}>{item.createdAt}</td>
              </tr>
            );
          })}
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
