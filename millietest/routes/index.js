const router = require("express").Router();

const login = require("./login.js");

router.use("./login", login);

module.exports = router;
