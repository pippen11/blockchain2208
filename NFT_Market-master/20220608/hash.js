const SHA256 = require("crypto-js/sha256");

// JWT

const header = {
  alg: "SH256",
};

const payalod = {
  userid: "web7722",
};

const res = "alg:'SH256'userid:'web7722'";

const a = res;
console.log("result : ", SHA256(a).toString());
console.log("length : ", SHA256(a).toString().length);
/*
result :  ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb
length :  64
*/
