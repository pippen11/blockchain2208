const Sequelize = require("sequelize");

module.exports = class User_Info extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        userImg: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        name: {
          type: Sequelize.STRING(255),
        },
        userId: {
          type: Sequelize.STRING(255),
          unique: true,
        },
        email: {
          type: Sequelize.STRING(255),
        },
        userPw: {
          type: Sequelize.STRING(255),
        },
        birthday: {
          type: Sequelize.STRING(255),
        },
        nickname: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        publish: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "User_Info",
        tableName: "userInfo",
        timestamps: true,
        // paranoid: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
};
