const TYPE = {
  PLUS: "count2/plus",
  MINUS: "count2/minus",
  INPUT: "count2/input",
};
//action에서 사용할 type을 미리 정의해준다

const plus = {
  type: TYPE.PLUS,
}; //plus에대한 action

const minus = {
  type: TYPE.MINUS,
}; //minus에대한 action

const input = (input) => ({
  type: TYPE.INPUT,
  payload: { input },
  //안에 매개변수 input이랑 payload:{input}안에 값이랑은 같아야하는데 dispatch로보내는 input이랑은 변수명 달라도됨
  // 변수명달라도 inputNUm값 받는건 똑같다
}); //input에대한 action을 return하는 함수

export const action = { plus, minus, input };
//액션들 하나로 묶어서 보냄

export const initialize = { count2: 0 };
//초기값줌

export const reducer = (state = 0, action) => {
  const { type, payload } = action;

  switch (type) {
    case TYPE.PLUS:
      return state + 2;

    case TYPE.MINUS:
      return state - 2;

    case TYPE.INPUT:
      return payload.input;

    default:
      return state;
  }
};

// const mapDispatchToprops = (dispatch) => {
//   //이거쓰면 dispatch를 그냥받아옴?
//   return {
//     plus: () => {
//       dispatch(action.plus);
//이렇게 보내는값을 reducer에서 받아서 action.plus type찾아감
//       //이렇게쓰는형식?
//     },
//     minus: () => {
//       dispatch(action.plus);
//     },
//     input: (input) => {
//       dispatch(action.input(input));
//     },
//   };
//   //객체 내의 값이 그대로 props로 전달된다.
// };
