const Sequelize = require("sequelize");

module.exports = class Block extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        gasLimit: {
          type: Sequelize.STRING(255),
        },
        gasUsed: {
          type: Sequelize.STRING(255),
        },
        //트잭발생했을때만 사용가스나옴
        hash: {
          type: Sequelize.STRING(255),
        },
        // hash로 관계지어서 from to찾아야하나?
        number: {
          type: Sequelize.STRING(255),
        },
        //블록높이
        timestamp: {
          type: Sequelize.STRING(255),
        },
        totalDifficulty: {
          type: Sequelize.STRING(255),
        },
        txs: {
          type: Sequelize.STRING(255),
        },
      },

      {
        sequelize,
        modelName: "Block",
        tableName: "block",
        paranoid: true,
        underscored: true,
        timestamps: true,
      }
    );
  }
  // static associate(db) {
  //   db.Block.hasMany(db.Transaction, {
  //     foreignKey: "blockheight",
  //     sourceKey: "number",
  //   });
  // }
};
