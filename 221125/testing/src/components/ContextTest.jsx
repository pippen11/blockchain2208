//useContext<<라는 Hook을 사용한다.
//Context란 무엇인가? 전역 상태 관리이다.
// let, const 같은 명령어로 변수를 지정했다 했을때
// React에서 사용하는 변수, 상태값들은 거의 대부분이 지역변수 , 상태값이다.
// 특히! 상태값(state)은 무조건 지역 스코프에 포함되어 외부로 나갈수없다.>>지역 변수와 같다.
// 전역 스코프에서 상태값을 쓰고싶다. -> Context라는 녀석이다.
//중간단계없이가능
import { useContext, createContext, Component, useState } from "react";

const TestContext = createContext();

export default function ContextTest() {
  const [num, setNum] = useState(12);
  return (
    <TestContext.Provider value={{ num, setNum }}>
      {/* {num,setNum}이 item이다 */}
      {/* 객체하나를 보내는거다 provider써서 전역변수를 지역변수로 쓰기위해씀*/}
      {/* value값자체를 하나밖에못보내서 객체또는 배열로 두개이상보냄 */}
      {/* 하위 컴포넌트 내에서 어디서든지 변수를 쓸수있도록 하기위해 Provider 컴포넌트로
    감싼다.*/}
      {/* Provider 컴포넌트의 value props를 사용해 전역변수로 사용할 데이터값을 정의한다. */}
      <Child1 />
    </TestContext.Provider>
  );
}

function Child1({}) {
  return <Child2 />;
}

function Child2({}) {
  return <Child3 />;
}

function Child3({}) {
  const item = useContext(TestContext);

  return (
    <div
      onClick={() => {
        item.setNum(item.num - 1);
      }}
    >
      child3{item.num}
      <Child4 />
    </div>
  );
}

function Child4({}) {
  return <Child5 />;
}

function Child5({}) {
  const item = useContext(TestContext);
  //   함수형은 item 이렇게 가져오거나 밑에 클래스형처럼 consumer써서도 가능

  function increase(e) {
    e.stopPropagation();
    item.setNum(item.num + 1);
  }
  //context를 가져오기위해 useContext를 사용한다.
  //매개변수로 생성한 Context를 전달한다.;
  return (
    <div onClick={increase}>
      child5{item.num}
      <Child6 />
    </div>
  );
}

class Child6 extends Component {
  render() {
    return (
      <TestContext.Consumer>
        {(item) => (
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            Child6{item.num}
          </div>
        )}
        {/* provider에서 제공한 value값이 item  */}
        {/* 클래스형은 testcontext.consumer방식만 가능한데 훅을못쓰니까 
        value값 가져오라면 */}
      </TestContext.Consumer>
    );
  }
}

//버블링: 하위 컴포넌트에서 발생한 이벤트가 상위 컴포넌트까지 이벤트를 영향을 미치게한다.
