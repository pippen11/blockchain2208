import { createStore } from "redux";
// createStore는 이름 그대로 store 만드는 함수. Deprecated 됐다.
// -Deprecated: 중요도가 떨어져 더 이상 사용되지않고 앞으로는 사라지게될 (컴퓨터 시스템 기능 등)
// createStore를 대신하는 함수가 @reduxjs/toolkit 라이브러리의 configureStore 메서드이다
// createStore가 왜 살아났느냐? << 기존의 코드들이 너무 많아서 사용자가 너무 많다.
import { composeWithDevTools } from "redux-devtools-extension";
import { reducer } from "./reducer";

export const store = createStore(
  // store를 생성한다.
  // (state) => state,
  //이렇게적어도됨
  // 첫번째 매개 변수로 reducer를 전달한다.
  reducer, // reducer 함수자체를 콜백함수로 넘겨줌
  { test: "testing" }, // 두번째 매개 변수로 초기 상태를 전달한다.
  //initialize() / initializeState
  composeWithDevTools() // 옵션으로 devtool에 연결한다.
);
