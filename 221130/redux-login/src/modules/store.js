import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

//3번

import {
  initialize as userInfoIni,
  reducer as userInfoReducer,
} from "./userInfo";

import { initialize as userDBIni, reducer as userDBReducer } from "./userDB";

import { initialize as boardIni, reducer as boardReducer } from "./board";

import { initialize as commentIni, reducer as commentReducer } from "./comment";

const store = createStore(
  combineReducers({
    userInfo: userInfoReducer,
    userDB: userDBReducer,
    board: boardReducer,
    comment: commentReducer,
  }),
  //reducer합체
  //리듀서키값 초기값 키값 같아야함?
  {
    userInfo: userInfoIni,
    userDB: userDBIni,
    board: boardIni,
    comment: commentIni,
  },
  //초기값
  //스프레드는 분해해서 넣는거고 이건 때려박은거다
  // 키값이 파일명이랑 통일해야한다.(이렇게써도되고 깃허브에 올려주신거대로 따로빼도됨)
  composeWithDevTools()
);

export default store;
