import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { initialize as Count1Ini } from "./modules/count1";
// export const initialize = { count1: 0 } 에서 가져온걸 Count1Ini로
import { initialize as Count2Ini } from "./modules/count2";
// export const initialize = { count2: 0 }; 에서 가져온걸 Count2INi로

import { reducer as count1 } from "./modules/count1";
import { reducer as count2 } from "./modules/count2";

const store = createStore(
  combineReducers({ count1, count2 }),
  //reducer안의 함수 이름들 count1 count2로
  //reducer조합
  //reducers안의 count1, count2이 밑에 ...Count1Ini,...count2Ini와 같아야함
  { ...Count1Ini, ...Count2Ini },
  //state값설정
  //결국 {count1:0,couint2:0}이랑 같다
  composeWithDevTools()
);

export default store;
