const Web3 = require("web3");

const router = require("express").Router();

const axios = require("axios");

const { Transaction } = require("../models");

const web3 = new Web3(
  new Web3.providers.WebsocketProvider("ws://localhost:8082")
);

web3.eth.subscribe("newBlockHeaders", async (error, result) => {
  console.log("error", error);
  if (!error) {
    // console.log("result.number", result.number);
    // resultNumber = result.number;
    try {
      const BlockNumber = await web3.eth.getBlockNumber();
      //   console.log("BlockNumber", BlockNumber);
      //   console.log("resultNumber", resultNumber);

      test = await web3.eth.getBlock(BlockNumber);
      let testtransaction;
      if (test.transactions[0] !== undefined) {
        for (let i = 0; i < test.transactions.length; i++) {
          testtransaction = await web3.eth.getTransaction(test.transactions[i]);
          await Transaction.create({
            blockHash: testtransaction.blockHash,
            blockNumber: testtransaction.blockNumber,
            from: testtransaction.from,
            gas: testtransaction.gas,
            gasPrice: testtransaction.gasPrice,
            hash: testtransaction.hash,
            to: testtransaction.to,
            transactionIndex: testtransaction.transactionIndex,
            value: testtransaction.value,
          });
        }
      }
    } catch (err) {
      console.error(err);
    }
  }
});

router.post("/", async (req, res) => {
  try {
    const BlockNumber = await web3.eth.getBlockNumber();
    //   console.log("BlockNumber", BlockNumber);
    //   console.log("resultNumber", resultNumber);

    test = await web3.eth.getBlock(BlockNumber);

    if (test.transactions[0] !== undefined) {
      let testtransaction = await web3.eth.getTransaction(test.transactions[0]);

      let confirmtx = await Transaction.findOne({
        where: { hash: test.transactions[0] },
      });

      if (!confirmtx) {
        await Transaction.create({
          blockHash: testtransaction.blockHash,
          blockNumber: testtransaction.blockNumber,
          from: testtransaction.from,
          gas: testtransaction.gas,
          gasPrice: testtransaction.gasPrice,
          hash: testtransaction.hash,
          to: testtransaction.to,
          transactionIndex: testtransaction.transactionIndex,
          value: testtransaction.value,
        });
      }
    }
  } catch (err) {
    console.error(err);
  }
  res.end();
});

router.post("/findTransaction", async (req, res) => {
  let data = await Transaction.findAll({
    order: [["id", "DESC"]],
    limit: 10,
  });
  res.send(data);
});
module.exports = router;
