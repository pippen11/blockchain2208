const TYPE = {
  PLUS: "count1/plus",
  MINUS: "count1/minus",
  INPUT: "count1/input",
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
}); //input에대한 action을 return하는 함수

export const action = { plus, minus, input };
//액션들 하나로 묶어서 보냄

export const initialize = { count1: 0 };
//초기값줌

export const reducer = (state = 0, action) => {
  const { type, payload } = action;

  switch (type) {
    case TYPE.PLUS:
      return state + 1;

    case TYPE.MINUS:
      return state - 1;

    case TYPE.INPUT:
      return payload.input;

    default:
      return state;
  }
};
