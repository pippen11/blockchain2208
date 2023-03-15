const express = require('express')
const router = express.Router()  // express 함수 안에서 Router()라는 함수를 실행시켜서 가져와 줘야 한다.

// express.Router() => 객체를 반환해 준다.

router.get('/abc', (req, res)=>{
    res.send('hello abc')
})

router.get('/ingoo', ()=>{
    res.send('hello ingoo')
})
// 라우터를 실행시키는게 아니라 
// 라우터만 만들 수 있는 객체
// 라우터를 만들어만 준다.
// router가 '/abc', (req, res)=>{res.render('hello abc')} 를 만들어 준 것
// server.js 파일의 라우터에 들어갈 인자값을 생성해 준다.

console.log(router)
console.log(typeof(router))
module.exports = router;