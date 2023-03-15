const Counter = artifacts.require('Counter');

describe('Counter Test', () => {
    let counter;
    it('Counter deployed', async () => {
        counter = await Counter.deployed(); // Promise 객체 반환
        console.log(counter);
        // deployed()는 truffle에서 자체적으로 만들어 놓은 함수
        // web3 라이브러리에서는 methods 객체에 접근해서 사용해야 한다. counter.methods.current.call()
        // truffle 에서는 methods 생략 가능
    });

    it('get current', async () => {
        // Promise 객체를 반환
        // truffle 콘솔창에서는 실행 완료된 다음 명령이 실행되기 때문에 then 구문이 없어도 된다.
        console.log(await counter.current.call());
    });

    it('increment', async () => {
        await counter.increment();
        console.log(await counter.current.call());
    });

    it('decrement', async () => {
        await counter.decrement();
        const result = await counter.current.call(); // return 값이 BN
        console.log(result.toNumber());
    });
});
