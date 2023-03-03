import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const Counter = ({ web3, account }) => {
  const [count, setCount] = useState(0);

  //useCallback , useMemo
  // useCallback쓰는이유?
  //useMemo 는 특정 결과값을 재사용 할 때 사용하는 반면, useCallback 은 **특정 함수를 새로 만들지 않고 재사용하고 싶을때 사용**
  // 한다는 점.
  //
  const getCount = useCallback(async () => {
    const _count = (await axios.post("http://localhost:8080/api/count")).data
      .count;
    // console.log(_count); .data.count안쓰면 그만큼 타고들어가야함
    setCount(_count);
  }, []);

  useEffect(() => {
    getCount();
    (async () => {
      const { CA } = (await axios.post("http://localhost:8080/api/ca")).data;
      // 객체 키 값으로와서 구조분해할당

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
        const params = [
          { type: "int256", name: "count" },
          { type: "string", name: "text" },
        ];
        // Counter.sol파일참고
        // Solidity에서 log로 받아오는 데이터에 대한 타입과 변수명
        // name을 바꿔주면 name에 따라 나온다
        // console.log(params);
        const value = web3.eth.abi.decodeLog(params, log.data);
        // console.log(value);
        console.log(value.text);
        setCount(value.count);
      });
    })();
  }, []);

  const increment = async () => {
    const data = (
      await axios.post("http://localhost:8080/api/increment", { from: account })
    ).data;
    await web3.eth.sendTransaction(data);
    // 메타마스크에 받아온 값으로 트랜잭션을 요청보낸다 ->서명진행->블록체인쪽에 트랜잭션을보낸다
  };

  const decrement = async () => {
    const data = (
      await axios.post("http://localhost:8080/api/decrement", { from: account })
    ).data;
    await web3.eth.sendTransaction(data);
  };

  return (
    <div>
      <h2>Count : {count}</h2>
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
