const express = require('express')
const router = express.Router()
const userRouter = require('./user/index.js')
const boardRouter = require('./board/index.js')
const registerRouter = require('./register/index.js')
const {alertMove} = require('../util/alert.js') 


router.get('/', (req, res)=>{
    const {user} = req.session
    console.log(user)
    res.render('index.html', {
        user
    })
})

/* User Login */
router.use('/user', userRouter)

/* User Register */
router.use('/register', registerRouter)

/* Board */
const Auth = (req, res, next) =>{
    const {user} = req.session
    if (user != undefined) {
        next()
    } else {
        res.send(alertMove('회원만 이용할 수 있는 페이지입니다.', '/'))
    }
}
router.use('/board', Auth ,boardRouter)



module.exports = router