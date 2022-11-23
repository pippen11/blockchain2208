import React, { useState } from "react";

function App() {
  const [color, setColor] = useState(0);
  let num = 0;

  const increase = () => {
    num += 1;
    console.log(num);
  };

  return (
    <div className="App" onClick={increase}>
      <ChildFunc text="string" num={num} color={color} setColor={setColor} />
      <ChildComp text="string" num={num} color={color} />
    </div>
  );
}

export default App;

class ChildComp extends React.Component {
  constructor(props) {
    //props란 부모 컴포넌트가 전달한 데이터
    // 보통은 읽기 전용으로 쓴다. << 재정의를 하지 않는다.
    super(props);
    // 클래스형 컴포넌트에서는 constructor(생성자)에서 매개변수로 받아
    //상속 클래스 (React.Component)의 constructor(super)를 호출한다.
    // 이후 this.props를 사용하여 호출할(가져올)수 있다.
    console.log(this.props);
    //this.props.color
  }

  render() {
    return (
      <div style={{ color: "#" + this.props.color.toString(16) }}>
        {/* // toString(여기에 숫자가 들어가면) 해당 진수로 바꿔준다
        //toString(16)<< 16진수로 바꿔준다
        //#00000/#FFFFF 
        Css에서 색상을 구현할때 rgb(255,255,255),rgba(255,255,255,1) red green blue alpha(opacity : 0~1)
        #00ff00<< green
        #00(r) 00(g) 00(b)
        rgb() rgba() #3f48cc 이런식으로 씀 */}
        {this.props.num}
      </div>
    );
  }
}

function ChildFunc(props) {
  //함수형 컴포넌트에서는 매개변수로 바로받는다.
  //{}를 사용하여 구조 분해 할당을 할수있다.
  //function ChildFunc({})
  //const {} = props  <<와 같다
  console.log(props);
  // props.setColor

  const changeColor = () => {
    console.log(props.color);
    // props.setColor((state) => state + 100);
    // props.setColor(props.color + 100);
    props.setColor((state) => {
      console.log(state);
      return state + 100;
    });
    // 위에 세개 다같은것
    //state대신 color도 가능
    //props의 setcolor 메서드를 호출한다
    // state가 뭔가?
    // setState(변경할값)
    //setState((state)=>{<<여기서의 state는 기존의값 return 변경할값})
    //  setState((state)=>newState)  화살표함수써서 한줄로 적어줄때 바로 이렇게적음 map을 이용해 배열을 내보낸다던가등
  };
  return <div onClick={changeColor}>{props.num}</div>;
}
