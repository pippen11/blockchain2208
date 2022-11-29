const TYPE = {
  REGIST: "regist/regist",
  LOGIN: "regist/login",
  LOGOUT: "regist/logout",
  INPUT: "regist/input",
};

const regist = (userinfo) => ({
  type: TYPE.REGIST,
  payload: { userinfo },
});

const login = (userlogin) => ({
  type: TYPE.LOGIN,
  // payload: { userlogin },
});

const input = () => ({
  type: TYPE.INPUT,
});

const logout = {
  type: TYPE.LOGOUT,
};

export const action = { regist, login, input, logout };

export const initialize = { registvalue: "" };

export const reducer = (state = "", action) => {
  const { type, payload } = action;
  console.log(payload);

  switch (type) {
    case TYPE.REGIST:
      return { ...payload, payload };
    case TYPE.LOGIN:
      return state;
    case TYPE.INPUT:
      return state;
    case TYPE.LOGOUT:
      return state;
    default:
      return state;
  }
};
