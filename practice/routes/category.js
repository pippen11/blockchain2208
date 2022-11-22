const router = require("express").Router();

const { BookInfo } = require("../models/index.js");

router.post("/booklist/bookAdd", async (req, res) => {
  const book_info = await BookInfo.findAll();
  console.log(book_info);
  res.send(book_info);
});

module.exports = router;
