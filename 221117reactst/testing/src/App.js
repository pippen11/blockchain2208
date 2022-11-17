import logo from "./logo.svg"; // 이미지를 불러온다
import "./App.css"; // CSS파일을 불러온다
import Test from "./Test";
//대문자T로 해야함

function App() {
  // 파스칼 표기법을 사용<< component이다 . (이후 설명 예정)
  return (
    <div className="App">
      <Test test1="테스트 중입니다." idx="1">
        안녕하세요
      </Test>
      <Test test1="테스트 중입니다." idx="2">
        안녕하세요
      </Test>
      {/* 컴포넌트의 조각들임 각각 분리해서 사용가능 */}

      {/* 안녕하세요는 children자식으로 넣어줘야나옴 */}

      {/* Component의 예시이다. */}
      {/* react에서는 class가아닌 classname이라한다 */}
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
