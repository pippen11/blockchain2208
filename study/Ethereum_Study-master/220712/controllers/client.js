const Web3 = require('web3');

// 싱글톤 인스턴스
// 스마트 컨트랙트를 이더리움 네트워크에 배포시 객체가 하나 생성된다.
// 싱글톤은 new를 사용해 객체들을 생성하더라도 같은 객체를 바라볼 수 있게 하고자 하는 것이다.
// 객체를 생성할 때 참조형태로 객체를 생성하는 것이 싱글톤

let instance;
class Client {
    constructor(_url) {
        if (instance) return instance;
        this.web3 = new Web3(_url);
        instance = this;
    }
}

module.exports = { Client };

// const client = new Client('ws://127.0.0.1:9005');
// const client2 = new Client('ws://127.0.0.1:9005');

// console.log(client === client2);  // true
