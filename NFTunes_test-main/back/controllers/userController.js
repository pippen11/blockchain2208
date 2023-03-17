const User = require('../models/userModel');

exports.join = async (req, res) => {
  const { nickname, email, account } = req.body.userInfo;
  let result;
  const existedAcct = await User.find({
    account,
  });
  if (existedAcct.length === 0) {
    try {
      const newUser = await User.create({
        account,
        nickname,
        email,
      });
      result = { userInfo: newUser, isNew: 'true' };
      console.log(result);
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
    }
  } else {
    result = { userInfo: existedAcct[0], isNew: 'false' };
  }
  res.send(result);
};

exports.login = async (req, res) => {
  const { account } = req.body;
  try {
    const existedAcct = await User.find({
      account,
    });
    if (existedAcct.length === 0) throw new Error('no data');
    res.send({ user: existedAcct[0] });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.quit = async (req, res) => {};

exports.editUserInfo = async (req, res) => {};

exports.getAllUserNick = async (_, res) => {
  try {
    const existedUser = await User.find({});
    const existedNick = [];
    existedUser.map((userInfo) => existedNick.push(userInfo.nickname));
    res.send(existedNick);
  } catch (err) {
    console.log(err);
  }
};

exports.getAllUserInfo = async (req, res) => {
  try {
    const existedUser = await User.find({});
    res.send(existedUser);
  } catch (err) {
    console.log(err);
  }
};

exports.userDetails = async (req, res) => {
  try {
    const [details] = await User.find({
      account: req.params.acct,
    });
    res.send({ details });
  } catch (err) {
    console.log(err);
  }
};
