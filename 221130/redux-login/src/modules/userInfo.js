// 로그인한 유저의 정보
//1번

//여기서 스토어꺼 못가져온다 아직 생성이안되서

const TYPE = {
  LOGIN: "userInfo/login",
  LOGOUT: "userInfo/logout",
};

const logIn = (userId, userPw, userDB) => ({
  type: TYPE.LOGIN,
  payload: { userId, userPw, userDB },
  // ===payload: {userId: usrId, userPw: userPw, userDB: userDB}
  //위에 키값안쓴건 키가됨 그냥 값자체를 갖고있기때문
  //필요한 정보는 payload를 통해받음
});

const logOut = () => ({
  type: TYPE.LOGOUT,
});
//매개변수 받을필요없어서 들어갈필요없다

export const action = { logIn, logOut };

export const initialize = { userId: "", userName: "" };
//처음엔 이걸로 들어가있음
//로그인 했을때 아이디와 이름을 저장하겠다.

export const reducer = (state = initialize, action) => {
  const { type, payload } = action;

  switch (type) {
    case TYPE.LOGIN:
      //이부분 다시보기
      const tempUser = payload.userDB.find(
        //tempUser는 db에 저장되있는것 찾아서 넣어줌
        (item) => item.userId === payload.userId
      );
      if (tempUser && tempUser.userPw === payload.userPw)
        return {
          userId: tempUser.userId,
          userName: tempUser.userName,
        };
      //이 리턴값이 store로 들어간다
      console.log(payload.userDB);
      return state;

    case TYPE.LOGOUT:
      return initialize;

    default:
      return state;
  }
};
