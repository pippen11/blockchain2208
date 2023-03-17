const GyulToken = artifacts.require("GyulToken");
const SaleToken = artifacts.require("SaleToken");

module.exports = async (deployer) => {
    await deployer.deploy(GyulToken, "test", "gyul", "http://localhost:3005");
    const gyulTokenInstance = await GyulToken.deployed();

    await deployer.deploy(SaleToken, gyulTokenInstance.address);
};
