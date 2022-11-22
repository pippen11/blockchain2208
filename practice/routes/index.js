const router = require("express").Router();
const join = require("./join.js");
const login = require("./login.js");
const category = require("./category.js");

router.use("/category", category);
router.use("/join", join);
router.use("/login", login);

module.exports = router;
