const { createSignature } = require('../utils/jwt.js')

exports.auth = (req, res, next) => {
    let cookies = req.headers.cookie;
    console.log(cookies)
    // 토큰이 유효한지 아닌지 검증하는 로직
    // 1. token에 있는 .을 기준으로 내용을 뽑아온다. [header, payload, sign]
    // 2. 가져온 header, payload를 가지고 새로운 signature를 만든다.
    // 3. 새로운 signature와 기존의 sign을 비교해서 같은지 아닌지 판단한다.
    // 4. 같다면 유효한 쿠키, 같지 않다면 변조된 쿠키
    try {
        let [[,token]] = cookies.split(';').map(v => v.trim().split('=')).filter(v => {
            return v[0] == 'AccessToken'
        })
        const [header, payload, sign] = token.split('.')  // 1. code  
        const signature = createSignature(header, payload)  // 2. code
        if (signature != sign) throw new Error('Token error')  // 3. code
        
        // 3.1 payload에 대한 내용을 decoding 해서 가져온다. (base64 -> Object)
        const user = JSON.parse(Buffer.from(payload, 'base64').toString('utf-8'))
        // 3.2 req객체에다가 user를 추가해서 넣었다.
        req.user = {
            ...user
        }

        next()
    } catch(err) {
        next()
    }

}