
const express = require('express')
const {alertMove} = require('../../util/alertMove.js')
const user = require('../../models/user.js')
const router = express.Router()


router.get('/login', (req, res)=>{
    res.render('login.html')
})

router.post('/login', (req, res)=>{
    const {userid, userpw} = req.body;
    const [data] = user.filter(v => (v.userid === userid && v.userpw === userpw));
    // console.log(data)
    // 로그인에 성공한 경우, session 객체 안에 user라는 속성값을 추가해서 사용자 정보를 넣어준다.
    if (data != undefined) {
        // 세션 생성
        req.session.user = {...data}
        res.redirect('/')
    } else {
        res.send(alertMove("아이디와 패스워드가 없습니다.", '/user/login'))
    }
})

router.get('/logout', (req, res)=>{
    // 세션 삭제
    req.session.destroy(()=>{ 
        req.session
    })
    console.log(req.session)
    res.send(alertMove('로그아웃이 완료되었습니다', '/'))
})

module.exports = router;
