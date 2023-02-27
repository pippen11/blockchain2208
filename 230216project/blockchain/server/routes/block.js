const Web3 = require("web3");

const router = require("express").Router();

const axios = require("axios");

const { Block, Transaction } = require("../models");

// const request = axios.create({
//   method: "POST",
//   baseURL: "http://localhost:8081",
//   headers: {
//     "content-type": "application/json",
//   },
// });

// const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8081"));
const web3 = new Web3(
  new Web3.providers.WebsocketProvider("ws://localhost:8082")
);
let BlockInfo = [];
// console.log(ws3);
let resultNumber = 0;
// let count = 0;
let test;

let testtwo = [];

web3.eth.subscribe("newBlockHeaders", async (error, result) => {
  // console.log("블록생성됨");
  console.log("error", error);
  if (!error) {
    // console.log("result", result);
    //result값에 블록정보들어온다
    // console.log(count);
    console.log("result.number", result.number);
    resultNumber = result.number;
    try {
      const BlockNumber = await web3.eth.getBlockNumber();
      console.log("BlockNumber", BlockNumber);
      console.log("resultNumber", resultNumber);

      test = await web3.eth.getBlock(BlockNumber);

      // let transactions = test.transactions.split(" ");
      // console.log("transactions", transactions);
      //[]
      // [
      //   '0x6f9e8463627ef23c66da69e9d44fdee485f18338d34a9ffa24105bde3e88103e',
      //   '0x53bc6702492b3b9cb7932e318d4c991a0296898de604a370bbe882e8dd70b198'
      // ]
      // console.log(test.transactions.length);
      // let tx = "";
      // for (let i = 0; i < test.transactions.length; i++) {
      //   tx += test.transactions[i];
      // }
      // console.log(tx.slice(0, 198));
      // if (test.transactions.length < 4) {
      await Block.create({
        gasLimit: test.gasLimit,
        gasUsed: test.gasUsed,
        hash: test.hash,
        number: test.number,
        timestamp: test.timestamp,
        totalDifficulty: test.totalDifficulty,
        // transactions: tx,
        txs: test.transactions.length,
      });
      // }
      // if (test.transactions.length >= 4) {
      //   await Block.create({
      //     gasLimit: test.gasLimit,
      //     gasUsed: test.gasUsed,
      //     hash: test.hash,
      //     number: test.number,
      //     timestamp: test.timestamp,
      //     totalDifficulty: test.totalDifficulty,
      //     transactions: tx.slice(0, 198),
      //   });
      // }

      // console.log("tx :", test.transactions[0]);

      // if (test.transactions[0] !== undefined) {
      //   testtransaction = await web3.eth.getTransaction(test.transactions[0]);
      //   console.log(testtransaction);
      // }

      // {
      //   blockHash: '0x0bfd43201ad71ce6f23feb0e7845891ba9d49ba94dd28efd1f5ec79c29c6e2c7',
      // 트잭이 포함된 블록의 해시
      //   blockNumber: 45,
      //   from: '0x36d141119AEc36cA3b38e5Dd6fd23FAC511aD5b5',
      //   gas: 21000,
      //   gasPrice: '1000000000',
      //   hash: '0x6be0ebcc9b9482e016432cc491448e48fb50a3deabb837f66a33ca580cc044d4',
      // 이게 트랜잭션의 해시
      //   input: '0x',
      //   nonce: 10,
      //   to: '0xF9fDF98D4A437aAb5ecbb62739755Fc47E634216',
      //   transactionIndex: 0,
      //   value: '1000000000000000000',
      //   type: 0,
      //   chainId: '0x3c',
      //   v: '0x9b',
      //   r: '0x3c176fcc58b4f3a3833e892ab20d70896a20aa4e8e19bf2fc1abf9a940571cc7',
      //   s: '0x5813e3495ac270d4d14e064603012d1f57d546c4e6e81ff3acaddd34016ac49d'
      // }

      // testtwo.push(test);
      // count = BlockNumber;

      // console.log("number", number);
    } catch (err) {
      console.error(err);
      // res.send("err");
    }
  }
});

