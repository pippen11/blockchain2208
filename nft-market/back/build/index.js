var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import dotenv from "dotenv";
import multer from "multer";
import cors from "cors";
import { Readable } from "stream";
import pinataSDK from "@pinata/sdk";
const app = express();
dotenv.config();
const pinata = new pinataSDK(process.env.API_Key, process.env.API_Secret);
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const upload = multer();
app.get("/api/list", (req, res) => {
    const data = [
        {
            name: "Moonbirds",
            description: "Moonbirds with Pinata",
            image: "http://gateway.pinata.cloud/ipfs/QmacLa5jg39ZnYsCbphPGLSyCeHpRVVe7oWzkq4qMu42PV",
        },
        {
            name: "Moonbirds",
            description: "Moonbirds with Pinata",
            image: "http://gateway.pinata.cloud/ipfs/QmacLa5jg39ZnYsCbphPGLSyCeHpRVVe7oWzkq4qMu42PV",
        },
        {
            name: "Moonbirds",
            description: "Moonbirds with Pinata",
            image: "http://gateway.pinata.cloud/ipfs/QmacLa5jg39ZnYsCbphPGLSyCeHpRVVe7oWzkq4qMu42PV",
        },
    ];
    res.send(data);
});
app.post("/api/mint", upload.single("file"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description } = req.body;
    const imgResult = yield pinata.pinFileToIPFS(Readable.from(req.file.buffer), {
        pinataMetadata: {
            name: Date.now().toString(),
        },
        pinataOptions: {
            cidVersion: 0,
        },
    });
    if (imgResult.isDuplicate) {
        console.log("같은 이미지!");
    }
    console.log(imgResult);
    const jsonResult = yield pinata.pinJSONToIPFS({
        name,
        description,
        image: `https://gateway.pinata.cloud/ipfs/${imgResult.IpfsHash}`,
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
    }, {
        pinataMetadata: {
            name: Date.now().toString() + ".json",
        },
        pinataOptions: {
            cidVersion: 0,
        },
    });
    console.log(jsonResult);
    res.send("mint complete");
}));
app.listen(8080, () => {
    console.log("8080 port server open");
});
