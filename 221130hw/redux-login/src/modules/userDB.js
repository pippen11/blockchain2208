// 회원가입한 유저들의 정보
//2번
const TYPE = {
  REGIST: "userDB/regist",
};

//action
const regist = (userId, userPw, userName) => {
  // 8. regist를 호출당했다 . userId, userPw,userName를 매개변수로 받았다.
  console.log("8. action regist");
  // 9.{type:TYPE.REGIST,payload: { userId, userPw, userName }} 를반환했다<<액션

  return {
    type: TYPE.REGIST,
    payload: { userId, userPw, userName },
  };
};

//dispatch가 reducer로전달
// 사용자가 입력하는값은 매개변수로 받아옴

export const action = { regist };

export const initialize = [];

export const reducer = (state = initialize, action) => {
  // 12. dispatch가 액션(action)을 매개변수로 보내며 호출했다. state는 기존의 상태값이다
  // -state는 combinedreducers의 사용여부에 따라서 달라진다.
  console.log(action);
  const { type, payload } = action;
  console.log(state); // << []임

  //13. type에 따라서 state를 재정의한다. 재정의하고 싶은 정보를 return한다.

  switch (type) {
    case TYPE.REGIST:
      if (state.find((item) => item.userId === payload.userId)) return state;
      //find써서 값이 같으면 그냥 그대로 나옴 중복 된거 제외됨
      //find공부해보기
      else return [...state, payload];

    //기존값넣어줘서 페이로드를 추가 그래야 기존값이나옴

    //계속 배열로쓸거니까 배열로 묶음
    default:
      return state;
  }
};

//삼항연산자 => 조건 ? 참 : 거짓
//const temp = isBool ? 'true' : 'false'
// // 위를 if문을 써서 사용하려면
//함수를 만들어서 호출하는방식으로 써야함 삼항안쓰면
// function check(isBool) {
//   if (isBool) return "true";
//   else "false";
// }
// check(isBool);
