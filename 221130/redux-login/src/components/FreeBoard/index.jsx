import styled from "styled-components";
import { Routes, Route } from "react-router-dom";

import AddContainer from "./Add/Container";
import ListContainer from "./List/Container";
import BoardContainer from "./Board/Container";
import EditContainer from "./Edit/Container";

//밑에 라우트 이렇게 나눈이유?
const FreeBoard = () => {
  return (
    <FreeBoardBox>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <AddContainer />
              <ListContainer />
            </>
          }
        />

        <Route path="/board/:id" element={<BoardContainer />} />
        <Route path="/edit/:id" element={<EditContainer />} />
        {/* 여기 :id로써야하는이유? */}
      </Routes>
    </FreeBoardBox>
  );
};

export default FreeBoard;

const FreeBoardBox = styled.div``;
