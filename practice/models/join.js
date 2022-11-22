const Sequelize = require("sequelize");

module.exports = class User_Info extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        img: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        name: {
          type: Sequelize.STRING(255),
        },
        userid: {
          type: Sequelize.STRING(255),
          unique: true,
        },
        pw: {
          type: Sequelize.STRING(255),
        },
        email: {
          type: Sequelize.STRING(255),
        },
        birth: {
          type: Sequelize.STRING(255),
        },
      },
      {
        sequelize,
        modelName: "User_Info",
        tableName: "userInfo",
        timestamps: true,
        paranoid: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
};
