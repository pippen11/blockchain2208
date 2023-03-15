const {createSignature,decodingPayload} = require('./jwt2')

exports.Auth = (req,res,next) => {
    console.log(req.headers)
    const jwt = req.headers.cookie.split('=')[1]
    if (jwt == undefined) {
        console.log(jwt)
        // alert()
        return 0;
    }

    const [header,payload,sign] = jwt.split('.')
    const signature = createSignature(header,payload)
    console.log('sign : ', sign) 
    console.log('signature : ', signature) 
    console.log(sign == signature)
    if (sign == signature) {
        // 검증 로직 
        const user = decodingPayload(payload)
        req.user = user;
        next()
    } else {
        // 검증이 안된 로직 
        res.redirect('/')
    }
}