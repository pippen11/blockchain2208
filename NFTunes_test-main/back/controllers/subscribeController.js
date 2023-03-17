const User = require('../models/userModel');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
const SubscribeContract = require('../../truffle/build/contracts/Subscribe.json');

exports.subscribeTx = async (req, res) => {
  const { account } = req.body;
  const networkId = await web3.eth.net.getId();
  const to = SubscribeContract.networks[networkId].address;
  const abi = SubscribeContract.abi;
  const deployed = new web3.eth.Contract(abi, to);
  const data = await deployed.methods.subscribe().encodeABI();

  const txObject = {
    from: account,
    to,
    value: web3.utils.toWei('1', 'ether'),
    data,
  };

  res.json(txObject);
};

exports.subscribeState = async (req, res) => {
  const { account } = req.body;
  let txObject;
  try {
    const filter = { account };
    const today = new Date();
    const endDay = new Date();
    endDay.setDate(endDay.getDate() + 31);
    const update = {
      subscribeStartTimestamp: today,
      subscribeEndTimestamp: endDay,
      subscribeState: true,
    };

    await User.findOneAndUpdate(filter, update);
    const [result] = await User.find(filter);

    console.log('controllstate', result);

    txObject = {
      result,
    };
  } catch (e) {
    console.error(e);
  }

  res.json(txObject);
};

exports.subscribeRefundTx = async (req, res) => {
  const { account } = req.body;
  const networkId = await web3.eth.net.getId();
  const to = SubscribeContract.networks[networkId].address;
  const abi = SubscribeContract.abi;
  const deployed = new web3.eth.Contract(abi, to);
  const data = await deployed.methods.cancelSubscribe().encodeABI();

  const txObject = {
    from: account,
    to,
    // value: web3.utils.toWei('1', 'ether'),
    data,
  };
  console.log('back', txObject);

  res.json(txObject);
};

exports.subscribeCancelState = async (req, res) => {
  const { account } = req.body;
  let txObject;
  try {
    const filter = { account };

    const update = {
      subscribeState: false,
    };

    await User.findOneAndUpdate(filter, update);
    const [result] = await User.find(filter);
    txObject = {
      result,
    };
  } catch (e) {
    console.error(e);
  }

  res.json(txObject);
};
