const Web3 = require("web3");

let instance;
//일종의 복사된 임시값

class Client {
  constructor(_url) {
    if (instance) return instance;
    // 메모리 낭비할필요없으니 instance있으면return
    this.web3 = new Web3(_url);
    // Client.web3를 Web3에 url넣어준걸로생성
    // web3아니여도 다른걸로 적어도됨
    instance = this;
    //instance는 Client자체
  }
}

module.exports = Client;
