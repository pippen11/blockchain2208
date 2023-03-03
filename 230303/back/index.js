// npm i express cors truffle web3
// npm i -D prettier-plugin-solidity
// npx truffle init
const express = require("express");
const cors = require("cors");
const Web3 = require("web3");
const CounterContract = require("./build/contracts/Counter.json");

const app = express();
const web3 = new Web3("http://127.0.0.1:8545");
// localhost로 넣으면 안될수가있다

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

app.post("/api/increment", async (req, res) => {
  // /맨앞에 라우터 /붙이면 절대주소가된다
  const from = req.body.from;
  //   console.log(from);
  const nonce = await web3.eth.getTransactionCount(from);
  //   console.log(nonce);
  // 블록체인 네트워크쪽에서 받아오는 값이다
  // 메타마스크처리 오류날경우대비해서 쓴다
  // nonce: 트랜잭션 갯수 << 매개변수로 전달된 지갑 주소의 Transaction 개수를 다음 트랜잭션에서 확인한다<< 생성된 트랜잭션들은 순서가 있다.
  //- 메타마스크에서 다른 계정에 Ether를 보내고 채굴을 했는데 그 지갑 주소의 트랜잭션이 순서대로 되지 않았을때 정상 작동 하지 않는 경우가 발생한다
  // - 메타마스크에서는 3개의 트랜잭션을 기억하고 있고 그래서 다음 nonce가 3으로 전달되었고/ Ganache는 새로 시작해서 그지갑 주소의 트랜잭션이 없을때는 nonce가 0이여야하지만
  // 메타마스크 기준 3으로 전달된다. -> 정상적인 트랜잭션이 아니라고 판단되어 블록에 추가되지 않는다.

  const networkId = await web3.eth.net.getId();
  const CA = CounterContract.networks[networkId].address;
  console.log(CA);
  const abi = CounterContract.abi;

  const deplyed = new web3.eth.Contract(abi, CA);
  const data = await deplyed.methods.increment().encodeABI();
  // 트랜잭션을 바로 보내는(send)하는것이 아닌 bytecode 형식으로 변환하여 data에 포함시킨다

  const txObj = {
    nonce,
    from,
    to: CA,
    data,
  };

  res.json(txObj);
  // res.json은 json형식으로 보내는것
});

app.listen(8080, () => {
  console.log("server start");
});
