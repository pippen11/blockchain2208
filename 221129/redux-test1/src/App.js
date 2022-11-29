import logo from "./logo.svg";
import "./App.css";
import store from "./store";
import { useState } from "react";
import { COUNT1, actions as count1Actions } from "./action/count1";
//actions를 가져와서 count1Actions로 쓰겠다.

function App() {
  const [inputCount, setCount] = useState(0);
  const [inputArray, setArray] = useState("");
  const [inputArray2, setArray2] = useState("");
  const [_, setRender] = useState(false);
  // _란 보통 사용하지 않을 변수의 이름으로 설정한다. 일종의 관례
  // _라는 라이브러리도 있다. << 주의사항(lowbar)
  // false대신 0으로 줘도됨
  return (
    <div className="App">
      <div>{store.getState().count1}</div>
      {/* store.getState()는 store를 가져온다 */}
      {/* store.getState()로 받아온 store의 객체는 React의 랜더링에 관여하지 않는다. 그래서 Class컴포넌트에서는 forceupdate()를 사용해서 강제로 랜더링을 해준다 */}
      {/*  Function 컴포넌트에서는 state를 하나 만들어서 setState를 통해 랜더링을 강제한다. */}
      <input
        value={inputArray}
        type={"text"}
        onInput={(e) => {
          setArray(e.target.value);
        }}
        placeholder="text"
      ></input>
      <input
        value={inputArray2}
        type={"text"}
        onInput={(e) => {
          setArray2(e.target.value);
        }}
        placeholder="text"
      />
      <button
        onClick={(e) => {
          store.dispatch({
            type: "array/add",
            payload: { input1: inputArray, input2: inputArray2 },
          });
          setRender((state) => !state);
          //이건 paytload랑 같이씀 전역 state값 바뀐거를 띄워주기위해
          //빈값주고 억지로띄워줌<div>{store.getState().count1}</div>
          // getState()로 가져온 count1을 띄워주려면 이방법뿐
          // true랑 false왔다갔다?
        }}
      >
        add
      </button>
      <button
        onClick={(e) => {
          store.dispatch({
            type: "array/delte",
            payload: { input: inputArray, inputs: inputArray2 },
          });
          setRender((state) => !state);
        }}
      >
        delte
      </button>

      <input
        value={inputCount}
        type={"number"}
        onInput={(e) => {
          setCount(+e.target.value);
        }}
        placeholder="number"
      />
      <button
        onClick={() => {
          store.dispatch(count1Actions.plus(inputCount));
          // 함수호출후 inputCount값넣어준다
          setRender((state) => !state);
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          store.dispatch(count1Actions.minus(inputCount));
          setRender((state) => !state);
        }}
      >
        -
      </button>
      <button
        onClick={() => {
          store.dispatch({
            type: "count2/Plus",
            payload: {},
          });
          setRender((state) => !state);
        }}
      >
        2 +
      </button>
      <button
        onClick={() => {
          store.dispatch({
            type: "count2/minus",
            payload: {},
            //페이로드안써서 없애도됨
          });
          setRender((state) => !state);
        }}
      >
        2 -
      </button>

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
