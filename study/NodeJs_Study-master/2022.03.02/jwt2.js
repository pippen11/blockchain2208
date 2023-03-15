const crypto = require('crypto')
const salt = 'ingoo'

function createToken(state){
    const header = {
        tpy:"JWT",
        alg:"HS256"
    }

    const payload = {
        ...state,
    }

    const encodingHeader = encoding(header)
    const encodingPyload = encoding(payload)

    const signature = createSignature(encodingHeader,encodingPyload)

    return `${encodingHeader}.${encodingPyload}.${signature}`
}

function encoding(data){
    return Buffer.from(JSON.stringify(data)).toString('base64').replace(/[=]/g,'')
}

function createSignature(header,payload){
    return crypto.createHmac('sha256',Buffer.from(salt))
    .update(`${header}.${payload}`)
    .digest('base64')
    .replace(/[=]/g,'')
}

function decodingPayload(payload){
    return JSON.parse(Buffer.from(payload,'base64').toString())
}

module.exports = {
    createToken,
    createSignature,
    decodingPayload
}
