const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(cors({ origin: true, credentials: true }));

dotenv.config();
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/", async (req, res) => {
  console.log(req.body.promt);
  const response = await openai.createImage({
    prompt: req.body.promt,
    n: 1,
    size: "512x512",
    //512,1024
  });
  console.log(response.data.data);
  res.send(response.data.data);
});

app.listen(8080, () => {
  console.log("server start");
});
