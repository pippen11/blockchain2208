const Web3 = require("web3");

const router = require("express").Router();

const axios = require("axios");

const request = axios.create({
  method: "POST",
  baseURL: "http://localhost:8081",
  headers: {
    "content-type": "application/json",
  },
});

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8081"));

let BlockInfo = [];

router.post("/", async (req, res) => {
  console.log(req.body);

  const BlockNumber = await web3.eth.getBlockNumber();

  for (let i = 0; i <= BlockNumber; i++) {
    BlockInfo.push(await web3.eth.getBlock(i));
  }

  console.log(BlockInfo);
});

module.exports = router;
