const MintMusicToken = artifacts.require('MintMusicToken');
const Auction = artifacts.require('Auction');

module.exports = async (deployer) => {
  await deployer.deploy(MintMusicToken);
  const AuctionInstance = await MintMusicToken.deployed();

  await deployer.deploy(Auction, AuctionInstance.address);
};

