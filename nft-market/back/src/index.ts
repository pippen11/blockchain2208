import express, { Express, Request, Response } from "express";
//{EXpress,Request, Response}는 타입 가져와서 넣어주려고씀
import dotenv from "dotenv";
import multer from "multer";
import cors from "cors";
import { Readable } from "stream";
// 데이터를 stream화 해준다?<< 원래있는거라 설치안해도됨
import pinataSDK from "@pinata/sdk";
// pinata api대신 sdk라이브러리 썼다
import { AbiItem } from "web3-utils";
// 타입스크립트때문에 설치하고 타입 가져와야함
import Web3 from "web3";
import axios from "axios";

import { abi as NftAbi } from "../contracts/artifacts/NftToken.json";
// artifacts폴더안 json파일 abi만 가져옴
import { abi as SaleAbi } from "../contracts/artifacts/SaleToken.json";
// 추신 :Artifacts 는 단순한 계약(Contract)의 Json파일이다

const app: Express = express();

dotenv.config();

const web3 = new Web3("https://goerli.infura.io/v3");
// ipfs내쪽으로연결한다
// 교수님꺼쓰면 이거고 로컬호스트면 다른거써야함

const pinata = new pinataSDK(process.env.API_Key, process.env.API_Secret);

app.use(cors({ origin: true, credentials: true }));
//credentials 쿠키허락
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const upload: multer.Multer = multer();
//multer.Multer가 타입지정이다

app.post("/api/list", async (req: Request, res: Response) => {
  const deployed = new web3.eth.Contract(
    SaleAbi as AbiItem[],
    process.env.SALE_CA
  );

  let data: Array<{ [key: string]: string }> = [];
  // key는 tokenId,price,name,description등 전체 key가 string 그값은 string

  if (req.body.from) {
    console.log(deployed.methods.getOwnerTokens);
    try {
      console.log("sdf");
      const tempArr = await deployed.methods
        .getOwnerTokens(req.body.from)
        .call();
      console.log(tempArr);
      // 토큰 다 가져옴
      for (let i = 0; i < tempArr.length; i++) {
        try {
          const { name, description, image } = (
            await axios.get(
              // tempArr[i].tokenURI.replace("gateway.pinata.cloud", "ipfs.io")
              tempArr[i].tokenURI
            )
          ).data;
          data.push({
            tokenId: tempArr[i].tokenId,
            price: tempArr[i].price,
            name,
            description,
            image,
          });
        } catch (error) {
          // console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const tempArr = await deployed.methods.getSaleTokenList().call();
      console.log(tempArr);
      // 토큰 다 가져옴
      for (let i = 0; i < tempArr.length; i++) {
        try {
          const { name, description, image } = (
            await axios.get(tempArr[i].tokenURI)
          ).data;
          data.push({
            tokenId: tempArr[i].tokenId,
            price: tempArr[i].price,
            name,
            description,
            image,
          });
        } catch (error) {}
      }
    } catch (error) {}
  }

  res.send(data);
});

app.post(
  "/api/mint",
  upload.single("file"),
  // 파일받을때 멀터쓰는방법
  // 이거적어줘야하나? formData.append("file",file)이랑 이름같아야함?
  async (req: Request, res: Response) => {
    const { name, description }: { name: string; description: string } =
      req.body;
    // req.body로 구조분해할당 name, description을 구조분해
    //   console.log(name);
    //   console.log(description);
    //   console.log(req.file);

    //pinata에 사진올리는작업
    const imgResult: {
      IpfsHash: string;
      PinSize: number;
      Timestamp: string;
      isDuplicate?: boolean;
      //이미올라간사진이 들어오면 isDuplicate가 true이다
    } = await pinata.pinFileToIPFS(Readable.from(req.file.buffer), {
      pinataMetadata: {
        name: Date.now().toString(),
        // 파일이름
      },
      pinataOptions: {
        cidVersion: 0,
      },
    });
    if (imgResult.isDuplicate) {
      console.log("같은 이미지!");
    }
    console.log(imgResult);
    // 한번 더누르면 이전에 올렸던해시를 또보내서 isDuplicate true로 나옴

    // json파일 올리려고 하는것(nft데이터를 올림)

    const jsonResult = await pinata.pinJSONToIPFS(
      {
        name,
        // nft부제목, 배포할때 name적는거가 코인명임 이건 코인 해당 nft이름
        // 프론트에서 NFT Name 적은거
        description,
        // 설명 프론트에서 NFT Description
        //   image: "https://gateway.pinata.cloud/ipfs/" + imgResult.IpfsHash,
        image: `https://gateway.pinata.cloud/ipfs/${imgResult.IpfsHash}`,
        //이자리에 attributes넣을수있다
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
      {
        pinataMetadata: {
          name: Date.now().toString() + ".json",
          //json파일이름
        },
        pinataOptions: {
          cidVersion: 0,
        },
      }
    );
    console.log(jsonResult);

    const deployed = new web3.eth.Contract(
      NftAbi as AbiItem[],
      process.env.NFT_CA
    );
    // NftAbi as AbiItem[] NftAbi 이건 AbiItem[] 이형식갖고있다

    const obj: { nonce: number; to: string; from: string; data: string } = {
      nonce: 0,
      to: "",
      from: "",
      data: "",
    };

    console.log("test");
    console.log(req.body.from);
    // obj.nonce = await web3.eth.getTransactionCount(req.body.from);
    console.log("test2");
    obj.to = process.env.NFT_CA;
    obj.from = req.body.from;
    obj.data = deployed.methods.safeMint(jsonResult.IpfsHash).encodeABI();

    res.send(obj);
  }
);

app.listen(8080, () => {
  console.log("8080 port server open");
});
