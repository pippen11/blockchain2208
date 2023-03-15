const SHA256 = require('crypto-js/sha256')

// JWT
/*
    const header = {
        alg: 'SH256',
    }

    const payload = {
        userid: 'web7722',
    }
*/

const hash = 'my first block'
console.log("result : ", SHA256(hash).toString())
console.log("length : ", SHA256(hash).toString().length)
/*
    result :  ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb
    length :  64
*/