const merkle = require("merkle");
const SHA256 = require("crypto-js/sha256");

class BlockHeader {
  constructor(_height, _previousHash) {
    this.version = BlockHeader.getVersion();
    this.height = _height;
    this.timestamp = BlockHeader.getTimestamp();
    this.previousHash = _previousHash || "0".repeat(64);
  }

  static getVersion() {
    return "1.0.0";
  }

  static getTimestamp() {
    return new Date().getTime();
  }
}

class Block {
  constructor(_header, _data) {
    const merkleroot = Block.getMerkleRoot(_data);
    this.version = _header.version;
    this.height = _header.height;
    this.timestamp = _header.timestamp;
    this.previousHash = _header.previousHash;
    this.merkleRoot = merkleroot;
    this.hash = Block.createBlockHash(_header, merkleroot);
    this.data = _data;
  }

  static getMerkleRoot(_data) {
    const merkleTree = merkle("sha256").sync(data);
    const merkleRoot = merkleTree.root();
    return merkleRoot;
  }

  static createBlockHash(_header, _merkleroot) {
    const values = Object.values(_header);
    const data = values.join("") + _merkleroot;
    return SHA256(data).toString();
  }
}

// previousHash
// block 연결하는 애가 chain 배워
// block 에서 첫번째블록에는 이름이 붙습니다. 제네시스 블록

const header = new BlockHeader(0);
const data = [
  "The Times 03/Jan/2009 Chancellor on brink of second bailout for bank",
];
const block = new Block(header, data);
console.log(block);

module.exports = {
  BlockHeader,
};
