const router = require("express").Router();

const block = require("./block");

const transaction = require("./transaction");

router.use("/block", block);

router.use("/transaction", transaction);

module.exports = router;
