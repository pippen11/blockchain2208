const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

// 백엔드에서 ipfs에 저장(원래는 프론트에서 요청해서 백엔드에서 ipfs에 저장하고 블록체인에 저장해야함)
//ipfs에 사진업로드(사진은 fromData형식)
const pinFileToIpfs = async () => {
  const formData = new FormData();
  const src = "imgs/Azuki3.png";
  // 이미지경로와 이미지 파일명

  const file = fs.createReadStream(src);
  formData.append("file", file);

  const metadata = JSON.stringify({
    name: "my auzuki3.png",
    // pinata사이트에 등록되는 이름
  });
  formData.append("pinataMetadata", metadata);

  const options = JSON.stringify({
    cidVersion: 0,
  });
  formData.append("pinataOptions", options);

  try {
    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        maxBodyLength: "Infinity",
        headers: {
          "content-type": `multipart/form-data; boundary=${formData._boundary}`,
          pinata_api_key: "eef76fd7109ab5f452ae",
          pinata_secret_api_key:
            "64c6d84539f66c7281e7a0f9e9a56c1dc0fb750ecd2ccf0a80b68503b093633a",
          // pinata api key와 secret api key 개인거를 넣어준다
        },
      }
    );
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
// pinFileToIpfs();
//res.data값 : QmP8uTB5sVPtY1zKYKxJCC7eog12LVrnBXKETFs7ZRCPo7

// ipfs pinata사이트에 json파일올리기 업로드(json은 객체형식)
const pinJson = async () => {
  const formData = {
    pinataMetadata: {
      name: "JSon 3",
      // 파일이름
    },
    pinataOptions: {
      cidVersion: 0,
    },
    pinataContent: {
      name: "Azuki #1271",
      // nft부제목, 배포할때 name적는거가 코인명임 이건 코인 해당 nft이름
      description: "azuki team",
      // 설명
      // external_link: "https://opensea.com",
      image:
        "https://gateway.pinata.cloud/ipfs/QmcG2YGzUyszVn8kYsB5QguzrJs6cJwy8FDmF8X5VgfjGp",
      // 이미지경로
      attributes: [
        {
          trait_type: "BackGround",
          value: "Off White A",
        },
        {
          trait_type: "CLOTHING",
          value: "Azuki Tech Jacket",
        },
        { trait_type: "EYES", value: "Closed" },
        {
          trait_type: "Level",
          value: 5,
        },
        {
          trait_type: "Stamina",
          value: 1.4,
        },
        {
          trait_type: "Personality",
          value: "Sad",
        },
        {
          display_type: "boost_number",
          trait_type: "Aqua Power",
          value: 40,
        },
        {
          display_type: "boost_percentage",
          trait_type: "Stamina Increase",
          value: 10,
        },
        {
          display_type: "number",
          trait_type: "Generation",
          value: 2,
        },
        {
          display_type: "date",
          trait_type: "birthday",
          value: 1546360800,
        },
      ],
    },
  };

  try {
    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      formData,
      {
        headers: {
          "content-type": "application/json",
          pinata_api_key: "eef76fd7109ab5f452ae",
          pinata_secret_api_key:
            "64c6d84539f66c7281e7a0f9e9a56c1dc0fb750ecd2ccf0a80b68503b093633a",
        },
      }
    );
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

// pinJson();
