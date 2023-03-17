import hexToBianry from 'hex-to-binary'
import SHA256 from 'crypto-js/sha256'

// npm install crypto-js

// hash hex-> 16진수 -> 2진수
// 16진수로보이는 그저 string
// 0 1 2 3 4~ 9 A B C D E F

// 16
// 0 -> 0000
// 1 -> 0001
// 2 -> 0010

// npm install hex-to-binary
const hash: string = SHA256('ingoo').toString()
const binary: string = hexToBianry(hash)

console.log(binary)
