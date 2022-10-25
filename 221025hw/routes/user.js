const router = require("express").Router();
const userlist = {};

router.post("/regist", (req, res) => {
  if (!userlist[req.body.id]) {
    userlist[req.body.id] = {
      name: req.body.name,
      pw: req.body.pw,
    };
    res.send({ status: 200, data: "regist", userlist });
  } else {
    res.send({ status: 402, data: "exist id", userlist });
  }
});

module.exports = router;
