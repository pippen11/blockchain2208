const express = require('express')
const router = express.Router();
const user = require('../models/user.js')
const {alertmove} = require('../util/alert.js')
const userRouter = require('./user/index.js')
const boardRouter = require('./board/index.js')

router.get('/', (req, res)=>{
    console.log('여기가 메인페이지 :', req.session)
    const {user} = req.session;
    res.render('index.html', {
        user
    })
})

const Auth = (req, res, next) => {
    let {user} = req.session
    if (user != undefined) {
        // 로그인 한 사람
        next()
    } else {
        // 로그인 안 한 사람
        res.send(alertmove('/', '회원만 이용 가능한 페이지 입니다.'))
    }
}

/* User */
router.use('/user', userRouter)

/* Board */
router.use('/board', Auth ,boardRouter)
// 미들웨어를 추가함으로써 검증 작업을 거칠 수 있다.
// "/board" uri로 접근할 때 로그인 한 사람인지 체크하는 작업을 해준다.


module.exports = router