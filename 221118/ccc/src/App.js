import logo from "./logo.svg";
import "./App.css";
import ClassComp from "./components/ClassComp";
import React, { useState } from "react";

function App() {
  const [isMount, setMount] = useState(true);
  function changeMount() {
    setMount(!isMount);
  }

  const [count, setCount] = useState(0);
  //이걸로 props설정 값을 넘겨줘야 초기화가 안됨

  return (
    <div className="App" onClick={changeMount}>
      {isMount ? <ClassComp count={count} setCount={setCount} /> : <></>}
      {/* 컴포넌트가 생성될때 */}
      {/* <ClassComp /> */}
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

///////////////////////////////////////////////

// import React from "react";

// import "./App.css";
// import BtnComp from "./components/BtnComp";

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       firstNum: undefined,
//       secondNum: undefined,
//       result: undefined,
//     };
//   }
//   //this라는건 class자기자신 app을뜻함

//   componentDidUpdate() {
//     console.log(this.state);
//     // console.log(this);
//   }
//   //바인드 공부해보기

//   selNum(num) {
//     if (this.state.firstNum == undefined) {
//       this.setState({ ...this.state, firstNum: num });
//       //...은 스프레드이다
//     } else if (this.state.secondNum == undefined) {
//       this.setState({ ...this.state, secondNum: num });
//     }
//   }
//   //바인드 render밖에서만 사용가능

//   render() {
//     //render은 클래스 컴포넌트의 필수이다.(virtual dom에 그려지는 html 문법)
//     // 클래스 컴포넌트에서만  render 메서드 사용 / 함수형 컴포넌트에서는 return으로 바로사용

//     return (
//       <div className="calculator">
//         <div className="row">
//           <BtnComp
//             item={7}
//             // onClick={function (e) {
//             //   if (this.state.firstNum == undefined) {
//             //     this.setState({ ...this.state, firstNum: 7 });
//             //   } else if (this.state.secondNum == undefined) {
//             //     this.setState({ ...this.state, secondNum: 7 });
//             //   }
//             // }.bind(this)}

//             onClick={this.selNum.bind(this)}
//           />
//           <BtnComp item={8} onClick={this.selNum.bind(this)} />
//           {/* 여기 온클릭은 이벤트 온클릭이 아니다 */}
//           <BtnComp item={9} onClick={this.selNum.bind(this)} />
//           <BtnComp
//             item="+"
//             onClick={function () {
//               if (
//                 this.state.firstNum != undefined &&
//                 this.state.secondNum != undefined
//               ) {
//                 this.setState({
//                   firstNum: undefined,
//                   secondNum: undefined,
//                   //위에초기화할려고넣음
//                   result: this.state.firstNum + this.state.secondNum,
//                 });
//               }
//             }.bind(this)}
//           />
//         </div>
//         <div className="row">
//           <BtnComp
//             item="4"
//             onClick={function (e) {
//               if (this.state.firstNum == undefined) {
//                 this.setState({ ...this.state, firstNum: 4 });
//               } else if (this.state.secondNum == undefined) {
//                 this.setState({ ...this.state, secondNum: 4 });
//               }
//             }.bind(this)}
//           />
//           <BtnComp
//             item="5"
//             onClick={function (e) {
//               if (this.state.firstNum == undefined) {
//                 this.setState({ ...this.state, firstNum: 5 });
//               } else if (this.state.secondNum == undefined) {
//                 this.setState({ ...this.state, secondNum: 5 });
//               }
//             }.bind(this)}
//           />
//           <BtnComp
//             item="6"
//             onClick={function (e) {
//               if (this.state.firstNum == undefined) {
//                 this.setState({ ...this.state, firstNum: 6 });
//               } else if (this.state.secondNum == undefined) {
//                 this.setState({ ...this.state, secondNum: 6 });
//               }
//             }.bind(this)}
//           />
//           <BtnComp item="/" />
//         </div>
//         <div className="row">
//           <BtnComp
//             item="1"
//             onClick={function (e) {
//               if (this.state.firstNum == undefined) {
//                 this.setState({ ...this.state, firstNum: 1 });
//               } else if (this.state.secondNum == undefined) {
//                 this.setState({ ...this.state, secondNum: 1 });
//               }
//             }.bind(this)}
//           />
//           <BtnComp
//             item="2"
//             onClick={function (e) {
//               if (this.state.firstNum == undefined) {
//                 this.setState({ ...this.state, firstNum: 2 });
//               } else if (this.state.secondNum == undefined) {
//                 this.setState({ ...this.state, secondNum: 2 });
//               }
//             }.bind(this)}
//           />
//           <BtnComp
//             item="3"
//             onClick={function (e) {
//               if (this.state.firstNum == undefined) {
//                 this.setState({ ...this.state, firstNum: 3 });
//               } else if (this.state.secondNum == undefined) {
//                 this.setState({ ...this.state, secondNum: 4 });
//               }
//             }.bind(this)}
//           />
//           <BtnComp item="*" />
//         </div>
//         <div className="row">
//           <BtnComp item={this.state.result} />
//           <BtnComp
//             item="0"
//             onClick={function (e) {
//               if (this.state.firstNum == undefined) {
//                 this.setState({ ...this.state, firstNum: 0 });
//               } else if (this.state.secondNum == undefined) {
//                 this.setState({ ...this.state, secondNum: 0 });
//               }
//             }.bind(this)}
//           />
//           <BtnComp item="=" />
//           <BtnComp item="-" />
//         </div>
//       </div>
//     );
//   }
// }

export default App;
