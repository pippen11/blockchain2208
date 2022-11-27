import styled from "styled-components";
import { TodoBtn } from "../setting";
//export시 default를 쓰지않으면 {}를 사용해 구조분해 할당 형식으로 가져와야한다.
import { Link, Routes, Route } from "react-router-dom";
import List from "./List";
import TodoModal from "./TodoModal";
import { useState } from "react";
import Join from "./Login/Join";
export default function Todo() {
  const [list, setList] = useState([
    { taskName: "sdfsdf", status: 0 },
    { taskName: "sdfsdf", status: 1 },
    { taskName: "sdfsdf", status: 2 },
  ]);

  const [user, setUser] = useState("");

  return (
    <div>
      <div></div>
      <h1>Todo List</h1>
      <Member>
        <Link to={"Join"}>
          <button>Join in</button>
        </Link>
        <button>Log in</button>
      </Member>

      <TodoModalBtnBox>
        <Link to={"add"}>
          <TodoBtn className="sky">Add Task</TodoBtn>
        </Link>
      </TodoModalBtnBox>
      <List list={list} setList={setList} />
      <Routes>
        <Route path={"Join"} element={<Join user={user} setUser={setUser} />} />
        <Route
          path={"add"}
          element={<TodoModal setList={setList} func={"Add"} />}
        />

        <Route
          path={"edit"}
          element={<TodoModal setList={setList} func={"Edit"} />}
        />
      </Routes>
    </div>
  );
}

const TodoModalBtnBox = styled.div`
  text-align: right;
`;

const Member = styled.div``;
