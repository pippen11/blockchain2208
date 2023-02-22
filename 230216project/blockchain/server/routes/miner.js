// const Web3 = require("web3");

// const router = require("express").Router();

// const axios = require("axios");

// const request = axios.create({
//   method: "POST",
//   baseURL: "http://localhost:8081",
//   headers: {
//     "content-type": "application/json",
//   },
// });

// const web3 = new Web3(
//   new Web3.providers.WebsocketProvider("ws://localhost:8082")
// );

// router.post("/start", async (req, res) => {
//   console.log(req.body);
//   await request({
//     data: {
//       id: 60,
//       jsonrpc: "2.0",
//       method: "miner_setEtherbase",
//       params: [req.body.transactionminer],
//     },
//   });
//   let start = await request({
//     data: {
//       id: 60,
//       jsonrpc: "2.0",
//       method: "miner_start(1)",
//     },
//   });

//   res.send("stop");
// });

// module.exports = router;
