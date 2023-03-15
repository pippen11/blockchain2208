const axios = require('axios')

const Auth = async (req, res, next) => {
    const { token } = req.cookies 
    const body = {
        token
    }

    const response = await axios.post('http://localhost:4001/api/auth', body, {
        "Content-type": "application/json"
    })

    if (response.data === true) {
        next()
    } else {
        // 검증이 안됨
        res.render('token')
    }
}

module.exports = {
    Auth
}

// app.get('/board/list', async (req, res)=>{
//     console.log(req.cookies)
//     const {token} = req.cookies
//     const body = {
//         token
//     }
//     const response = await axios.post('http://localhost:4001/api/auth', body, {
//         'Content-type': 'application/json'
//     })
//     console.log(response.data)
//     if (response.data === true) {
//         res.render('board_list.html')
//     } else {
//         // 검증이 안됨
//         res.render('token')
//     }
// })