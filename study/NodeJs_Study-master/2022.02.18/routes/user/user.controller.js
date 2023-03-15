// 미들웨어만 모아놓는 아이

const pool = require('../../db.js')

const join = (req, res) => {
    
    pool.getConnection((err, conn)=>{
        // 2개의 인자값
        // sql, ()={ } callback
        conn.query('select * from board', (err, result)=>{
            console.log(result)
        })
    })
    res.render('./user/join.html')
}

module.exports = {
    join
}