
// const index = (req, res)=>{
//     res.send('라우터 배우자')
// }

// module.exports = {
//     index
// }


const express = require('express')
const router = express.Router();
// router는 객체
// router라는 객체 안에 라우터를 만들어서 넣어준 체
// 라우터와 미들웨어를 담을 수 있는 객체
// 라우터 자체를 담을 수 있는 객체를 만들었는데 그게 바로 router 객체이다.

// router.get은
// 실행시킨다는 것이 아니라 router 객체에 내가 만든 라우터를 담아놓는 것
router.get('/', (req, res)=>{
    res.send('라우터 배우자2')
})

module.exports = router;