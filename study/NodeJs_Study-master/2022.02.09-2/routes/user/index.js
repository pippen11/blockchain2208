// 메인페이지
// Login
// GET 로그인
// POST 로그인
// 마이페이지
// 로그아웃 기능

/* User login */
const express = require('express');
const router = express.Router();
const user = require('../../models/user.js')
const {alertmove} = require('../../util/alert.js')

router.get('/login', (req, res)=>{
    res.render('./user/login.html')
})

router.post('/login', (req, res)=>{
    let {userid, userpw} = req.body;
    // 목적
    // 사용자에게 받은 정보를 서버에 있는 리스트 중에서 하나만 가져오기 위해서
    let [item] = user.filter(v => (v.userid === userid && v.userpw === userpw))
    // console.log(item)
    if (item != undefined) {
        // 로그인을 할 수 있는 경우
        // session 객체 안에 user라는 속성값을 추가해서 사용자 정보를 넣어준다.
        req.session.user = {...item}  // 아이디값이랑 사용자 정보 연결
        res.redirect('/')

    } else {
        // 로그인을 못하는 경우
        // res.redirect('/user/login')
        // 서버가 redirect라는 응답을 줬을 때 클라이언트는 응답을 받고 
        // location이라는 함수를 실행해 인자값의 주소로 다시 요청을 보내게 된다.
        res.send(alertmove('/user/login', '아이디와 패스워드가 없음'))
    }
})  


router.get('/profile', (req, res)=>{
    res.render('./user/profile.html')
})


router.get('/logout', (req, res)=>{
    req.session.destroy( ()=>{
        req.session  // 세션 삭제
    })

    res.send(alertmove('/', '로그아웃이 완료되었습니다.'))
})

module.exports = router;