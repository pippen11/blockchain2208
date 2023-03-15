const crypto = require('crypto');

const header = {
    alg: 'HS256',
    typ: 'JWT'
}

const payload = {
    userid: 'bitkunst',
    username: '비트쿤스트'
}

const encodingHeader = Buffer.from(JSON.stringify(header)).toString('base64').replace(/[=]/g, '');

const encodingPayload = Buffer.from(JSON.stringify(payload)).toString('base64').replace(/[=]/g, '');

const signature = crypto.createHmac('sha256', Buffer.from('qwer1234'))  
                        .update(`${encodingHeader}.${encodingPayload}`)
                        .digest(`base64`)
                        .replace(/[=]/g, '');
                        
const jwt = `${encodingHeader}.${encodingPayload}.${signature}`

console.log('encodingHeader : ', encodingHeader)
console.log('encodingPayload : ', encodingPayload)
console.log('signature : ', signature)
console.log('JWT : ', jwt)
