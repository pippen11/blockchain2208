import styled from "styled-components";
import Item from "./item";

export default function List({ list, setList }) {
  //여러개 여서 객체로받음?
  return (
    <ListTable>
      <thead>
        <tr>
          <th>#</th>
          <th>Task Name</th>
          <th>Status</th>
          <th>Edit</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody>
        {list.map((item, index) => (
          <Item
            key={`Item-${index}`}
            item={item}
            index={index}
            setList={setList}
          />
          //map을 돌려서 띄워주는이유?
          // 리스트를 아이템으로 넘겨줌
        ))}
      </tbody>
    </ListTable>
  );
}

const ListTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  th {
    border-bottom: 1px solid black;
  }
`;
