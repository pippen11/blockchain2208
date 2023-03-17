const SdToken = artifacts.require("SdToken");
const Market = artifacts.require("Market");

module.exports = async (deployer) => {
  await deployer.deploy(SdToken, "test", "tst", "http://localhost:3500");
  const tokenInstance = await SdToken.deployed();
  await deployer.deploy(Market, tokenInstance.address);
};
