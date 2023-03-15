const express = require('express');
const router = express.Router();
const {promisePool} = require('../../db.js')


router.post('/list', async (req, res)=>{
    
    const sql = `SELECT idx, 
                        subject, 
                        nickname, 
                        DATE_FORMAT(date, '%Y-%m-%d') AS date, 
                        hit 
                FROM board 
                ORDER BY idx DESC`

    const sql2 = `SELECT count(idx) AS total_record FROM board`
    let response = {
        errno: 1
    }

    try {
        const [rows,] = await promisePool.execute(sql)
        const [[{total_record}]] = await promisePool.execute(sql2)
        response = {
            ...response,
            total_record,
            errno: 0,
            result: rows
        }

        res.json(response)
    } catch(err) {
        console.log(err.message)
    }

})

module.exports = router;