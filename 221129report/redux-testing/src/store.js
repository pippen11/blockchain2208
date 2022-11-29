import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { initialize as RegistvalueINi } from "./modules/Regist";
import { reducer as registvalue } from "./modules/Regist";

const store = createStore(
  combineReducers({ registvalue }),
  { ...RegistvalueINi },
  composeWithDevTools()
);

export default store;
