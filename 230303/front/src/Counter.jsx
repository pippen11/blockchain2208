import { useState, useEffect } from "react";
import CounterContract from "./contracts/Counter.json";
import axios from "axios";

const Counter = ({ web3, account }) => {
  const [count, setCount] = useState(0);
  const [deployed, setDeployed] = useState();

  useEffect(() => {
    (async () => {
      if (deployed) return;
      // const _deployed = new web3.eth.Contract(
      //   CounterContract.abi,
      //   "0xF16DbC3B15c92501BC7F148B73348ff30b6E27Cc"
      // );
      // 어제 4,5번 abi랑 ca넣어서 컨트랙트
      const networkId = await web3.eth.net.getId();
      // console.log(networkId); 1677805775666
      //
      // "networks": {
      //   "1677805775666": {
      //     "events": {},
      //     "links": {},
      //     "address": "0x9327b7e5eFe7ECF0ff92f983c8586d62eFd4E752",
      //     "transactionHash": "0x2378d2418d108da2a086697609afaa95d0bc66d8ba21be434d1852ee944806cd"
      //   }
      // },
      //
      const CA = CounterContract.networks[networkId].address;

      const abi = CounterContract.abi;

      const _deployed = new web3.eth.Contract(abi, CA);
      setDeployed(_deployed);

      const _count = await _deployed.methods.getCount().call();
      //   let text = await deployed.methods.getText().call(); 이거랑같다
      setCount(parseInt(_count));

      // 형식 logs는 정해져있다 on뒤도 정해져있다
      web3.eth.subscribe("logs", { address: CA }).on("data", (log) => {
        // subscribe로 소켓통신으로 받아오고있다.
        // subscribe 메서드를 사용해서 블록체인네트워크에 구독, 이벤트명은 logs이다.
        // Solidity에서 event 이벤트명(로그를 남길 데이터/변수)를 선언하고
        // event Count(int256 count);
        // 로그를 남길 순간에 emit으로 구독한 서버에 알린다.
        // emit Count(count);
        // emit으로 전단될 데이터는 log.data에 들어있다
        // subscribe의 두번째 매개변수에 옵션을 추가할수 있으며 address 옵션은 해당 주소에
        // 대해서만 logs를 받는다.
        // console.log(log);

        // event Count(int256 count);
        const params = [{ type: "int256", name: "count" }];
        // Solidity에서 log로 받아오는 데이터에 대한 타입과 변수명
        // name을 바꿔주면 name에 따라 나온다
        // console.log(params);
        const value = web3.eth.abi.decodeLog(params, log.data);
        console.log(value);
        setCount(value.count);
      });
    })();
  }, []);

  const increment = async () => {
    // const result = await deployed.methods.increment().send({ from: account });
    // if (!result) return;
    // const _count = await deployed.methods.getCount().call();
    // setCount(parseInt(_count));
    const data = (
      await axios.post("http://localhost:8080/api/increment", {
        from: account,
      })
    ).data;
    await web3.eth.sendTransaction(data);
  };
  const decrement = async () => {
    const result = await deployed.methods.decrement().send({ from: account });
    // if (!result) return;
    // const _count = await deployed.methods.getCount().call();
    // setCount(parseInt(_count));
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
