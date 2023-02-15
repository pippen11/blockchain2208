const Sequelize = require("sequelize");

module.exports = class Board extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        userId: {
          type: Sequelize.STRING(20),
        },
        pw: {
          type: Sequelize.STRING(64),
          //hash
        },
        name: {
          type: Sequelize.STRING(20),
        },
      },

      {
        sequelize,
        modelName: "User",
        tableName: "User",
        paranoid: true,
        underscored: true,
        timestamps: true,
      }
    );
  }
  static associate(db) {
    db.User.hasMany(db.Board);
  }
};
