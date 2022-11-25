export function reducer(state, action) {
  // action이 count2다
  //reducer에서 action으로 값을받아서 처리한다음 state값을 변경
  console.log(state);
  console.log("hi");
  console.log(action);
  switch (action.type) {
    case "plus":
      return state + 1;
    case "minus":
      return state - 1;
    case "nanugi":
      return state / 10;
    case "multi":
      return state * 10;
    default:
      return 0;
  }
}
