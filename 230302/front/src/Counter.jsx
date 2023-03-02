import { useState, useEffect } from "react";
import CounterContract from "./contracts/Counter.json";

const Counter = ({ web3, account }) => {
  const [count, setCount] = useState(0);
  const [deployed, setDeployed] = useState();

  useEffect(() => {
    (async () => {
      if (deployed) return;
      const _deployed = new web3.eth.Contract(
        CounterContract.abi,
        "0xF16DbC3B15c92501BC7F148B73348ff30b6E27Cc"
      );
      // 어제 4,5번 abi랑 ca넣어서 컨트랙트
      setDeployed(_deployed);
      const _count = await _deployed.methods.getCount().call();
      //   let text = await deployed.methods.getText().call(); 이거랑같다
      setCount(parseInt(_count));
    })();
  }, []);

  const increment = async () => {
    const result = await deployed.methods.increment().send({ from: account });
    if (!result) return;
    const _count = await deployed.methods.getCount().call();
    setCount(parseInt(_count));
  };
  const decrement = async () => {
    const result = await deployed.methods.decrement().send({ from: account });
    if (!result) return;
    const _count = await deployed.methods.getCount().call();
    setCount(parseInt(_count));
  };
  return (
    <div>
      <h2>Count: {count}</h2>
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
