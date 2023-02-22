const router = require("express").Router();

const block = require("./block");

const transaction = require("./transaction");

// const miner = require("./miner");

router.use("/block", block);

router.use("/transaction", transaction);

// router.use("/miner", miner);

module.exports = router;
