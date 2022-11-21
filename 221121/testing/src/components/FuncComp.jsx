import { useState } from "react";
import { useEffect } from "react";

// export default function FuncComp(props) {
//   props.func();
//const {text, func}=props

//   return <div>FuncComp{props.text}</div>;
// }

//일단 콘솔로그 한번쫙찍힘
export default function FuncComp({ text, func }) {
  //함수형 컴포넌트에서 클래스형 컴포넌트의 기능들을 사용하기 위해
  // 사용하는것을 hook이라고한다
  // hook은 use로 시작한다
  // useState,useEffect,useCallback,useMeomo,useRef,useContext,useReducer등등이있다.
  //hook은 사용자가 구현할수도있다(커스텀훅)
  // custom hook과 component의 차이-> html문법으로return하는가 안하는가?
  //useState와 useEffect는 뺄수없는 hook이다 , 단 나머지는 사용하지않아도 크게상관없다
  const [test, setTest] = useState("state test");

  //state 선언 및 정의(초기화)
  // state: 상태값 , react에서의 리랜더링(다시그리기)의 기준이 된다.
  //state가 변경(재정의)되면 컴포넌트를 다시 불러온다.
  //단 , 다시불러올때 hook으로 된 변수 , 함수들은 다시 부르지 않는다( useState등등)
  //useState는 함수형 컴포넌트의 투톱중 하나다.

  const [test1] = useState("state test1");

  func();

  useEffect(() => {
    //useEffect는 랜더링 후에 실행되는 콜백함수
    console.log("useEffect");
    //아래가 componentWillUnmount와 같다
    return () => {
      console.log("componentWillUnmount");
    };
  }, []);
  //빈배열만 적으면componentDidMount
  // 빈배열안에 return값적으면 componentdidmount랑 componentwillunmount랑 같이쓴것
  //willunmount는 componentdidmount랑 같이써야함
  //빈배열의 useEffect에서 함수를 return하면 componentWillUnmount와 같은 작동을 한다.

  //
  //디드마운트랑 같은거라 생각하면됨
  //useEffect의 두번째 매개변수는 state값의 배열을 넣는다.
  //빈배열의 경우 componentDidMount와 같은 역할을 한다.
  // 즉 마운트 됐을때만 실행한다.
  //useEffect는 함수형 컴포넌트 투톱중 하나다

  //밑에 useEffect는 componentdidupdate랑 같다
  useEffect(() => {
    console.log("state change");
    //(모든?)state값이 변화 했을때 실행되는 메서드
  });

  useEffect(() => {
    console.log("test change");
    //state중 test값이 변화했을때 실행되는 메서드
    //원하는 값만 변화했을때 실행됨
    //여기서는 test state임
  }, [test]);

  useEffect(() => {
    console.log("test1 change");
    //state중 test1값이 변화했을때 실행되는 메서드
    //원하는 값만 변화했을때 실행됨
  }, [test1]);
  //test1이 변할때만 찍힘 []안에 감지하고 싶음 state만 넣는다
  //두번째 매개변수 배열의 아이템으로 프로그래머가 감지하고 싶은 state(상태값)를 넣는다.
  //test1이 변경(재정의 )햇을때만 실행된다

  useEffect(() => {
    console.log("test||test1 change");
    //state중 test 또는 test1값이 변화했을때 실행되는 메서드
  }, [test, test1]);

  return (
    <div
      onClick={function () {
        setTest(test + "1"); //state 재정의
      }}
    >
      FuncComp//{text}//
      {test}//
      {test1}
    </div>
  );
}
