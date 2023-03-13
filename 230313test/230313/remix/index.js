import express from "express";
import Web3 from "web3";
import cors from "cors";
// const { create } = require("ipfs-core");
import { create } from "ipfs-http-client";

// const testTokenContract = require("./build/contracts/testToken.json");
// const EthSwapContract = require("./build/contracts/EthSwap.json");
const client = create();

console.log(client);

// async function main() {
//   const node = await IPFS.create();
//   console.log(node);
// }

// main();

const app = express();
const web3 = new Web3("http://127.0.0.1:8545");
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.listen(8080, () => {
  console.log("8080 server open");
});
