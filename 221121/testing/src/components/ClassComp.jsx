import React from "react";

export default class ClassComp extends React.Component {
  constructor(props) {
    super(props);

    this.props.func();
    this.state = { test: "state test" };
    //state 선언 및 정의(초기화)
  } // state: 상태값 , react에서의 리랜더링(다시그리기)의 기준이 된다.
  // state가 변경(저정의 )되면 render 메서드를 다시 실행하여 웹페이지에 출력한다.
  //호출할때 생성해서 한번밖에안찍힌다

  componentDidMount() {
    console.log("conponentDidMount");
    //컴포넌트가 virtual dom에 추가될떄(생성될대 / 마운트 될때 실행되는 메서드)
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");
    //state값이 변화했을때 실행되는 메서드
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
    //컴포넌트가 dom에서 삭제될때 실행되는 메서드
  }

  render() {
    return (
      <div
        onClick={function () {
          this.setState({ test: this.state.test + "1" });
          //state 재정의
        }.bind(this)}
      >
        {this.props.text}//
        {this.state.test}
      </div>
    );
  }
}
