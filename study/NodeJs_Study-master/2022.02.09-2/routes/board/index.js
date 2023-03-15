/* Board */
/*
    리스트
    글쓰기 get
    글쓰기 post
    글보기
    글수정 get
    글수정 post
    글삭제 get

*/
// 로그인 한 사용자만 게시판을 이용할 수 있게끔 만들기

// 라우터로 미리 구분해 놓은 다음 미들웨어를 사용하자.

const express = require('express');
const router = express.Router();
const {alertmove} = require('../../util/alert.js')

router.get('/list', (req, res)=>{
    res.render('./board/list.html')
})

router.get('/write', (req, res)=>{
    res.render('./board/write.html')
})

router.post('/write', (req, res)=>{
    res.send(alertmove('/board/view', '글작성이 완료되었습니다.'))
})

router.get('/view', (req, res)=>{
    res.render('./board/view.html')
})

router.get('/update', (req, res)=>{
    res.render('./board/update.html')
})

router.post('/update', (req, res)=>{
    res.send(alertmove('/board/view', '글작성이 완료되었습니다.'))
})

router.get('/delete', (req, res)=>{
    res.send(alertmove('/board/list', '글삭제가 완료되었습니다.'))
})

module.exports = router;