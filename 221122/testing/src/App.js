//React의 구조
//Component란? << 기능적으로 최소단위
//- 기능을 포함하는 HTML 구조 단위
// -컴포넌트는 항상 html 구조를 return해야한다 << div던 빈태그던 뭐가있어야함
// -함수형에서는 함수 자체가 return한다
// -클래스형에서는 render 메서드에서 return한다 .
//컴포넌트(root)
//-App
// -UserBox
//  -Regist
//  -LogIn
//  -LogOut
// -BoardBox

import React from "react";
import "./App.css";

function App() {
  let test = "테스팅";
  let num = 1;
  let bool = true;
  let str = "문자열";
  let arr = [1, 2, 3, 4];
  let obj = { name: "객체" };
  let nul = null;
  let und = undefined;

  // console.log(if(){}) 내보내는 값이없어서 안됨
  //console.log(for(let i = 0 ; i<10 i++))내보내는 값이없어서 안됨
  //console.log(while(){})내보내는 값이없어서 안됨
  //값을 내보낸다 , 가져온다 얘기할수있는 것들과 if, for ,while의 차이가 무었인가?
  // 값을 내보낸다 , 가져온다 <<  변수, 함수 << 수이다.
  // if 조건문, for / while 반복문 << 문장일뿐이다.

  function testing() {
    return "함수 테스팅";
  }

  function increase() {
    num = num + 1;
    console.log(num);
  }

  let arrDiv = [
    <div key={0}>1</div>,
    <div key={1}>2</div>,
    <div key={2}>3</div>,
    <div key={3}>4</div>,
  ];

  function arrFunc(arr) {
    const tempArr = [];

    // for (let i = 0; i < arr.length; ++i) {
    //   tempArr.push(<div key={i}>{arr[i]}</div>);
    // }

    arr.forEach((item, index) => {
      tempArr.push(<div key={index}>{item}</div>);
    });
    return tempArr;
  }

  return (
    <div className="App">
      <App1 />
      {/* {}는 값을 가져야만 출력할수있다
      단,object의 경우엔 출력방법이 모호하기 때문에 출력하지 못한다. */}
      {/* <App1 /> */}
      <div onClick={increase}>{num}</div>
      <div>{bool}</div>
      <div>{str}</div>
      <div>{arr}</div>
      {/* 배열이 하나하나 뜬다가 중요함 나머진 빈값이라 안뜨고 객체는 키와값으로나오고 */}
      <div>{obj.name}</div>
      <div>{nul}</div>
      <div>{und}</div>
      <div>{bool ? "true" : "false"}</div>
      {/* 이거 왜 삼항연산자로써요? if로 안되요? */}
      <div>{testing()}</div>
      {/* <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div> */}
      {arrDiv}
      {arrFunc(arr)}
      {arr.map((item, index) => {
        return <div key={index}>{item}</div>;
      })}
    </div>
  );

  //HTML 태그 내에서 {}를 사용하여 변수를 출력할수잇다.
}

export default App;

class App1 extends React.Component {
  // 우리가 컴포넌트를 만들때 컴포넌트의 모든 코드를 알고있나?<< 모른다. 그렇기 때문에 상속을 받도록 한다.

  // num = 0;
  // 여기서 정의한 것은 this의 프로퍼티로 추가된다.

  //클래스는 let안줌
  constructor(props) {
    //클래스를 생성할때 실행되는 코드
    super(props);
    // 상속을 받았을때 부모의 해당 메서드를 실행한다 <<부모의 constructor
    console.log("constructor");
    console.log(this);
    console.log(this.num);
    // this.num = 0;
    //이거랑 바깥에 num=0이랑 같다

    this.state = { name: "상태값", num: 0, classNames: ["app3"] };
    // console.log(this.state);
    // this는 App1자체
  }

  divRef = React.createRef(); // 가상돔내에서 특정한 엘리먼트 가져오기위해 쓰는것

  componentDidMount() {
    console.log("componentDidMount");
    console.log(this);
  }
  //실행될때

  componentDidUpdate() {
    console.log("componentDidUpdate");
    console.log(this);
    console.log(this.state.name);
  }
  //값이 업데이트 변할때(값이변경되는코드?)
  componentWillUnmount() {
    console.log("componentWillUnmount");
    console.log(this);
  }

  /////// 컴포넌트는 자체적으로 bind있어서 가져다쓴다

  //값이 삭제될때
  increaseFunc() {
    console.log(this);
    console.log(this.state.num);
    //여기서의 this는 increaseFunc 메서드이다.
    //호출하는 곳에서 bind메서드로this를 App1로 전달해야한다
    //화살표함수아니면 bind메서드를 써야함
    //여기서 this는 함수자체에서만 잡힘
  }

  increase = () => {
    // this.state.num = this.state.num + 1;
    this.setState({ num: this.state.num + 1 });
    console.log(this.state.num);
    // this.state.name = this.state.name + "1"; //<< 이걸 권장하지 않는다 state를 직접 변경하지않는것을 권장 항상setState를 사용해서 변경해라
    //"상태값"+"1" => "상태값1"

    //같은스코프내에서는 바로바뀌지는 않는다
    //위에서 바꿔달라했을때 바귀기전인 상태
    //코드가 한번 돌아갈땐 이전값이 찍히고 다돌아가고render가 돌아가야 바뀜
    //여기서의 this는 App1이된다.
    //호출하는 곳에서 bind메서드를 적지않아도된다
    //화살표함수 아닐땐 여기서의 this.는 increase안에껏
    //화살표함수로하면 this가 함수내부가아니라 클래스 자체 위로올라감
    //보편적으로 화살표함수쓰는게 좋다
  };

  //state로 바뀌면render함수 돌아감 그래서 확바뀜
  changeName = () => {
    this.setState({ name: this.state.name + "1" });
    //한번 돌아서 바껴야 상태값이 바뀜
    //setState를 써야 상태값 변경가능 setState를썼을때 같은 스코프내에서는 바뀌지않는상태다
    console.log(this.state.name);
    console.log(this.divRef.current);
  };

  changeClass = () => {
    if (this.state.classNames.indexOf("app4") === -1) {
      //-1이면 없을때 app4적용?
      this.setState({ classNames: [...this.state.classNames, "app4"] });
    } else {
      this.setState({ classNames: [...this.state.classNames.slice(0, 1)] });
      //app3없애고 app4만 남길려고함
    }
  };
  //if else한줄일땐 중가로안해도됨

  render() {
    console.log("render");
    console.log(this);
    return (
      <>
        <div onClick={this.increaseFunc.bind(this)}>{this.state.num}</div>
        {/* 바인드쓰면 클래스꺼가져옴 화살표함수안쓸때 */}
        <div onClick={this.increase}>{this.state.num}</div>
        <div
          className={this.state.name}
          ref={this.divRef}
          onClick={this.changeName}
        >
          {this.state.name}
        </div>

        {/* 화살표함수는 바인드안써도됨 */}
        <div
          className={this.state.classNames.join(" ")}
          //app3app4이렇게 클래스이름이 붙어버려서 app3 app4를 띄우려고 join(" ")이거 써서 띄워줌
          onClick={this.changeClass}
        >
          클래스 이름설정 테스트중
        </div>
      </>
    );
  }
}

// 라이프사이클 1번 constructor -> render -> component순 이순서대로 코드를 실행한다

// https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/
