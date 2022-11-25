import { Link } from "react-router-dom";
import styled from "styled-components";
import { TodoBtn } from "../../setting";
import penImg from "./pen-solid.svg";
import trashImg from "./trash-solid.svg";

import { STATUSLIST } from "../../setting";

export default function Item({ item, index, setList }) {
  return (
    <ItemTr>
      <td>{index + 1}</td>
      <td>{item.taskName}</td>

      <td>
        <TodoBtn
          className={STATUSLIST[item.status]

            .toLocaleLowerCase()
            //소문자로변경
            .replace(" ", "-")}
          //띄어쓰기 -로변경
          style={{ curser: "defalut" }}
        >
          {STATUSLIST[item.status]}
        </TodoBtn>
      </td>
      <td>
        <Link to={"/edit"} state={{ index, item }}>
          {/* state값 보내줌? */}
          <TodoBtn className="sky">
            <img
              src={penImg}
              alt="penImg"
              style={{
                filter:
                  "invert(76%) sepia(39%) saturate(5972%) hue-rotate(136deg) brightness(99%) contrast(90%)",
              }}
            />
          </TodoBtn>
        </Link>
      </td>
      <td>
        <TodoBtn
          className="todo"
          onClick={() => {
            setList((list) => {
              const before = list.slice(0, index);
              const after = list.slice(index + 1);
              return [...before, ...after];
            });
            // 잘라서어디서넣어줌?
            //여기서 list는 state의 개념의 콜백함수
            // setList((state) => [
            //   ...state.slice(0, index),
            //   ...state.slice(index + 1),
            //   //   정한인덱스 기준으로 자름
            // ]);
          }}
        >
          <img
            src={trashImg}
            alt="trashImg"
            style={{
              filter:
                "invert(62%) sepia(99%) saturate(1276%) hue-rotate(145deg) brightness(97%) contrast(94%)",
            }}
          />
        </TodoBtn>
      </td>
    </ItemTr>
  );
}

const ItemTr = styled.tr`
  text-align: center;
  height: 50px;

  td {
    border-bottom: 1px solid lightgray;
  }

  img {
    width: 15px;
  }
`;
