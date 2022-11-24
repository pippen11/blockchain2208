import styled from "styled-components";

// 디폴트는 파일당 하나
//그래서 defalt안적고 app.js에서 {}쓰고 파일 이름자체를 소문자로함
export const TodoBtn = styled.div`
  display: inline-block;
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  color: black;

  &.todo {
    color: gray;
    border-color: gray;
  }
  &.in-progress {
    color: orange;
    border-color: orange;
  }
  &.complete {
    color: green;
    border-color: green;
  }

  &.sky {
    color: skyblue;
    border-color: #0dcaf0;
  }

  &.on {
    color: black;

    &.todo {
      background-color: gray;
    }
    &.in-progress {
      background-color: gray;
    }
    &.complete {
      background-color: gray;
    }
  }
`;
//전부 대문자인 변수명: 고정된 설정값
// 외부에서쓰기편하게 이리 옮겨줌
//개발자들끼리의 규칙이다.
export const STATUS = {
  ToDo: 0,
  Inprogress: 1,
  Complete: 2,
};

export const STATUSLIST = ["ToDo", "In progress", "Complete"];
