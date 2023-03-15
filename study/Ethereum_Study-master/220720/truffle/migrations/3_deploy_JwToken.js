const JwToken = artifacts.require('JwToken');

module.exports = function (deployer) {
    deployer.deploy(JwToken, 'JwToken', 'JTK', 5000);
};
