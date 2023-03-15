const { createSignature } = require('../utils/jwt')

exports.auth = (req,res,next) => {
    // 1. code
    const cookies = req.headers.cookie
   

    // 토큰이 썩었는지 안썩었는지 확인할려면 어떤 로직을 구현해야하는지
    // 1. token 잇는 . 기준으로 내용을 뽑아온다. [header,payload,sign] OK
    // 2. 가져온 header, payload 가지고 새로운 signature 를 만듭니다. 
    // 3. 새로운 signature 와 기존의 sign 과 비교를 해서 같은지 아닌지를 판다합니다.
    //    이때 같으면 훌륭한 쿠키 같지 않으면 썩은 쿠키
    try {
        const [[,token]] = cookies.split(';').map(v=>v.trim().split('=')).filter(v=>v[0]=='AccessToken')
        const [header,payload,sign] = token.split('.')
        // 2. code
        const signature = createSignature(header,payload)
        // 3. code
        if (signature !== sign) throw new Error('Token error')

        // 3.1 payload에 대한 내용을 decoding 해서 가져온다 ( base64 -> Object )
        const user = JSON.parse(Buffer.from(payload,'base64').toString('utf-8'))
        // 3.2 req객체에다가 user를 추가해서 보냈다. 
        req.user = {
            ...user
        }
    } catch (e) {
        console.log(e)
    }

    next()
}