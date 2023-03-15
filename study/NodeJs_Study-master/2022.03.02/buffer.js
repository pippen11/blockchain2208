const name = 'bitkunst'
const buff = Buffer.from(name)

console.log(buff)
console.log(typeof(buff))

const base64 = Buffer.from(name, 'base64')
console.log('base64 is : ', base64)

const decoding1 = buff.toString() 
console.log('디코딩1 : ', decoding1)