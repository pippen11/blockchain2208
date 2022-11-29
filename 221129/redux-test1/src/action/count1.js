export const COUNT1 = {
  PLUS: "count1/plus",
  MINUS: "count1/minus",
};
//위에서 맘대로 바꿔도 쉽게 가져올수있다.

//변수명이 전부 대문자다. 왜일까?
// 수정하지 않고 가져다 쓸 변수<< 관례중 하나
//예 : DB의 컬럼명들
//바꿔주는이유가 더쓰기편하게?

const plus = (input) => {
  console.log(input);
  //이런식으로 코드 위에 추가해줄수있다.
  return { type: COUNT1.PLUS, payload: { input } };
};
//plus함수가 type값이랑 payload값 리턴해서 내보냄

const minus = (input) => ({
  type: COUNT1.MINUS,
  payload: { input },
});

export const actions = { plus, minus };
//actions는 plus랑 minus함수 즉 type과 payload내보냄
