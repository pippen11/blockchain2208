module.exports = function (sequelize, DataType) {
    let user = sequelize.define("uUser", {
        userId: {
            field: 'userid',
            type: DataType.STRING(50)
        },
        password: {
            field: 'password',
            type: DataType.STRING(50)
        }
    },
    {
        underscored: true,
        tableName: "user"
    })
    return user
}

// sequelize.define("객체이름", 스키마 정의, 테이블 설정)

// sequelize-cli 이용해 테이블 생성
// sequelize model:create --name user2 --attributes "user_id:string, password:string"