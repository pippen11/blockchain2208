import logo from "./logo.svg";
import "./App.css";
import store from "./store";
import { useState } from "react";
function App() {
  const [inputCount, setCount] = useState(0);
  const [inputArray, setArray] = useState("");
  const [inputArray2, setArray2] = useState("");
  return (
    <div className="App">
      {/* <div>{store.getState().count1}</div>

      <div>{store.getState().count2}</div> */}

      {/* store.getState()는 store를 가져온다 */}
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
          store.dispatch({
            type: "count1/plus",
            payload: { input: inputCount },
          });
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          store.dispatch({
            type: "count1/minus",
            payload: { input: inputCount },
          });
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
