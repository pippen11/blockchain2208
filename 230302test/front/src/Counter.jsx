import { useState, useEffect } from "react";
import CounterContract from "./contracts/Counter.json";

const Counter = ({ account, web3 }) => {
  const [count, setCount] = useState(0);
  const [deployed, setDeployed] = useState();
  //useState() 매개변수안에 아무것도 안넣으면 undefined다
  useEffect(() => {
    (async () => {
      if (deployed) return;
      const _deployed = new web3.eth.Contract(
        CounterContract.abi,
        "0x699A58B8197369E712C56E94008CC8366499Dc19"
      );
      // web3함수의 eth의 Contract메서드로
      // counterContract의 abi와 CA(컨트랙트어드레스)넣어줌으로써
      // 컨트랙트 생성(연결) 및 컨트랙트에 CA를 연결한다
      // _deployed안에는 methods포함 여러메서드가있다
      setDeployed(_deployed);

      const _count = await _deployed.methods.getCount().call();
      //   console.log(_count);
      setCount(parseInt(_count));
    })();
  }, []);
  //useEffect안에 async함수던 다른함수넣어서 즉시실행하려면
  // ()로묶고 ()써서 즉시실행시켜야 돈다

  //Counter.sol 스마트컨트랙트 상호작용 계약 함수 실행
  const increment = async () => {
    const result = await deployed.methods.increment().send({ from: account });
    // 값을 바꾸는거니까 가스비 낼사람이 필요해서 from?
    if (!result) return;
    const _count = await deployed.methods.getCount().call();
    // console.log(_count);
    // 위에 증가된함수 돌아서 1이된다
    setCount(parseInt(_count));
  };
  const decrement = async () => {
    const result = await deployed.methods.decrement().send({ from: account });
    // 값을 바꾸는거니까 가스비 낼사람이 필요해서 from?
    if (!result) return;
    const _count = await deployed.methods.getCount().call();
    // console.log(_count);
    // 위에 증가된함수 돌아서 1이된다
    setCount(parseInt(_count));
  };

  return (
    <div>
      <h2>Count:{count} </h2>
      <button
        onClick={() => {
          increment();
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          decrement();
        }}
      >
        -
      </button>
    </div>
  );
};

export default Counter;
