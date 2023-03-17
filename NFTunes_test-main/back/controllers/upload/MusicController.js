const { Storage } = require("@google-cloud/storage");
const storage = new Storage();

const uploadMusic = async (req, res) => {
  console.log("메모리스토리지", req.file);
  const fileName = `${req.file.filename}`;
  let result;
  try {
    const filePath =
      req.file == undefined ? "" : `public/upload/audio/${fileName}`;

    const options = {
      destination: fileName,
    };

    await storage.bucket(bucketName).upload(filePath, options);
    result = {
      status: true,
      msg: `${fileName} has been uploaded on ${bucketName}`,
    };
    res.json(result);
  } catch (err) {
    console.log(err);
    result = {
      status: false,
      msg: `error msg - ${err.msg}`,
    };
    res.json(result);
  }
};

module.exports = uploadMusic;
