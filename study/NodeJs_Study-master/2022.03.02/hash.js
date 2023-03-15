const crypto = require('crypto');

const salt = 'qwer1234';
const name = 'bitkunst';
const hash1 = crypto.createHash('sha256').update(name).digest('hex');
const hash2 = crypto.createHmac('sha256', Buffer.from(salt)).update(name).digest('hex');

console.log('without salt : ', hash1);
console.log('with salt : ', hash2);
