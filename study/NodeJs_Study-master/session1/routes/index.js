const express = require('express')
const {alertMove} = require('../util/alertMove.js')
const router = express.Router();
const userRouter = require('./user/index.js')
const boardRouter = require('./board/index.js')

router.get('/', (req, res)=>{
    // console.log('메인페이지', req.session)
    let {user} = req.session
    res.render('index.html', {
        user
    })
})

/* User Login */
router.use('/user', userRouter)

/* Board */
const Auth = (req, res, next) => {
    const {user} = req.session;
    if (user != undefined) {
        next()
    } else {
        res.send(alertMove('회원만 이용가능한 페이지 입니다.', '/'))
    }
}

router.use('/board', Auth ,boardRouter)


module.exports = router;