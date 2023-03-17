const MintMusicToken = artifacts.require('MintMusicToken');
const SaleMusicToken = artifacts.require('SaleMusicToken');

module.exports = async (deployer) => {
  await deployer.deploy(MintMusicToken);
  const SaleMusicTokenInstance = await MintMusicToken.deployed();

  await deployer.deploy(SaleMusicToken, SaleMusicTokenInstance.address);
};
