const {createSignature} = require('../utils/jwt.js')

cookieAuth = (req, res, next) => {
    try {
        const {AccessToken} = req.cookies
        const header = AccessToken.split('.')[0]
        const payload = AccessToken.split('.')[1]
        const sign = AccessToken.split('.')[2]
        const signature = createSignature(header, payload)

        if (sign !== signature) throw new Error('cookie poisoned')
        const user = JSON.parse(Buffer.from(payload, 'base64').toString('utf-8'))
        req.user = {
            ...user
        }
        next()
    } catch (err) {
        next()
    }
}

module.exports = {
    cookieAuth
}