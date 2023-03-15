module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define(
        'Transaction',
        {
            txHash: {
                type: DataTypes.STRING(),
                allowNull: false,
                primaryKey: true,
            },
            blockNum: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
            timestamp: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            from: {
                type: DataTypes.STRING(),
                allowNull: false,
            },
            to: {
                type: DataTypes.STRING(),
                allowNull: false,
            },
            value: {
                type: DataTypes.STRING(),
                allowNull: false,
            },
            gas: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
            gasPrice: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
            txFee: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
        },
        {
            tableName: 'Transaction',
            modelName: 'Transaction',
            timestamps: false,
            charset: 'utf8mb4',
        },
    );

    return Transaction;
};
