// express mysql2 - 드라이버
// mysql2 sequelize
// npm install mysql2 sequelize

// DB 연결하기
const { Sequelize, DataTypes } = require('sequelize')
// 라이브러리 자체를 가져오는 건 대문자 Sequelize

// 4개의 인자값 존재
// 1. 데이터베이스명
// 2. 계정명
// 3. 패스워드
// 4. Object (설정값)
    // 4.1 host
    // 4.2 dialect: 'mysql'  // 사용할 DB
    // 4.3 pool: { }

const sequelize = new Sequelize('sqExample', 'bitkunst', 'won0701', {
    host: '172.22.219.232',
    dialect: 'mysql'
})

// sequelize에 점속 정보가 담겨있다.
// sequelize.sync()
// .then(data => {
//     console.log('connected')
// })
// .catch(err => {
//     console.log('failed')
// })

// table 데이터를 object로 mapping할 수 있도록 형태를 만들어줘야 한다.
/*
    create table comment(
        idx auto_increment,
        subject varchar(30) not null,
        content varchar(100) not null
    )charset=utf8mb;
*/
function comment() {
    // model
    // define() 인자값 3개 : string, object, object
    // 1. 모델명
    // 2. 필드 내용
    // 3. 옵션 정보
    const COMMENT = sequelize.define('comment', {
        // 필드내용
        subject: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        content: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    }, {
        // 옵션
        tableName: 'comment',
        timestamps: false
    })

    return COMMENT
}

const insert = async () => {
    const COMMENT = comment()
    await COMMENT.create({
        subject: 'hi',
        content: '안녕하세요'
    })
}

async function init() {
    try {
        comment()
        // model이 먼저 선언되어 있어야 한다.

        await sequelize.sync({ force: true })
        console.log('connected')

        // 코드 작성해서 sequelize 코드 실행.
        insert()

    } catch (err) {
        console.log('failed')
    }
}

init()