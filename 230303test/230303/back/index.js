const express = require("express");
const cors = require("cors");
const Web3 = require("web3");
const CounterContract = require("./build/contracts/Counter.json");

const app = express();
const web3 = new Web3("http://127.0.0.1:8545");

app.use(cors({ origin: true, credentials: true }));
// origin : true => 모든 주소에 대해서 cors 허용
app.use(express.json());

app.use("/", async (req, res, next) => {
  // 서버열자마자 실행
  const networkId = await web3.eth.net.getId();
  // console.log(networkId); Counter.json파일의 networks의 1677805775666이나옴
  // "networks": {
  //   "1677805775666": {
  //     "events": {},
  //     "links": {},
  //     "address": "0x9327b7e5eFe7ECF0ff92f983c8586d62eFd4E752",
  //     "transactionHash": "0x2378d2418d108da2a086697609afaa95d0bc66d8ba21be434d1852ee944806cd"
  //   }
  global.CA = CounterContract.networks[networkId].address;
  // CA를 global은 밑에서 쓰려고 한다

  const abi = CounterContract.abi;

  global.deployed = new web3.eth.Contract(abi, global.CA);
  // 스마트컨트랙트 배포

  next();
});

app.post("/api/count", async (req, res) => {
  const count = await global.deployed.methods.getCount().call();
  res.json({ count });
});

app.post("/api/ca", async (req, res) => {
  res.json({ CA: global.CA });
  //global.CA로 못보내서 키 값으로 객체로묶어서보냄
});

app.post("/api/increment", async (req, res) => {
  //console.log(req.body)
  // { from: '0xa5f521a951d19881d67ed2b30ea8299288d46445' }
  const from = req.body.from;
  const nonce = await web3.eth.getTransactionCount(from);
  // from값을 넣어서 트랜잭션을 카운트한다
  // 연결돼서 메타마스크 요청갈때마다 값이바뀐다
  // console.log(nonce);
  // 블록체인 네트워크쪽에서 받아오는 값이다
  // 메타마스크처리 오류날경우대비해서 쓴다
  // nonce: 트랜잭션 갯수 << 매개변수로 전달된 지갑 주소의 Transaction 개수를 다음 트랜잭션에서 확인한다<< 생성된 트랜잭션들은 순서가 있다.
  //- 메타마스크에서 다른 계정에 Ether를 보내고 채굴을 했는데 그 지갑 주소의 트랜잭션이 순서대로 되지 않았을때 정상 작동 하지 않는 경우가 발생한다
  // - 메타마스크에서는 3개의 트랜잭션을 기억하고 있고 그래서 다음 nonce가 3으로 전달되었고/ Ganache는 새로 시작해서 그지갑 주소의 트랜잭션이 없을때는 nonce가 0이여야하지만
  // 메타마스크 기준 3으로 전달된다. -> 정상적인 트랜잭션이 아니라고 판단되어 블록에 추가되지 않는다.
  const data = await global.deployed.methods.increment().encodeABI();
  //0xd09de08a 이값은 뭐? 증가시키는함수를 실행시킨값을 bytecode형식으로변환
  // 트랜잭션을 바로 보내는(send)하는것이 아닌 bytecode 형식으로 변환하여 data에 포함시킨다
  // console.log(data);

  const txObj = {
    nonce,
    from,
    to: global.CA,
    data,
  };

  // 트랜잭션안에 nonce값,from,CA,data를 포함시켜서 보내준다
  // to는 컨트랙트 어드레스이다
  res.json(txObj);
});

app.post("/api/decrement", async (req, res) => {
  console.log(req.body);
  const from = req.body.from;
  const nonce = await web3.eth.getTransactionCount(from);
  const data = await global.deployed.methods.decrement().encodeABI();

  const txObj = {
    nonce,
    from,
    to: global.CA,
    data,
  };

  res.json(txObj);
});

app.listen(8080, () => {
  console.log("server start");
});
