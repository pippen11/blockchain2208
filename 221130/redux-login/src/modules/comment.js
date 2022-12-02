const TYPE = {
  ADD: "comment/add",
  EDIT: "comment/edit",
  REMOVE: "comment/remove",
};
//게시글에 직접 덧글을 추가할수잇으나 그런방식은 비효율적이다.
// 이유는 덧글이 추가될때마다 해당게시글을 업데이트해야한다.

const add = (text, userName, boardId) => {
  return {
    type: TYPE.ADD,
    payload: { text, userName, boardId },
  };
};

const edit = (id, text) => ({
  type: TYPE.EDIT,
  payload: {
    id,
    text,
  },
});

const remove = (id) => ({
  type: TYPE.REMOVE,
  payload: {
    id,
  },
});

export const action = { add, edit, remove };

export const initialize = [];

let id = 0;
export const reducer = (state = initialize, action) => {
  const { type, payload } = action;

  switch (type) {
    case TYPE.ADD:
      id++;
      return [
        { id, ...payload, createdAt: new Date().toLocaleString() },
        ...state,
      ];

    case TYPE.EDIT: {
      const index = state.findIndex((item) => item.id == payload.id);
      return [
        ...state.slice(0, index),
        { ...state[index], ...payload },
        ...state.slice(index + 1),
      ];
    }

    case TYPE.REMOVE: {
      const index = state.findIndex((item) => item.id == payload.id);
      return [...state.slice(0, index), ...state.slice(index + 1)];
    }

    default:
      return state;
  }
};
