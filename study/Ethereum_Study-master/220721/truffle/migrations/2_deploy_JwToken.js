const JwToken = artifacts.require('JwToken');
const EthSwap = artifacts.require('EthSwap');

module.exports = async function (deployer) {
    try {
        await deployer.deploy(JwToken); // JwToken 배포 진행
        const token = await JwToken.deployed(); // 배포 완료된 인스턴스 가져오기
        // console.log(token.address); // JwToken CA

        await deployer.deploy(EthSwap, token.address); // EthSwap 배포 진행
        const ethSwap = await EthSwap.deployed();
        // console.log(ethSwap);
    } catch (e) {
        console.log(e.message);
    }
};
