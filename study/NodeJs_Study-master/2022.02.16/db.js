const mysql = require('mysql')
const connection = mysql.createConnection({
    host: '172.23.11.131',
    user: 'bitkunst',
    password: 'won0701',
    database: 'example'
}) // 접속까지 완료한 건 아님, 접속할 정보를 담아놓은 상태

connection.connect((err)=>{
    if (err) throw err;
    console.log('db connected')
})
