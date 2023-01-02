import { createSlice } from "@reduxjs/toolkit";
import { reducer } from "./counter";

let initialize = { productList: [], selectedItem: null };

//구식방식
// function producReducer(state = initialState, aciton) {
//   let { type, payload } = action;
//   switch (type) {
//     case "GET_PRODUCT_SUCCESS":
//       return { ...state, productList: payload.data };
//     case "GET_SINGLE_PRODUCT_SUCCESS":
//       return { ...state, selectedItem: payload.data };
//     default:
//       return { ...state };
//   }
// }

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getAllProducts(state, acion) {
      state.productList = action.payload.data;
      //state의 있는 producList값을 payload.data로 바꿔주겟다
      //기존은 state는 ...으로 복사하고 유지하되 producList만 바꾼다 toolkit은 return과 ...state생략가능
    },
    getSingleProduct(state, action) {
      state.selectedItem = action.payload.data;
    },
    // 위에 GET_PRODUCT_SUCCESS 이걸함수로만듬 여기서의 state와 action은 위에 state,action 매개변수와같음
  },
});

export const productActions = productSlice.actions;
//action도 export해야함
//그럼 다른곳에서 import {productActions} from "리듀서있는곳 지금여기파일"
//기존엔 dispatch({type:"GET_PRODUCT_SUCCESS",payload:{data}}) 이런식으로함
//import하면dispatch(productActions.getAllproducts(number))로 함수호출해서 dispatch함
//저기 number가 알아서 payload 값으로 들어감 보내고싶은거 넣으면됨 {data}이렇게 보내면 위에 payload.data에 들어감

export default productSlice.reducer;
//producSlice의 하나의 큰 리듀서 export해줌
