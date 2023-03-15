const SimpleStore = artifacts.require('SimpleStore');

module.exports = function (deployer) {
    deployer.deploy(SimpleStore, 10);
};

// constructor 함수의 인자값을 전달해주지 않았기 때문에 배포시 에러 발생
// truffle 기준 deployer.deploy()의 두번째 인값으로 전달
