const JwToken = artifacts.require('JwToken');
const SaleToken = artifacts.require('SaleToken');

module.exports = async (deployer) => {
    await deployer.deploy(JwToken, 'JwToken', 'JTK', 'http://localhost:3500'); // constructor() 인자값 전달
    const JwTokenInstance = await JwToken.deployed();

    await deployer.deploy(SaleToken, JwTokenInstance.address);
};
