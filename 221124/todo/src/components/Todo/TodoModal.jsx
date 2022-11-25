import styled, { keyframes } from "styled-components";
import { TodoBtn } from "../setting";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { STATUSLIST, STATUS } from "../setting";

export default function TodoModal({ setList, func }) {
  const index = useLocation().state?.index;
  const item = useLocation().state?.item;
  const [taskName, setTaskName] = useState(item ? item.taskName : "");
  const [status, setStatus] = useState(item ? item.status : STATUS.ToDo);
  //이부분모름 state와 item받아오지않앗는데 가능?

  //location에 state에 index가잇으면
  //state가 없으면 undefined가나감
  return (
    <TodoModalBox>
      <TodoModalInnerBox>
        <div>
          <input
            type="text"
            placeholder="Task name"
            value={taskName}
            onInput={(e) => {
              setTaskName(e.target.value);
            }}
          ></input>
        </div>
        <div>
          {STATUSLIST.map((item, index) => (
            <TodoBtn
              className={
                STATUSLIST[index].toLocaleLowerCase().replace(" ", "-") +
                (status === index ? " on" : "")
                //이부분잘모름
              }
              onClick={() => {
                setStatus(index);
              }}
              key={`TodoBtn-${index}`}
            >
              {item}
            </TodoBtn>
          ))}
        </div>
        <div>
          <Link to={"/"}>
            <TodoBtn
              onClick={() => {
                if (func === "Add") {
                  setList((state) => [...state, { taskName, status }]);
                } else if (func === "Edit") {
                  setList((list) => {
                    const before = list.slice(0, index);
                    const after = list.slice(index + 1);
                    return [...before, { taskName, status }, ...after];
                  });
                }
              }}
            >
              {func}
            </TodoBtn>
          </Link>
          <Link to={"/"}>
            <TodoBtn>Cancel</TodoBtn>
          </Link>
        </div>
      </TodoModalInnerBox>
    </TodoModalBox>
  );
}

const TodoModalBox = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TodoModalInnerBox = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  width: 50%;

  input {
    width: 100%;
    padding: 5px 10px;
  }

  & > div {
    margin: 10px 0;
    display: flex;
    justify-content: space-evenly;

    &:last-child {
      justify-content: space-between;
    }
  }
`;
