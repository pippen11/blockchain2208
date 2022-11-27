import logo from "./logo.svg";
import "./App.css";
import ClassComp from "./components/ClassComp";
import FuncComp from "./components/FuncComp";
import Additional from "./components/Additional";

function App() {
  return (
    <div className="App" style={{}}>
      {/* <ClassComp
        text={"testing ClassComp"}
        func={() => {
          console.log("testing ClassCom");
        }}
      /> */}
      {/* <FuncComp
        text={"testing text"}
        func={() => {
          console.log("testing func");
        }}
      /> */}
      <Additional />
    </div>
  );
}

export default App;
