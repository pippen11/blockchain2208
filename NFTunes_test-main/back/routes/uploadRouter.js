const express = require("express");
const router = express.Router();
const thumbnail = require("../controllers/upload/ThumbnailController");
const uploadMusic = require("../controllers/upload/MusicController");
const { upload } = require("../utils/multer.js");

router.post("/thumbnail", upload.single("cover"), thumbnail);
router.post("/music", upload.single("music"), uploadMusic);

module.exports = router;
