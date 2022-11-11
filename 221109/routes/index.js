const router = require("express").Router();

const bookAdd = require("./bookAdd.js");

router.use("/boodAdd", bookAdd);

module.exports = router;
