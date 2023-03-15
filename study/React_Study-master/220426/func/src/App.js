// import logo from './logo.svg';
import './App.css';
import Form from './Components/Form/Form.jsx'
import Form2 from './Components/Form/Form2.jsx'
import Form3 from './Components/Form/Form3.jsx'
import Form4 from './Components/Form/Form4.jsx'

function App() {
  return (
    <div className="App">

      <h1>Form Component</h1>
      <Form />

      <h1>Custom Hook</h1>
      <Form2 />

      <h1>useEffect</h1>
      <Form3 />

      <h1>Hooks</h1>
      <Form4 />

    </div>
  );
}

export default App;
