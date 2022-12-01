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
  //   여기도 구조분해할당?

  // const { title, text, userName } = payload;
  //이거 위에쓰면 안되는이유?
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
  }
  defalt: return state;
};
