const pinataSDK = require('@pinata/sdk');
require('dotenv').config();
const pinata = pinataSDK(process.env.API_KEY, process.env.API_SECRET);
const Cover = require('../../models/coverModel');
const fs = require('fs');

const thumbnail = async (req, res) => {
  const result = req.file;
  console.log('결과', result);

  if (result?.filename.length != 0) {
    const options = {
      pinataMetadata: {
        name: 'Album_Cover',
        keyvalues: {
          customKey: 'customValue',
          customKey2: 'customValue2',
        },
      },
      pinataOptions: {
        cidVersion: 0,
      },
    };

    try {
      //주소 변동
      let readableStreamForFile = fs.createReadStream(result.path);
      const result2 = await pinata.pinFileToIPFS(readableStreamForFile, options);
      console.log('주소', result2.IpfsHash);
    } catch (e) {
      console.log('에러났다.', e);
    }
  }
};

module.exports = thumbnail;
