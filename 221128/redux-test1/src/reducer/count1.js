const reducer = (state = 0, action) => {
  console.log(state, action);
  const { type, payload } = action;

  switch (type) {
    case "count1/plus":
      return state + payload.input;
    //기존의 state값을 가져오고 count1을 넣겠다 기존내용에 잇었으면 이렇게수정하겠다
    //...state<<기존에 state를 넣는다.
    // count1 : state.count1 + paylad.input << count1 프로퍼티에 payload로 받은 input프로퍼티를 더한다.
    case "count1/minus":
      //"count1/minus" 형식처럼 /로나누면
      // 앞에 count1이 store내의 state자체를 의미하게된다.
      // reducer가 가져오는 state는 store내의 count1이된다
      return state - payload.input;

    default:
      return state;
  }
};

export default reducer;
