import { useState } from "react";
import "./App.css";
import EffectTest from "./components/EffectTest";
import List from "./components/List";
//함수형 컴포넌트는 생명주기가 약간은
//다르다
//함수형 컴포넌트는 mount, update시에 함수 자체를 다시 호출한다.
// 클래스형 컴포넌트의 state, lifecycle 메서드들을 사용하듯이 구현을 하려면
//hook 메서드들을 사용해야한다
// hook메서드로는 useState, useEffect, useRef, useCallback , useMemo
//-useContext , useReducer 가있지만 해당내용은 Redux에서 다시
// useEffect , useCallback, useMeomo의 경우 상황에따라 필요없는 코드를 실행시키지 않도록 하기 위해서 사용

//코드실행 다도는걸 최소화 시키기위해 위에 메서드를쓴다

function App() {
  console.log("app");
  // mount,update 시에 항상 app이 콘솔창에 출력된다.
  //무조건 일단 다돌린다 클래스형이랑 다름
  let num1 = 0;
  //여기서 초기화해서 계속 1만찍힘
  const [num, setNum] = useState(0);
  const [name, setName] = useState("");

  //useState가 고정해놔서 num은 바뀌지않는다
  //같은스코프내에서 state쓰면 이전값나와서 하나 적게나옴

  const increase = () => {
    num1 = num1 + 1;
    setNum(num + 1);
    console.log(num1);
  };

  return (
    <div className="App">
      <div onClick={increase}>{num}</div>
      {/* <List /> */}
      <EffectTest />
    </div>
  );
}

export default App;
