const router = require("express").Router();
const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");
const userlist = {};

router.post("/regist", (req, res) => {
  const tempJWT = jwt.sign({ name: "test" }, "sdkfjksdfj", {
    algorithm: "HS256",
    expiresIn: "10m",
    issuer: "jkh",
  });
});
const tempData = jwt.verify(tempJWT, "sdkfjksdfj");

res.cookie("cookie_name", "now testing", {
  expires: new Date(Date.now() + 3 * 1000),
});

console.log(req.body);
module.exports = router;
