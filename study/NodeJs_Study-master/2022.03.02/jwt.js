const crypto = require('crypto')

// JWT를 만드는 코드를 작성할 거에요. 처음부터 끝까지

// header
// payload (내용) - 데이터
// signature (header와 payload를 합쳐서 암호화 형태)


const header = {
    alg: 'sha256',
    tpy: 'JWT'
}

// 쿠키에 내용을 저장할 것이기 때문에 민감한 정보는 저장하지 않는다.
const payload = {
    userid: 'web7722',
    name: 'ingoo'
}

// header 와 payload를 해쉬값으로 만들어 놓는다.

// header 객체를 -> string -> buffer 16진수 -> 64진수 -> 빈 비트값이 존재해서 그 값을 =으로 대체함 -> 
const encodingHeader = Buffer.from(JSON.stringify(header)).toString('base64').replace(/[=]/g,'')  // JSON을 string 형태로 변환

const encodingPayload = Buffer.from(JSON.stringify(payload)).toString('base64').replace(/[=]/g,'')

// decoding
// const decodingHeader = Buffer.from(encodingHeader, 'base64').toString()
// console.log(JSON.parse(decodingHeader))

console.log(encodingHeader, encodingPayload)  // = 이라는 값은 아무값도 아니라는 뜻.

// encoding 한 결과를 가지고 hash 값을 만든다.
// header값
const signature = crypto.createHmac('sha256', Buffer.from('web7722'))  
.update(`${encodingHeader}.${encodingPayload}`)
.digest(`base64`)
.replace(/[=]/g, '')

console.log(signature)
// 다른 character-set일 경우 salt값으로 다른 값이 들어갈 수 있기 때문에 buffer.from으로 컴퓨터가 저장하는 형태로 salt값을 넣어준다.

const jwt = `${encodingHeader}.${encodingPayload}.${signature}`
console.log(jwt)

// 여기까지 코드는 login session 역할과 같다.
// jwt라는 로그인 쿠키를 만들어서 j
// jwt를 cookie로 던지면 됩니다.

// 미들웨어,, 너 토큰이 유효하냐 안하냐,, 쿠키값이 정확하냐 안하냐 검증
// 쿠키에 있는 아이디 값을 변조할 수 있기 때문에 검증과정을 거쳐야 한다.

const cookie = {
    token: jwt 
}

console.log(cookie.token)  // req.cookie에 찍히는 내용
console.log('*****************************************************************')

const [head, pay, sign] = cookie.token.split('.')
// console.log(head, pay, sign)

const designature = crypto.createHmac('sha256', Buffer.from('web7722'))  // 클라이언트는 salt값을 모르기 때문에 변조를 할 수가 없다.
                          .update(`${head}.${pay}`)
                          .digest('base64')
                          .replace(/[=]/g, '')
console.log(designature, sign)

console.log(designature === sign)  // false가 뜬다면 변조가 된 것

const decodingPayload = JSON.parse(Buffer.from(head, 'base64').toString()) // 인자값이 없다면 디폴트가 utf-8
console.log(pay, decodingPayload)


// 데이터의 모음 -> 토큰
// 배열, 객체 같은 거를 토큰이라 한다.