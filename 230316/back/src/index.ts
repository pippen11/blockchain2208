import express, { Express, Request, Response } from "express";
//{EXpress,Request, Response}는 타입 가져와서 넣어주려고씀
import dotenv from "dotenv";
import multer from "multer";
import cors from "cors";
import { Readable } from "stream";
// 데이터를 stream화 해준다?<< 원래있는거라 설치안해도됨
import pinataSDK from "@pinata/sdk";
// pinata api대신 sdk라이브러리 썼다

const app: Express = express();

dotenv.config();

const pinata = new pinataSDK(process.env.API_Key, process.env.API_Secret);

app.use(cors({ origin: true, credentials: true }));
//credentials 쿠키허락
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const upload: multer.Multer = multer();
//multer.Multer가 타입지정이다

app.get("/api/list", (req: Request, res: Response) => {
  const data = [
    {
      name: "Moonbirds",
      description: "Moonbirds with Pinata",
      image:
        "http://gateway.pinata.cloud/ipfs/QmacLa5jg39ZnYsCbphPGLSyCeHpRVVe7oWzkq4qMu42PV",
    },
    {
      name: "Moonbirds",
      description: "Moonbirds with Pinata",
      image:
        "http://gateway.pinata.cloud/ipfs/QmacLa5jg39ZnYsCbphPGLSyCeHpRVVe7oWzkq4qMu42PV",
    },
    {
      name: "Moonbirds",
      description: "Moonbirds with Pinata",
      image:
        "http://gateway.pinata.cloud/ipfs/QmacLa5jg39ZnYsCbphPGLSyCeHpRVVe7oWzkq4qMu42PV",
    },
  ];
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

    res.send("mint complete");
  }
);

app.listen(8080, () => {
  console.log("8080 port server open");
});
