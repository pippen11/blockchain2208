const TestToken = artifacts.require("TestToken");
// TestToken 컨트랙트이름이다

module.exports = function (deployer) {
  deployer.deploy(TestToken, "JT");
};

// _symbol에 맞게 "JT"를 넣어줬다 contructor에 매개변수넣고
// deploy안에 안넣으면 터짐
// constructor(string memory _symbol) {
//   balances[msg.sender] = totalSupply;
//   symbol = _symbol;
// }
