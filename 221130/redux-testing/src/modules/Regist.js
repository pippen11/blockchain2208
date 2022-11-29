const TYPE = {
  REGIST: "regist/regist",
  LOGIN: "regist/login",
  LOGOUT: "regist/logout",
  INPUT: "regist/input",
};

const regist = {
  type: TYPE.REGIST,
};

const login = {
  type: TYPE.LOGIN,
};

const input = (input) => ({
  type: TYPE.INPUT,
  payload: { input },
});

const logout = {
  type: TYPE.LOGOUT,
};

export const action = { regist, login, input, logout };

export const initialize = { registvalue: "" };

export const reducer = (state = "", action) => {
  const { type, payload } = action;

  switch (type) {
    case TYPE.REGIST:
      return state;
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
