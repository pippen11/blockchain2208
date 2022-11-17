import React from "react";

export default class ClassComp extends React.Component {
  //클래스형 컴포넌트

  constructor(props) {
    super(props);
    //constructor실행하고 렌더를 실행

    //props란 상위 컴포넌트에서 전달하는 데이터이다.
    // <ClassComp style={{width:'10px}}></ClassComp>
    // style은 attribute인가? props인가?
    //attribute<< HTML태그에 적는것
    // ClassComp는 컴포넌트이다 . 때문에 props(프로퍼티)
    //예제와 같이 style을 전달했다면 <div style={this.props.style}></div>; 와같이 써야한다

    this.state = { count: 0 };
    //const [count, setCount] = useState(0)
    //위에 두개는 같은거

    //this.state={ count : 0, name : "경훈"}
    //const [count,setCount] = useState(0)
    //count의 초기값은 0
    //count[name,setName]=useState("경훈")
    //name의 초기값은 경훈
  }
  render() {
    return (
      <div
        onClick={function () {
          this.setState({ count: this.state.count + 1 });
        }}
      >
        {count}
        {console.log("asdf")}
      </div>
    );
  }
  //render화면에 출력
}

//위아래가 같은얘기임

// export default function ClassComp({}){
//함수형
// return <div></div>
// }