router.post("/", async (req, res) => {
  // console.log(req.body);
  const BlockNumber = await web3.eth.getBlockNumber();
  // console.log("BlockNumber", BlockNumber);

  let testblock = await Block.findOne({
    order: [["id", "DESC"]],
    limit: 1,
  });

  // console.log("test", testblock.number);
  if (testblock) {
    let numberchange = Number(testblock.number);

    // console.log("numberchange", numberchange);

    test = await web3.eth.getBlock(BlockNumber);
    // console.log(test);

    if (numberchange !== BlockNumber) {
      for (let i = numberchange + 1; i <= BlockNumber; i++) {
        // console.log(BlockNumber - numberchange);
        BlockInfo.push(await web3.eth.getBlock(i));
      }
      for (let i = 0; i < BlockInfo.length; i++) {
        await Block.create({
          gasLimit: BlockInfo[i].gasLimit,
          gasUsed: BlockInfo[i].gasUsed,
          hash: BlockInfo[i].hash,
          number: BlockInfo[i].number,
          timestamp: BlockInfo[i].timestamp,
          totalDifficulty: BlockInfo[i].totalDifficulty,
          // transactions: BlockInfo[i].transactions[0],
          txs: BlockInfo[i].transactions.length,
        });
      }
    }
  }
  // console.log(BlockInfo.length);

  for (let i = 0; i <= BlockNumber; i++) {
    BlockInfo.push(await web3.eth.getBlock(i));
    // console.log(BlockInfo.transactions[0]);
  }

  // console.log(BlockInfo.transactions.length);
  // console.log(testtwo);
  if (
    await Block.findOne({
      where: { id: 1 },
    })
  )
    return;

  for (let i = 0; i <= BlockNumber; i++) {
    await Block.create({
      gasLimit: BlockInfo[i].gasLimit,
      gasUsed: BlockInfo[i].gasUsed,
      hash: BlockInfo[i].hash,
      number: BlockInfo[i].number,
      timestamp: BlockInfo[i].timestamp,
      totalDifficulty: BlockInfo[i].totalDifficulty,
      // transactions: BlockInfo[i].transactions[0],
      txs: BlockInfo[i].transactions.length,
    });
    // count = BlockNumber;
  }
  // const BlockNumber = await web3.eth.getBlockNumber();
  // console.log(BlockNumber);

  res.end();
});

router.post("/findblock", async (req, res) => {
  let data = await Block.findAll({ order: [["timestamp", "DESC"]], limit: 10 });
  // timstamp를 기준으로 내림차순 모든걸 찾아서 limit 10개만 잘라서 가져온다
  res.send(data);
});

router.post("/blockdetail", async (req, res) => {
  console.log("req.body", req.body.number);
  const number = await Block.findOne({
    where: { number: req.body.number },
  });
  // console.log("number", number);

  res.send({ number });
});

router.post("/blocksdetailInfo", async (req, res) => {
  let data = await Block.findAll({ order: [["timestamp", "DESC"]] });
  res.send(data);
});

router.post("/confirm", async (req, res) => {
  const number = await Block.findAll({
    where: { number: req.body.confirm },
  });
  const txhash = await Transaction.findAll({
    where: { hash: req.body.confirm },
  });
  const address = await Transaction.findAll({
    where: { from: req.body.confirm },
  });
  const addresstwo = await Transaction.findAll({
    where: { to: req.body.confirm },
  });

  // console.log(txid.length); 없으면 0
  // console.log(number);
  // console.log(txhash);
  // console.log(address);
  // console.log(addresstwo);

  res.send({ number, txhash, address, addresstwo });
});
// try {
//   ;

//     console.log(BlockInfo);
//   }
// } catch (error) {
//   console.log(error);
// }

module.exports = router;
