const mysql = require('mysql')
const connection = mysql.createConnection({  // 이때 핸드쉐이크가 일어나서 커넥션을 맺어준다.
    host: 'localhost',
    user: 'bitkunst',
    password: 'won0701',
    database: 'project1'
})

connection.connect((err)=>{  // 소켓 open
    if (err) throw err;
    console.log('socket open')  // 연결이 되면 실행되게끔 하기 위해서 콜백형태로 구현이 됨.
});  


connection.query("SELECT * FROM user", (err, result)=>{
    if (err) throw err;
    console.log(result)
})


// connection.end()  // 커넥션 끊기

