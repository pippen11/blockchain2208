const express = require("express");
const Web3 = require("web3");
const cors = require("cors");
import { create } from "ipfs-http-client";

// const testTokenContract = require("./build/contracts/testToken.json");
// const EthSwapContract = require("./build/contracts/EthSwap.json");
const client = create();

console.log(client);

const app = express();
const web3 = new Web3("http://127.0.0.1:8545");
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.listen(8080, () => {
  console.log("8080 server open");
});
