const { Contract } = require('./controllers/compile');
const { Client } = require('./controllers/client');

const [abi, bytecode] = Contract.compile('HelloWorld.sol');

const client = new Client('ws://127.0.0.1:9005');
// console.log('여기여기여기여기여기', client);

// deploy
const txObject = {
    data: bytecode,
};

// 트랜잭션 발생시키기
// 1. eth.sendTransaction()
// 2. const contract = eth.contract(abi) => contract.new(txObject)

const contract = new client.web3.eth.Contract(abi);

// web3 라이브러리에서 버전업 되면서 contract.new(txObject) 가 아니라 contract.deploy(txObject) 로 사용
// web3 deploy
// contract.deploy() 의 반환값은 promise 객체

// contract
//     .deploy(txObject)
//     .send({ from: '0x65555766ecd47f2e7a596a7da929fa5d3f1dc28d' })
//     .then((instance) => {
//         console.log(instance.options.address); // Contract Address
//     });
// 블록이 마이닝 됐을 때 then 구문이 실행됨

// web3 deploy
async function init() {
    // 트랜잭션 풀에 있는 내용이 블록에 쌓일 때까지 await
    const instance = await contract.deploy(txObject).send({ from: '0x65555766ecd47f2e7a596a7da929fa5d3f1dc28d' });

    console.log(instance.options.address); // Contract Address
}

// init() 호출시 트랜잭션 배포 (txpool에 트랜잭션이 들어감)
// init();

const CA = '0x7719722c312BaF7D6D27BE0aE7E8b09f7FD3D30F';
const deployed = new client.web3.eth.Contract(abi, CA); // abi 파일과 CA를 이용해 컨트랙트 조회 가능

deployed.methods
    .value()
    .call()
    .then((data) => {
        console.log(data);
    });

deployed.methods
    .setValue('Hello Smart Contract!!')
    .send({ from: '0x65555766ecd47f2e7a596a7da929fa5d3f1dc28d' })
    .then((data) => {
        console.log(data);
    });
