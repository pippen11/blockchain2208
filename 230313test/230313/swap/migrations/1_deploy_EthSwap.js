// truffle migrations

const testToken = artifacts.require("testToken");
const EthSwap = artifacts.require("EthSwap");

module.exports = async function (deployer) {
  try {
    await deployer.deploy(testToken); // testToken 배포 진행
    const token = await testToken.deployed(); // 배포 완료된 인스턴스 가져오기
    // console.log(token.address); // testoken CA

    await deployer.deploy(EthSwap, token.address); // EthSwap 배포 진행
    const ethSwap = await EthSwap.deployed();
    // console.log(ethSwap);
  } catch (e) {
    console.log(e.message);
  }
};
