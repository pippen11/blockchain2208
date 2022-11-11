const router = require("express").Router();

const multer = require("multer");
//이미지 올리려면 multer

const { BookInfo } = require("../models/index.js");
//db에서 bookInfo정보만 구조분해할당으로 가져옴

//////
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

//multer쓰는방식 cb는 콜백함수 이렇게 멀터를 씀 그냥 형식임

//서버에서 db로 요청한다
router.post("/upload", upload.single("book_img"), async (req, res) => {
  //upload.single("book_img") multer쓰기위한 미들웨어
  try {
    //클라이언트에서 받은 정보를 서버에서 db에 올림
    await BookInfo.create({
      book_img: req.file.originalname,
      //이미지파일은 이런식으로씀
      title: req.body.title,
      title_sub: req.body.title_sub,
      introduce: req.body.introduce,
      category: req.body.category,
      publisher: req.body.publisher,
    });
    res.send({ status: "생성" });
  } catch (err) {
    console.error(err);
    res.send({ status: 400 });
  }
});

module.exports = router;
