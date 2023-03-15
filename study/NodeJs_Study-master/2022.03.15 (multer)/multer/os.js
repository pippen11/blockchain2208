// 내부 라이브러리 OS
// Nodejs 내컴퓨터를 조작하는데 JavaScript로 조작한다.
// 설치없이 사용할 수 있는 게 바로 내부 라이브러리

const os = require('os')

console.log(os.cpus().length)
// console.log(os.cpus())

console.log(os.platform())
console.log(os.homedir())
console.log(os.hostname())

console.log(os.freemem())