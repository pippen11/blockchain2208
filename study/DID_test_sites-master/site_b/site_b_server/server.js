const express = require("express");
const cors = require("cors");
const { pool } = require("./models/db/db.js");
const did = require("./did");
const cookieParser = require("cookie-parser");
const axios = require("axios");

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/user", async (req, res) => {
  const { address } = req.body;
  const selectSql = `
  SELECT * FROM user WHERE address="${address}"
  `;
  let user;
  try {
    const [[selectResult]] = await pool.query(selectSql);
    user = selectResult;
  } catch (error) {
    console.log("user Router Select Error");
    console.log(error);
    res.sendStatus(500);
    return;
  }

  if (!user) {
    try {
      const insertSql = `
      INSERT INTO user (address)VALUES ('${address}')
      `;

      await pool.query(insertSql);
      res.json({ signUp: false });
    } catch (error) {
      console.log("user Router Insert Error");
      console.log(error);
      res.sendStatus(500);
      return;
    }
  } else if (!user.alias) {
    res.json({ signUp: false });
  } else {
    res.json({ signUp: true, userData: user });
  }
});

app.post("/alias", async (req, res) => {
  const { account, alias } = req.body;

  try {
    const sql = `
    UPDATE user SET alias='${alias}' WHERE address='${account}'
    `;

    await pool.query(sql);
  } catch (error) {
    console.log("alias router update query error");
    res.sendStatus(500);
  }

  try {
    const sql = `
    SELECT * FROM user WHERE address='${account}'
    `;
    const [[userData]] = await pool.query(sql);
    res.json({ result: true, userData });
  } catch (error) {
    console.log("alias router SELECT query error");
    console.log(error);
    res.sendStatus(500);
  }
});

app.get("/DID", (req, res) => {
  const authUrl = did.getAuthUrl();
  res.redirect(authUrl);
});

app.get("/did/redirect", async (req, res) => {
  const { B_SITE_COOKIE } = req.cookies;
  try {
    const userInfo = await did.getUserInfo(req);

    const selectSql = `
    SELECT * FROM user WHERE userCode='${userInfo.userCode}'
    `;

    const [[user]] = await pool.query(selectSql);

    if (user) {
      res.redirect("http://localhost:3001/duplicateDidError");
      return;
    }

    const sql = `
    UPDATE user
    SET userCode='${userInfo.userCode}'
    WHERE _id='${B_SITE_COOKIE}'
    `;
    await pool.query(sql);
    res.redirect("http://localhost:3002/");
  } catch (error) {
    console.log(error);
    res.redirect("http://localhost:3002/");
  }
});

app.get("/did/disconnect", async (req, res) => {
  const { B_SITE_COOKIE } = req.cookies;
  const { userCode } = req.query;
  try {
    const sql = `
      UPDATE user
      SET userCode=NULL
      WHERE _id='${B_SITE_COOKIE}'
      `;
    await pool.query(sql);
    res.redirect(
      `http://13.124.189.38:8000/authorizor/disconnect?clientID=016d3da5436040609fd88b238cd119a7&userCode=${userCode}`
    );
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post("/did/pointInfo", async (req, res) => {
  const { userCode } = req.body;
  try {
    const sql = `select pt from user where userCode="${userCode}"`;
    const [[result]] = await pool.query(sql);
    console.log(result);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post("/did/checkPoint", async (req, res) => {
  const { userCode } = req.body;
  try {
    const result = await did.checkPoint(userCode);
    res.json({ points: result });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post("/purchase", async (req, res) => {
  const {
    values: { local, ...points },
    userCode,
  } = req.body;

  try {
    if (Object.keys(points).length) {
      const response = await axios.post("http://3.38.58.1:4000/app/usePoint", {
        points,
        userCode,
      });
      if (response.data) {
        if (local) {
          const sql = `
        UPDATE user SET pt=pt-${local}
        WHERE userCode ="${userCode}"
        `;

          await pool.query(sql);
        }
        res.send(true);
      } else {
        throw new Error("internal errror");
      }
    } else {
      const sql = `
        UPDATE user SET pt=pt-${local}
        WHERE userCode ="${userCode}"
        `;

      await pool.query(sql);
      res.send(true);
      return;
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post("/did/allowPoint", async (req, res) => {
  const { userCode, point } = req.body;
  try {
    const sql = `UPDATE user SET pt=pt-${point} WHERE userCode="${userCode}"`;
    await pool.query(sql);
    res.send(true);
  } catch (error) {}
});

app.get("/test", (req, res) => {
  res.send("adsfasdfasd");
});

app.listen(4002);
