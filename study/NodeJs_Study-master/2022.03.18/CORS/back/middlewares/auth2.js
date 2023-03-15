const { createSignature } = require('../utils/jwt')

exports.Auth = (req,res,next) => {
    try {
        console.log(req.cookies)
        const { token } = req.cookies
        console.log(`토큰있뉘?`,token)
        if (token === undefined) throw new Error('토큰 없다')
        const [header,payload,sign] = token.split('.') // 결과물이 뭐냐.
        //[eyJ0cHkiOiJKV1QiLCJhbGciOiJIUzI1NiJ9,eyJ1c2VyaWQiOiJhZG1pbiIsIm5hbWUiOiJhYSIsIm5pY2tuYW1lIjoicXdlcSIsInVzZXJsZXZlbCI6MX0,LEgXmfqxlZvB3+ryHOTkfnntVA1BD4k6FL17saBJBBE]
        const signature = createSignature(header,payload)

        if (sign !== signature) throw new Error('토큰 변조됨')
        const user = JSON.parse( Buffer.from(payload,'base64').toString('utf-8') )

        req.user = {
            ...user
        }

    } catch (e) {
        console.log(e.message)
    }

    next()
}