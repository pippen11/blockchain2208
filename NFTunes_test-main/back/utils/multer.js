const multer = require("multer");
const path = require("path");

// const storage = multer.diskStorage({
//   destination(req, file, done) {
//     const fileType = file.mimetype.split("/")[0];
//     switch (fileType) {
//       case "audio":
//         done(null, "public/upload/audio");
//         break;
//       case "image":
//         done(null, "public/upload/cover");
//         break;
//       default:
//         done(null, "public/upload");
//         break;
//     }
//   },

//   filename(req, file, done) {
//     const ext = path.extname(file.originalname);
//     const fileName = `${path.basename(
//       file.originalname,
//       ext
//     )}_${Date.now()}${ext}`;
//     done(null, fileName);
//   },
// });

const limits = { fileSize: 10 * 1024 * 1024 };

const multerConfig = {
  storage: multer.memoryStorage(),
  limits,
};

exports.upload = multer(multerConfig);
