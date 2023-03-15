const {user} = require('../models/user.js')

findUser = (req, res, next) => {
    const {userid, userpw} = req.body;
    const [userInfo] = user.filter(v => {
        return v.userid == userid && v.userpw == userpw
    })
    req.user = {
        ...userInfo
    }
    next()
}

module.exports = {
    findUser
}