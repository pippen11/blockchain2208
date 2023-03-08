const BreadShop = artifacts.require("BreadShop");

module.exports = function (deployer) {
  deployer.deploy(BreadShop, (10 ** 18).toString());
  // 10의 18승 만쓰면 16진수로나옴 10진수로바꾸기위해 tostring
};
