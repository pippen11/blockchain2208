const Web3 = require("web3");

const router = require("express").Router();

const axios = require("axios");

const { Block } = require("../models");

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

      console.log("transactions: ", test.transactions);
      await Block.create({
        gasLimit: test.gasLimit,
        gasUsed: test.gasUsed,
        hash: test.hash,
        number: test.number,
        timestamp: test.timestamp,
        totalDifficulty: test.totalDifficulty,
        transactions: test.transactions[0],
      });

      testtwo.push(test);
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

  for (let i = 0; i <= BlockNumber; i++) {
    BlockInfo.push(await web3.eth.getBlock(i));
    // console.log(BlockInfo.transactions[0]);
  }

  // console.log(BlockInfo);
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
      transactions: BlockInfo[i].transactions[0],
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

// try {
//   ;

//     console.log(BlockInfo);
//   }
// } catch (error) {
//   console.log(error);
// }

module.exports = router;
