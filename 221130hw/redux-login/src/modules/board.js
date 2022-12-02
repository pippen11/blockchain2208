const TYPE = {
  ADD: "board/add",
  REMOVE: "board/remove",
  EDIT: "board/edit",
};

const add = (title, text, userName) => ({
  type: TYPE.ADD,
  payload: {
    title,
    text,
    userName,
  },
});

const remove = (id) => ({
  type: TYPE.REMOVE,
  payload: { id },
});

const edit = (id, title, text) => ({
  type: TYPE.EDIT,
  payload: { id, title, text },
});

export const action = { add, remove, edit };
//구조분해할당?

export const initialize = [];

let id = 0;

export const reducer = (state = initialize, action) => {
  const { type, payload } = action;
  // console.log(payload);
  //   const { title, text, userName } = payload;
  //   title,text,userName빼서 쓰겠다

  // const { title, text, userName } = payload;
  //title, text userName빼서 쓰겠다
  //밑에다가 쓰면 처음에 한번 싹 돌리기때문에 터짐 switch문 안에들어가야 안터진다
  switch (type) {
    case TYPE.ADD:
      id++;
      const { title, text, userName } = payload;
      return [
        { id, title, text, userName, createdAt: new Date().toLocaleString() },
        ...state,
      ];
    case TYPE.REMOVE:
      return state;
    case TYPE.EDIT:
      return state;
    default:
      return state;
  }
};
