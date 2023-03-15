// ORM 
// ORM을 이용하면 객체를 이용해 테이블을 자유롭게 조작할 수 있다.
// JavaScript 객체

// npm install sequelize mysql2
// npm install -g sequelize-cli
// sequelize init 을 통해 실행

// express 라이브러리 사용 가정.

const models = require('./models/index.js')
// model을 반환하는 객체를 불러온다.
// sequelize 안에서는 모든 메소드가 promise 기반

models.sequelize.sync().then(()=>{
    console.log('connected')
}).catch((err)=>{
    console.log('connection failed')
    console.log(err)
})

// CRUD

// 데이터 추가하기
router.post("/board", (req, res, next)=>{
    let body = req.body;

    // title, content
    models.users.create({
        title: body.title,
        content: body.content
    })
    .then((result)=>{
        // result
        // 성공시 성공한 데이터 객체 반환
    })
    .catch((err)=>{
        // err
    })
})

// 데이터 조회하기
router.get("/board", (req, res, next)=>{
    models.users.findAll().then().catch((err)=>{})  // 테이블에 전체 데이터 불러오기
    models.users.findOne({
        where: {
            id: "id 값"
        }
    })
    .then()
    .catch((err)=>{})
})

// 데이터 업데이트 하기
models.users.update({
    title: body.title,
    content: body.content
}, {
    where: {
        id: "id 값"
    }
})

// 데이터 삭제
models.users.destroy({
    title: body.title,
    content: body.content
},{
    where: {
        id: "id 값"
    }
})