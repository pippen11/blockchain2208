import React, { useEffect, useState } from 'react';
import CounterContract from '../contracts/Counter.json';

const Counter = ({ web3, account }) => {
    const [count, setCount] = useState(0);
    const [deployed, setDeployed] = useState(null);

    const increment = async () => {
        // 인자값으로 트랜잭션을 발생시킬 계정을 넣어준다.
        const result = await deployed.methods.increment().send({ from: account });

        if (!result) return;

        const current = await deployed.methods.current().call();
        setCount(current);
    };

    const decrement = async () => {
        const result = await deployed.methods.decrement().send({ from: account });

        if (!result) return;

        const current = await deployed.methods.current().call();
        setCount(current);
    };

    // Truffle 에서는 deployed() 를 사용해 배포된 컨트랙트를 가져왔었다.
    // Web3 에서는 new web3.eth.Contract() 를 사용한다.

    useEffect(() => {
        (async () => {
            if (deployed) return;

            // Contract를 호출할 때 필요한 값들을 인자값으로 전달
            // 인자값 2개 , (abi, CA)
            const Deployed = new web3.eth.Contract(CounterContract.abi, '0xB275b8A06f34d9428CB34e5c1be036c863215db8');

            const count = await Deployed.methods.current().call();

            setCount(parseInt(count));
            setDeployed(Deployed);
        })();
    }, []);

    return (
        <div>
            <h2>Counter : {count}</h2>
            <button onClick={() => increment()}>+</button>
            <button onClick={() => decrement()}>-</button>
        </div>
    );
};

export default Counter;
