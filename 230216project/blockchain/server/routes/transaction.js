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
    console.log("BlockNumber", BlockNumber);
    //   console.log("resultNumber", resultNumber);
    //하나캐서 20
    // 세개캐면 23

    test = await web3.eth.getBlock(BlockNumber);

    console.log("보자", test.transactions);
    //[0은 처음보낸게나옴]
    // 배열안에 세개나옴 길이 3
    // 한개캐면 나오고 두개캐면 마지막꺼가져와서 안나옴
    // let testtransaction = await web3.eth.getTransaction(test.transactions[0]);

    let testblock = await Block.findOne({
      order: [["id", "DESC"]],
      limit: 1,
    });

    let numberchange = Number(testblock.number);
    console.log("numberchange", numberchange);
    //19
    //한개캣으니20

    if (BlockNumber - numberchange == 1) {
      test = await web3.eth.getBlock(BlockNumber);
      for (let i = 0; i < test.transactions.length; i++) {
        let testtransaction = await web3.eth.getTransaction(
          test.transactions[i]
        );
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
    if (BlockNumber - numberchange > 1) {
      test = await web3.eth.getBlock(numberchange + 1);
      for (let i = 0; i < test.transactions.length; i++) {
        let testtransaction = await web3.eth.getTransaction(
          test.transactions[i]
        );
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

    // if (numberchange !== BlockNumber && test.transactions[0] !== undefined) {
    //   let testtransaction = await web3.eth.getTransaction(test.transactions[0]);
    //   let confirmtx = await Transaction.findOne({
    //     where: { hash: test.transactions[0] },
    //   });

    //   if (!confirmtx) {
    //     await Transaction.create({
    //       blockHash: testtransaction.blockHash,
    //       blockNumber: testtransaction.blockNumber,
    //       from: testtransaction.from,
    //       gas: testtransaction.gas,
    //       gasPrice: testtransaction.gasPrice,
    //       hash: testtransaction.hash,
    //       to: testtransaction.to,
    //       transactionIndex: testtransaction.transactionIndex,
    //       value: testtransaction.value,
    //     });
    //   }
    // }

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
