const Block = require("../block/block");

class Chain {
  #chain;

  constructor() {
    this.#chain = [];
    const genesis = new Block([`제네시스 블록 ${new Date()}`]);

    this.#chain.push(genesis);
  }

  get chain() {
    return [...this.#chain];
  }

  get lastBlock() {
    return this.#chain[this.#chain.length - 1];
  }

  addBlock(_data) {
    const newBlock = new Block(_data, this.lastBlock);

    return this.add2Chain(newBlock);
  }

  add2Chain(_newBlock) {
    const isValid = Block.isValidBlock(_newBlock, this.lastBlock);

    if (isValid.isError) {
      console.error(isValid.msg);
      return null;
    } else {
      this.#chain.push(_newBlock);
      return _newBlock;
    }
  }
}

const chain = new Chain();

const block = new Block(["qwer"], chain.lastBlock);

chain.addBlock(["asdf"]);
chain.addBlock(["asdf2"]);
chain.addBlock(["asdf3"]);
console.log(chain.chain);

module.exports = Chain;
