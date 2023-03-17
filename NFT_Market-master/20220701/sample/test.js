const Web3 = require("web3");
const web3 = new Web3("http://127.0.0.1:9000");

async function init() {
  const accounts = await web3.eth.getAccounts();
  console.log(accounts);
}

init();

// transaction
// block
// transaction 내용
