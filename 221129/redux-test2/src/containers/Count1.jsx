//Containers VS Components
//Javascript등의 로직 vs HTMl 구조
//나누는 이유: 가시성? 리뷰, 유지보수에 좋다
//count1방식 이거보다 count2방식을 추천한다.

import Count1Comp from "../components/Count1";
import { action } from "../modules/count1";
import { useState } from "react";
import store from "../store";
//위에것들 import하는 이유?

const Count1Contatiner = () => {
  const count1 = store.getState().count1;
  // 이거 쓴이유? store에서 어디값을 가져옴?
  const [_, render] = useState(true);

  const plus = () => {
    store.dispatch(action.plus);
    //여기서 보내주는값 modules count1에서 reducer에서 어떤식으로받음?
    render((state) => !state);
  };
  const minus = () => {
    store.dispatch(action.minus);
    render((state) => !state);
  };

  const input = (input) => {
    store.dispatch(action.input(input));
    render((state) => !state);
  };

  return <Count1Comp count1={count1} plus={plus} minus={minus} input={input} />;
  //위에 함수안에 매개변수안써도 가능?
};

export default Count1Contatiner;
