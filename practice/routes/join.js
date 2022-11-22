const router = require("express").Router();

const crypto = require("crypto-js");

const multer = require("multer");
const { User_Info } = require("../models/index.js");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post("/signup", upload.single("img"), async (req, res) => {
  try {
    if (await User_Info.findOne({ where: { userid: req.body.id } })) {
      console.log("이미있음");

      res.send({ status: 401 });
    } else {
      await User_Info.create({
        img: req.file.originalname,
        name: req.body.name,
        userid: req.body.id,
        email: req.body.email,
        pw: crypto.SHA256(req.body.pw).toString(),
        birth: req.body.birth,
      });
      console.log("회원가입완료");

      res.send(req.body);
    }
  } catch (err) {
    console.error(err);
    res.send({ status: 400 });
  }
});

module.exports = router;
