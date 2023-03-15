const axios = require('axios')
exports.Auth = async (req,res,next) => {
    const { token } = req.cookies
    const body = {
        token
    }

    const response = await axios.post('http://localhost:4001/api/auth',body,{
        "Content-type":'application/json'
    })

    if(response.data === true) {
        next()
    } else {
        // 검증이안됨
        res.render('token')
    }
}