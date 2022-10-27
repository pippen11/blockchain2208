const Sequelize = require("sequelize");

module.exports = class Table extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        column: {
          type: Sequelize.STRING(10),
          //primarykey:true, // 고유식별 키이냐?
          //autoIncrement:true, // index값 자동 증가
          //unique: true, //값이 중복 되면 안된다.
          //allowNull: false, // 비면 안된다.
          //defaultValue:Sequelize.NOW
        },
      },

      {
        sequelize,
        timestamps: true, // createAt , updataeAt 자동으로 추가
        underscored: true, //테이블과 컬럼명을 카멜 케이스로 수정
        modelName: "NewTable1", //javascript에서 사용하는 테이블명
        tableName: "new_table1", //MySQL에 있는 테이블명
        paranoid: false, //삭제 시 deleteAt을 저장할지 , 테이블에서 데이터를 삭제 시 아예 삭제를 할것인가? 아니면 삭제한 날짜를 남김으로써 데이터를 남길것인가?
        charset: "utf8mb4", //언어 포멧 설정
        collate: "utf8b4_general_ci", //언어포멧설정
      }
    );
  }
  static associate(db) {}
};
