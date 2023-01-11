const merkle = require("merkle");
const SHA256 = require("crypto-js").SHA256;

class BlockHeader {
  version;
  merkleRoot;
  timestamp;
  height;
  difficulty;
  nonce;

  constructor(_previousBlock, _data) {
    this.version = "1.0.0";

    const merkleRoot = this.createMerkleRoot(_data);

    if (merkleRoot.isError) {
      this.merkleRoot = "";
      console.error(merkleRoot.msg);
    } else {
      this.merkleRoot = merkleRoot.value;
    }

    this.setTimestamp();

    this.height = _previousBlock ? _previousBlock.height + 1 : 0;
    this.difficulty = 0;
    this.nonce = 0;
  }

  setTimestamp() {
    this.timestamp = Date.now();
  }

  createMerkleRoot(_data) {
    if (!Array.isArray(_data) || !_data.length) {
      return { isError: true, msg: "data가 배열이 아니거나 빈배열" };
    }
    return { isError: false, value: merkle("sha256").sync(_data).root() };
  }
}

class Block extends BlockHeader {
  previousHash;
  hash;
  data;

  constructor(_data, _previousBlock) {
    super(_previousBlock, _data);

    this.previousHash = _previousBlock ? _previousBlock.hash : "0".repeat(64);

    if (this.merkleRoot) {
      this.hash = Block.createHash(this);
    } else {
      this.hash = "";
    }
    this.data = _data;
  }

  static createHash(_block) {
    let tempStr = "";

    const keys = Object.keys(_block);

    for (let i = 0; i < keys.length; i++) {
      if (keys[i] === "hash" || keys[i] === "data") {
        continue;
      }
      tempStr += _block[keys[i]];
    }

    return SHA256(tempStr).toString().toUpperCase();
  }

  static isValidBlock(_newBlock, _previousBlock) {
    if (_newBlock.height !== _previousBlock.height + 1) {
      return { isError: true, msg: "높이가 다르다." };
    }
    if (_newBlock.previousHash !== _previousBlock.hash) {
      return {
        isError: true,
        msg: "이전블록의 해시와 새로운 블록의 이전hash가 다르다",
      };
    }
    if (_newBlock.hash !== Block.createHash(_newBlock)) {
      return {
        isError: true,
        msg: "hash 생성중 오류 발생",
      };
    }
    return { isError: false, value: _newBlock };
  }
}

const temp = new Block(["asd"]);

Block.createHash(temp);

module.exports = Block;
