const reducer = (state = 0, action) => {
  const { type, payload } = action;

  switch (type) {
    case "array/add":
      return [...state, payload];

    case "array/delte":
      return [...state.slice(0, state.length - 1)];
    default:
      return state;
  }
};

export default reducer;
