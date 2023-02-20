const Sequelize = require("sequelize");

module.exports = class Transaction extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        blockHash: {
          type: Sequelize.STRING(255),
        },
        blockNumber: {
          type: Sequelize.STRING(255),
        },
        from: {
          type: Sequelize.STRING(255),
        },
        gas: {
          type: Sequelize.STRING(255),
        },
        gasPrice: {
          type: Sequelize.STRING(255),
        },
        hash: {
          type: Sequelize.STRING(255),
        },
        to: {
          type: Sequelize.STRING(255),
        },
        transactionIndex: {
          type: Sequelize.STRING(255),
        },
        value: {
          type: Sequelize.STRING(255),
        },
      },

      {
        sequelize,
        modelName: "Transaction",
        tableName: "transaction",
        paranoid: true,
        underscored: true,
        timestamps: true,
      }
    );
  }
  // static associate(db) {
  //   db.Transaction.belongsTo(db.Block, {
  //     foreignKey: "blockheight",
  //     targetKey: "number",
  //   });
  // }
};
