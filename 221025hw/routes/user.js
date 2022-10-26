const router = require("express").Router();
const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");
const userlist = {};
//데이터를 저장하려고 만들어놈

router.post("/regist", (req, res) => {
  console.log(userlist[req.body.id]);
  //처음엔 가입누르면 userlist에 들어간 값이 없으니까 undefined가뜨는게 맞다
  if (!userlist[req.body.id]) {
    userlist[req.body.id] = {
      name: req.body.name,
      pw: crypto.SHA256(req.body.pw).toString(),
    };
    res.send({ status: 200, data: "regist", userlist });
  } else {
    res.send({ status: 402, data: "exist id", userlist });
  }
});

router.post("/login", (req, res) => {
  console.log(userlist[req.body.id]);
  if (userlist[req.body.id]?.pw === crypto.SHA256(req.body.pw).toString()) {
    res.cookie(
      "logjwt2",
      jwt.sign({ name: userlist[req.body.id].name }, "block7", {
        algorithm: "HS256",
        expiresIn: "10m",
        issuer: "ssm",
      })
    );
    res.send({ status: 200, data: "login", userlist });
  } else {
    res.send({ status: 401, data: "wrong password", userlist });
  }
});

module.exports = router;
