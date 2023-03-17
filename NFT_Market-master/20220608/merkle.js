const merkle = require("merkle");

const data = ["asdf", "asdf", "asdf", "asdfasdf", "asdfasdf", "asdfasdf"];

const merkleTree = merkle("sha256").sync(data);
console.log(merkleTree);

const merkleRoot = merkleTree.root();
console.log(merkleRoot);
// D4DE22242F3EB5170177D5DE1936C9C0E19E4CF2CA7E5901CF50C8FCDCD677DD
