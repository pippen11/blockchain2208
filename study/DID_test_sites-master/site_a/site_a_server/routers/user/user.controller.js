require("dotenv").config();
const User = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const idOverlapChk = async (req, res) => {
  const { inputId } = req.body;

  try {
    const result = await User.findOne({ userId: inputId });
    if (result === null) res.json({ idCheck: true });
    else res.json({ idCheck: false });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const regist = (req, res) => {
  const { userId, userPw } = req.body;
  try {
    bcrypt.hash(userPw, 10, async (err, hash) => {
      const user = new User({ userId, userPw: hash });
      const result = await User.create(user);
      if (result) res.json({ error: 0 });
      if (err) throw new Error("Internal Server Error");
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const registWithDID = async (req, res) => {
  const { userId: id, userCode: code } = req.body;
  try {
    const newUser = new User({ userCode: code, userId: id });
    const userData = await User.create(newUser);
    const { userCode, userId, point } = userData;

    // 타 사이트 포인트 조회 코드 추가
    const response = await axios.post("http://3.38.58.1:4000/app/checkPoint", {
      userCode: code,
      clientId: process.env.CLIENT_ID,
    });
    const DIDpoint = response.data;

    const userInfo = { userCode, userId, point, DIDpoint };
    const secretKey = process.env.SALT;
    const options = { expiresIn: "7d" };

    jwt.sign(userInfo, secretKey, options, (err, token) => {
      if (err) throw new Error("Internal Server Error");
      else {
        res.cookie("CHANNEL_Token", token, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
        });
        res.json({ error: 0, token });
      }
    });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

const login = async (req, res) => {
  const { userId, userPw } = req.body;
  try {
    const user = await User.findOne({ userId }).exec();
    if (user) {
      bcrypt.compare(userPw, user.userPw, async (err, result) => {
        if (err) throw new Error("Internal Server Error");
        if (result) {
          //   console.log(user);
          const { userCode, userId, point } = user;
          let checkPoint;

          // 타 사이트 포인트 조회 코드 추가
          console.log(user.userCode);
          if (user.userCode !== "") {
            const response = await axios
              .post("http://3.38.58.1:4000/app/checkPoint", {
                userCode: user.userCode,
                clientId: process.env.CLIENT_ID,
              })
              .catch((e) => console.log(e));
            console.log(response.data);
            checkPoint = response.data;
          }

          const userInfo = { userCode, userId, point, DIDpoint: checkPoint };
          const secretKey = process.env.SALT;
          const options = { expiresIn: "7d" };

          jwt.sign(userInfo, secretKey, options, (err, token) => {
            if (err) throw new Error("Internal Server Error");
            else res.json({ error: 0, loginCheck: true, token });
          });
        } else {
          res.json({ error: 1, loginCheck: false });
        }
      });
    } else {
      res.json({ error: 1, loginCheck: false });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const logout = (req, res) => {
  res.cookie("DID_ACCESS_TOKEN", "", {
    maxAge: 0,
  });
  res.cookie("DID_REFRESH_TOKEN", "", {
    maxAge: 0,
  });
  res.cookie("CHANNEL_Token", "", {
    maxAge: 0,
  });
  res.redirect("http://localhost:3001");
};

const sendToken = (req, res) => {
  const { userToken: token } = req.body;
  const secretKey = process.env.SALT;

  try {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) throw new Error("Internal Server Error");
      else {
        const { userCode, userId, point, DIDpoint } = decoded;
        const result = { userCode, userId, point, DIDpoint };
        res.json(result);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const getPoint = async (req, res) => {
  const { userData } = req.body;
  try {
    if (userData.userCode === "") {
      const user = await User.findOne({ userId: userData.userId }).exec();
      const updatedUser = await User.findOneAndUpdate(
        { userId: user.userId },
        { point: user.point + 100 },
        { new: true }
      );
      const { userCode, userId, point } = updatedUser;

      const updatedUserInfo = { userCode, userId, point };
      // console.log(point);
      const secretKey = process.env.SALT;
      const options = { expiresIn: "7d" };

      jwt.sign(updatedUserInfo, secretKey, options, (err, token) => {
        if (err) throw new Error("Internal Server Error");
        else res.json({ error: 0, updateCheck: true, token });
      });
    } else {
      const user = await User.findOne({ userCode: userData.userCode }).exec();
      const updatedUser = await User.findOneAndUpdate(
        { userId: user.userId },
        { point: user.point + 100 },
        { new: true }
      );
      const { userCode, userId, point } = updatedUser;

      // 타 사이트 포인트 조회 코드 추가
      const response = await axios.post(
        "http://3.38.58.1:4000/app/checkPoint",
        {
          userCode,
          clientId: process.env.CLIENT_ID,
        }
      );
      const DIDpoint = response.data;

      const updatedUserInfo = { userCode, userId, point, DIDpoint };
      // console.log(point);
      const secretKey = process.env.SALT;
      const options = { expiresIn: "7d" };

      jwt.sign(updatedUserInfo, secretKey, options, (err, token) => {
        if (err) throw new Error("Internal Server Error");
        else res.json({ error: 0, updateCheck: true, token });
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const buyItem = async (req, res) => {
  const { userData, itemPrice, a_idx } = req.body;

  try {
    if (a_idx === "local") {
      if (userData.point < itemPrice) res.json({ error: 1, result: false });
      else {
        const user = await User.findOne({ userId: userData.userId }).exec();
        //   console.log(user);
        const updatedUser = await User.findOneAndUpdate(
          { userId: user.userId },
          { point: user.point - itemPrice },
          { new: true }
        );

        const { userCode, userId, point } = updatedUser;

        const updatedUserInfo = {
          userCode,
          userId,
          point,
          DIDpoint: userData.DIDpoint,
        };
        // console.log(point);
        const secretKey = process.env.SALT;
        const options = { expiresIn: "7d" };
        jwt.sign(updatedUserInfo, secretKey, options, (err, token) => {
          if (err) throw new Error("Internal Server Error");
          else res.json({ error: 0, result: true, token });
        });
      }
    } else {
      const response = await axios.post("http://3.38.58.1:4000/app/usePoint", {
        userCode: userData.userCode,
        points: { [a_idx]: itemPrice },
      });

      if (response.data) {
        const user = await User.findOne({ userId: userData.userId }).exec();
        //   console.log(user);
        const { userCode, userId, point } = user;
        const response = await axios.post(
          "http://3.38.58.1:4000/app/checkPoint",
          {
            userCode: userData.userCode,
            clientId: process.env.CLIENT_ID,
          }
        );
        const DIDpoint = response.data;

        const updatedUserInfo = {
          userCode,
          userId,
          point,
          DIDpoint,
        };
        // console.log(point);
        const secretKey = process.env.SALT;

        const options = { expiresIn: "7d" };

        jwt.sign(updatedUserInfo, secretKey, options, (err, token) => {
          if (err) throw new Error("Internal Server Error");
          else res.json({ error: 0, result: true, token });
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const authDID = (req, res) => {
  const redirect_URI = process.env.REDIRECT_URI;
  const client_ID = process.env.CLIENT_ID;
  res.redirect(
    `http://13.124.189.38:8000/authorizor/auth?redirectURI=${redirect_URI}&clientID=${client_ID}`
  );
};

const DIDlogin = (req, res) => {
  const redirect_URI = process.env.REDIRECT_URI;
  const client_ID = process.env.CLIENT_ID;
  res.redirect(
    `http://13.124.189.38:8000/authorizor/auth?redirectURI=${redirect_URI}&clientID=${client_ID}`
  );
};

const redirectURI = async (req, res) => {
  const { code } = req.query;
  const { CHANNEL_Token } = req.cookies;

  try {
    if (CHANNEL_Token !== undefined) {
      const decoded = jwt.verify(CHANNEL_Token, process.env.SALT);
      const response = await axios.post(
        "http://13.124.189.38:8000/authorizor/token",
        {
          code,
        }
      );

      const token = response.data;
      const userData = await axios.get(
        "http://13.124.189.38:8000/authorizor/user",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      const { userCode } = userData.data;
      const checkDIDauth = await User.find({
        userCode,
      });
      if (checkDIDauth.length >= 1) {
        res.clearCookie("DID_ACCESS_TOKEN");
        res.clearCookie("DID_REFRESH_TOKEN");
        res.redirect(`http://localhost:3001?authDID=${false}`);
        return;
      }

      const user = await User.findOne({ userId: decoded.userId }).exec();
      if (user) {
        const updatedUser = await User.findOneAndUpdate(
          { userId: user.userId },
          { userCode: userData.data.userCode },
          { new: true }
        );
        const { userCode, userId, point } = updatedUser;
        const updatedUserInfo = { userCode, userId, point };
        const secretKey = process.env.SALT;
        const options = { expiresIn: "7d" };

        jwt.sign(updatedUserInfo, secretKey, options, (err, token) => {
          if (err) {
            console.log(err);
            throw new Error("Internal Server Error");
          } else {
            res.cookie("CHANNEL_Token", token, {
              maxAge: 1000 * 60 * 60 * 24 * 7,
            });
            res.redirect("http://localhost:3001");
          }
        });
      } else {
        const userInfo = { userCode, userId: "", point: 0 };
        const secretKey = process.env.SALT;
        const options = { expiresIn: "7d" };

        jwt.sign(userInfo, secretKey, options, (err, token) => {
          if (err) {
            console.log(err);
            throw new Error("Internal Server Error");
          } else {
            res.cookie("CHANNEL_Token", token, {
              maxAge: 1000 * 60 * 60 * 24 * 7,
            });
            res.redirect("http://localhost:3001");
          }
        });
      }
    } else {
      const response = await axios.post(
        "http://13.124.189.38:8000/authorizor/token",
        {
          code,
        }
      );

      const token = response.data;
      const userData = await axios.get(
        `http://13.124.189.38:8000/authorizor/user?clientID=${process.env.CLIENT_ID}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const { userCode } = userData.data;

      const user = await User.findOne({ userCode });
      if (user && user.userPw === "") {
        const { userCode, userId, point } = user;
        const secretKey = process.env.SALT;
        const options = { expiresIn: "7d" };
        const response = await axios.post(
          "http://3.38.58.1:4000/app/checkPoint",
          {
            userCode,
            clientId: process.env.CLIENT_ID,
          }
        );
        const DIDpoint = response.data;

        const userInfo = { userCode, userId, point, DIDpoint };

        jwt.sign(userInfo, secretKey, options, (err, token) => {
          if (err) {
            console.log(err);
            throw new Error("Internal Server Error");
          } else {
            res.cookie("CHANNEL_Token", token, {
              maxAge: 1000 * 60 * 60 * 24 * 7,
            });
            res.redirect("http://localhost:3001");
          }
        });
      } else if (user && user.userPw !== "") {
        // res.redirect(`http://localhost:3001?authDID=${false}`);

        const { userCode, userId, point } = user;
        const secretKey = process.env.SALT;
        const options = { expiresIn: "7d" };
        const response = await axios.post(
          "http://3.38.58.1:4000/app/checkPoint",
          {
            userCode,
            clientId: process.env.CLIENT_ID,
          }
        );
        const DIDpoint = response.data;

        const userInfo = { userCode, userId, point, DIDpoint };

        jwt.sign(userInfo, secretKey, options, (err, token) => {
          if (err) {
            console.log(err);
            throw new Error("Internal Server Error");
          } else {
            res.cookie("CHANNEL_Token", token, {
              maxAge: 1000 * 60 * 60 * 24 * 7,
            });
            res.redirect("http://localhost:3001");
          }
        });
      } else {
        // const newUser = new User({ userCode });
        // const userInfo = await User.create(newUser);

        // console.log(userInfo);
        // const { userId, point } = userInfo;
        const DIDuserInfo = { userCode, userId: "", point: 0, DIDpoint: [] };
        const secretKey = process.env.SALT;
        const options = { expiresIn: "7d" };

        jwt.sign(DIDuserInfo, secretKey, options, (err, token) => {
          if (err) {
            console.log(err);
            throw new Error("Internal Server Error");
          } else {
            res.cookie("CHANNEL_Token", token, {
              maxAge: 1000 * 60 * 60 * 24 * 7,
            });
            res.redirect("http://localhost:3001");
          }
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.redirect(500, "http://localhost:3001");
  }
};

const withdrawDID = async (req, res) => {
  const { userCode: code } = req.query;
  // const { userData } = req.body;
  try {
    const user = await User.findOne({ userCode: code });
    if (user.userPw === "") {
      await User.deleteOne({ userCode: code });

      res.clearCookie("CHANNEL_Token");
      res.redirect(
        `http://13.124.189.38:8000/authorizor/disconnect?clientID=${process.env.CLIENT_ID}&userCode=${code}`
      );
      // res.clearCookie("DID_ACCESS_TOKEN");
      // res.clearCookie("DID_REFRESH_TOKEN");
      // res.json({ error: 0, withdrawDIDchk: true, withdrawUser: true });
      return;
    }

    const withdrawDIDuser = await User.findOneAndUpdate(
      { userCode: code },
      { userCode: "" },
      { new: true }
    );
    const { userCode, userId, point } = withdrawDIDuser;
    const updatedUserInfo = { userCode, userId, point, DIDpoint: [] };
    const secretKey = process.env.SALT;
    const options = { expiresIn: "7d" };

    jwt.sign(updatedUserInfo, secretKey, options, (err, token) => {
      if (err) throw new Error("Internal Server Error");
      else {
        res.cookie("CHANNEL_Token", token, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
        });
        res.redirect(
          `http://13.124.189.38:8000/authorizor/disconnect?clientID=${process.env.CLIENT_ID}&userCode=${code}`
        );
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const viewPoint = async (req, res) => {
  const { userCode } = req.body;

  try {
    const user = await User.findOne({ userCode });

    res.json({ error: 0, pt: user.point });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

const allowPoint = async (req, res) => {
  const { userCode, point } = req.body;

  try {
    const user = await User.findOne({ userCode });

    const result = await User.findOneAndUpdate(
      { userCode },
      { point: user.point - point },
      { new: true }
    );

    res.json({ error: 0, userCode: result.userCode, point: result.point });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  idOverlapChk,
  regist,
  registWithDID,
  login,
  logout,
  sendToken,
  getPoint,
  buyItem,
  authDID,
  withdrawDID,
  redirectURI,
  DIDlogin,
  viewPoint,
  allowPoint,
};
