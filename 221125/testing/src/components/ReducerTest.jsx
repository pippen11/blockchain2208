//useReducer << reducer를 사용하는 Hook
//reducer가 무엇인가? << 변수를 정의함에 있어서 선행작업? 정도되는 함수이다.
//state /reducer /action / dispatch
// state: 상태값이다.
// action : 요청내용.(보통 객체이다.)
// dispath: 요청을 받는 함수이다.
// reducer : 요청을 실행하는 함수이다.
// 동사무소에 가서 주민등록등본 발급한다.
// -가서 번호표 뽑고 기다렸다가 순서가 되면 접수원에게 가서 서류를 제출/
//`발급해주세요` 라고 말하고 민증 , 지문 , 돈을 준다.
// -서류 제출 / "발급해주세요"<< action={주민등록 등본을 발행해주세요,민증, 지문 ,돈}
// -접수원이 요청을 받는다. << dispatch
// -접수원이 작업후에 서류를 준다<< reducer
// -접수원이 모든것을 받아서 확인후에 정보를 찾아서 출력해서 우리에게 전달한다.

import { useReducer, createContext } from "react";
//useReducer은 reducer state action등 쓰기위한것
export const OfficeContext = createContext();
//createContext는 지역변수를 전역변수로 전달해주기위한것

const reducer = (state, action) => {
  console.log(state);
  console.log(action);
  //reducer : 작업해서 state를 정의하는 녀석
  switch (action.type) {
    case "주민등록등본":
      if (action.payload.pay < 500) return "돈내놔";
      return "주민등록등본이 발급되었습니다.";
    case "주민등록초본":
      return "주민등록초본이 발급되었습니다.";
    case "건축물대장":
      return "요청이 없습니다.";
    case "지방세납세증명":
      return "요청이 없습니다.";
    case "운전면허 정보":
      return "요청이 없습니다.";
    case "전입신고":
      return "요청이 없습니다.";
    case "코로나19 격리통지서":
      return "요청이 없습니다.";
    case "병적증명서 발급":
      return "요청이 없습니다.";

    default:
      return "요청이 없습니다";
  }
};

export default function ReducerTest({ children }) {
  //   children은 컴포넌트의 자식 컴포넌트(엘리먼트)이다.
  // children안쓰면 자식 컴포넌트가 있는지 인식을못한다.
  const [result, requestDispatch] = useReducer(reducer, "요청이 없습니다.");

  // const [state,dispatch]=useReducer(reducer,initialState)
  return (
    <OfficeContext.Provider value={{ result, requestDispatch }}>
      {/* 지역변수를 전역변수로 result,requestDispatch값을 보내줌*/}
      {/* <ReducerTest>
           <Office />
          </ReducerTest> ReducerTest 안에 자식을 인식못해서 {children}으로 써서받아옴*/}
      {children}
    </OfficeContext.Provider>
  );
}
