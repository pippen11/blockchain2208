// import logo from './logo.svg';
import './App.css';
import Callback from './Components/Callback/Callback.jsx'
import Context from './Components/Context/Context.jsx'
import Reduce from './Components/Reducer/Reduce.jsx'

function App() {
  return (
    <div className="App">
      {/* <h1>useCallback</h1>
      <Callback /> */}

      <h1>useContext</h1>
      <Context />

      {/* <h1>useReducer</h1>
      <Reduce /> */}
    </div>
  );
}

export default App;
