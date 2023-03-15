const Voting = artifacts.require('Voting');

module.exports = function (deployer) {
    deployer.deploy(Voting, ['둘리', '도우너', '또치', '마이클']);
};
