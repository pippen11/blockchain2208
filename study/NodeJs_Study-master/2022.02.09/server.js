const express = require('express')  // express라는 파일을 가져오는 행위
const nunjucks = require('nunjucks') 
const app = express();  // express 파일에서 가져온 것을 실행한 결과물을 app이라는 변수에 담음
const profile = require('./middleware.js')
const router = require('./router.js')

app.set('view engine', 'html')
nunjucks.configure('./views', {
    express: app,
    watch: true
})


app.use(express.urlencoded({extended: true}))

// 라우터는 실행순서가 있다.
// 같은게 두개 이상 들어갈 경우 먼저 작성한 라우터가 실행된다.

// 미들웨어는 총 4개의 매개변수가 존재 -> 4번째는 에러처리에 사용
// 미들웨어의 3번째 매개변수인 next 매개변수
let middle = (req, res, next) => {
    console.log('돌아가')
    next()
}
app.use(middle)  // app.use('/', middle) 과 동일
// 라우터의 인자값은 n개
// 1개일 때 -> '/' 이 생략된 것, 미들웨어만 들어간 형태 
// 2개일 때 -> 첫번째 인자값이 uri 두번째 인자값이 미들웨어
// 3개일 때 -> 첫번째 인자값이 uri 두번째 인자값이 미들웨어 세번째 인자값이 미들웨어

// 기본적으로 라우터는 1개의 요청에 1개의 라우터만 실행된다.
// 이 때 다음에 오게 되는 라우터도 실행하고 싶을 때 사용하는 것이 미들웨어의 세번째 인자값으로 오는 next이다.
//

app.get('/', (req, res)=>{
    res.render('index.html')
})
// app.get <-- 라우터
// (req, res) => { } <-- 미들웨어
// 라우터와 미들웨어를 구별할 수 있어야 한다.

/* 
라우터 역할
미들웨어를 실행시켜주기 위해 사용됨.
라우터는 요청 URL에 따라 미들웨어를 실행시켜주기 위해 씀.
*/

// 미들웨어
// 라우터의 함수
// 응답하는 코드를 작성할 수 있는 공간

// 정리 // 라우터는 요청 관련 처리 // 미들웨어는 응답 관련 처리

// 미들웨어를 변수로 빼서 사용하는 것 역시 가능하다.
// let profile = (req, res) => { res.render('profile.html') }
// 분리가 가능하다는 것은 다른 파일 안에 존재하는 함수도 미들웨어로 사용할 수 있다는 뜻이다.
app.get('/profile', profile)
// 라우터와 미들웨어를 분리해서 코드를 작성할 수 있다.

// 라우터 분리
app.use(router)





app.listen(3000, ()=>{
    console.log("server onload")
})