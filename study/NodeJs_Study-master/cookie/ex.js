const cp = require('./cookieParser.js')

cookieText = "id=bitkunst; pw=1234; name=홍길동"
const cookie = cp.cookieParser(cookieText)

console.log(cookie)