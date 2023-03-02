const counter = artifacts.require("Counter");

module.exports = function (deployer) {
  deployer.deploy(counter);
};

//   배포할때마다 트랜잭션 돈다 deployer.deploy(counter);이거돌때마다 트랜잭션 하나이다
