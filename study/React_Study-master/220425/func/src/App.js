// import logo from './logo.svg';
import './App.css';
import State from './Components/State/State.jsx'
import Counter from './Components/State/Counter.jsx'
import Effect from './Components/Effect/Effect.jsx'
import Login from './Components/Login/Login.jsx'
import Props from './Components/Props/Props.jsx'
import Time from './Components/Time/Time.jsx'


const Test = () => {
  return(
    <div>hello world!</div>
  )
}

const App = () => {
  console.log(<Test />)
  return (
    <div className="App">
      <h1>Time</h1>
      <Time />

      <h1>State</h1>
      <State />
      
      <h1>Counter</h1>
      <Counter />

      <h1>Effect</h1>
      <Effect />

      <h1>Login</h1>
      <Login />

      <h1>Props</h1>
      <Props 
        value='데이터전달'
      />
      <Props value='props전달'>
        hello!!!!!
      </Props>
    </div>
  );
}

export default App;
