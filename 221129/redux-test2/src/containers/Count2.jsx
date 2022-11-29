import Count2Comp from "../components/Count2";
import { connect } from "react-redux";
import { action } from "../modules/count2";

//useState랑 store안쓰고 action으로만 가능?

const Count2Contatiner = ({ count2, plus, minus, input }) => {
  return <Count2Comp count2={count2} plus={plus} minus={minus} input={input} />;
  //{input}은 아래에 함수 자체가됨
  // (inputNum) => {
  //   dispatch(action.input(inputNum));
  // },
  //Count2Comp로 매개변수들 보내줌
};
//함수명 아무거나 가능
const mapStateToprops = (state, props) => {
  console.log(props);
  console.log(state.count2);
  return { count2: state.count2 };
  //객체 내의 값이 그대로 props로 전달된다.
};
//app.js에서 보낸 props를 여기서 받음

const mapDispatchToprops = (dispatch) => {
  //이거쓰면 dispatch를 가져와서 reducer에보냄
  return {
    plus: () => {
      dispatch(action.plus);
      //이렇게쓰는형식?
    },
    minus: () => {
      dispatch(action.minus);
    },
    input: (input) => {
      dispatch(action.input(input));
      //(input)을 (inputNum)으로 바꿔도 상관없다
    },
  };
  //객체 내의 값이 그대로 props로 전달된다.
};

export default connect(mapStateToprops, mapDispatchToprops)(Count2Contatiner);
//안에 매개변수 함수이름은 아무거나 써줘도됨다
//connect는 매개변수로 mapStateToprops 콜백함수 또는  mapStateToprops 콜백함수와  mapDispatchToprops함수를 받는다.
//dispatchToprops넣으면 앞에껏도 무조건 들어가야함
//connect로 매개변수 첫번째 두번째 넣어서 Count2Container이랑 연결시켜서 count2,plus,minus,input을 받아오기위해 쓴다
//mapStateToprops 콜백함수와 mapDispatchToprops 콜백함수의 return값은 객체로 내보낸다.
// mapStateToprops콜백함수의 매개변수로는 state와 props를 받는다
// state는 store(redux)의 state이다.
//- props는 상위 컴포넌트(여기선 App.js)에서 전달한 props이다.
//mapDispatchToprops 콜백함수의 매개변수로는 dispatch를 받는다.
// dispatch는 store의 dispatch 메서드이다.
//mapStateToprops 콜백함수와, mapDispatchToprops 콜백함수의 return값은 객체는 합쳐져서 다음 컴포넌트(Count2Contatiner)에 props로 전달
