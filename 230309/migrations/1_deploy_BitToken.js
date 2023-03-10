const BitToken = artifacts.require("BitToken");

module.exports = function (deployer) {
  deployer.deploy(BitToken, "BitToken", "Bitcoin", 1000);
};
