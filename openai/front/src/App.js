import axios from "axios";
import { useEffect, useState } from "react";
function App() {
  const [list, setList] = useState("");
  const [generate, setGenerate] = useState("");

  const clickgenerate = async () => {
    const result = (
      await axios.post("http://localhost:8080", { promt: generate })
    ).data;
    setList(result[0].url);
  };

  return (
    <div className="App">
      <div>
        <input
          style={{ width: 500, height: 45 }}
          value={generate}
          onInput={(e) => {
            setGenerate(e.target.value);
          }}
        ></input>
        <button style={{ width: 200, height: 50 }} onClick={clickgenerate}>
          generate
        </button>
      </div>
      <div>
        <img src={list}></img>
      </div>
    </div>
  );
}

export default App;
