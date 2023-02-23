const Web3 = require("web3");

const router = require("express").Router();

const axios = require("axios");

const { Op } = require("sequelize");
// or쓰려면 Op써야한다

const { Transaction, Block } = require("../models");

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
    // console.log(test);

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

router.post("/hashsearch", async (req, res) => {
  let data = await Transaction.findOne({
    where: { hash: req.body.hash },
  });

  res.send(data);
});

router.post("/transactiondetail", async (req, res) => {
  console.log(req.body);
  let data = await Transaction.findOne({
    where: { id: req.body.id },
  });
  let blocknumber = data.blockNumber;
  let datatwo = await Block.findOne({
    where: { number: blocknumber },
  });

  // console.log("data :", data);
  res.send({ data, datatwo });
});

router.post("/transactionsdetailInfo", async (req, res) => {
  let data = await Transaction.findAll({ order: [["id", "DESC"]] });
  res.send(data);
});

router.post("/addressbalance", async (req, res) => {
  let address = req.body.address;
  const addressbalance = await web3.eth.getBalance(req.body.address);

  // console.log(addressbalance);
  const detailaddress = await Transaction.findAll({
    where: { from: req.body.address },
  });
  if (detailaddress.length) {
    let firsttx = detailaddress[0].hash;
    let lasttx = detailaddress[detailaddress.length - 1].hash;
    res.send({ addressbalance, firsttx, lasttx, address });
  } else {
    res.send({ addressbalance, address, firsttx: "No Tx", lasttx: "No Tx" });
  }
});

module.exports = router;
