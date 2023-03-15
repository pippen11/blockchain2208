module.exports = (sequelize, DataTypes) => {
    const Block = sequelize.define(
        'Block',
        {
            number: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
            },
            blockHash: {
                type: DataTypes.STRING(),
                allowNull: false,
            },
            miner: {
                type: DataTypes.STRING(),
                allowNull: false,
            },
            difficulty: {
                type: DataTypes.STRING(),
                allowNull: false,
            },
            nonce: {
                type: DataTypes.STRING(),
                allowNull: false,
            },
            size: {
                type: DataTypes.STRING(),
                allowNull: true,
            },
            gasUsed: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            gasLimit: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            transactions: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            extraData: {
                type: DataTypes.STRING(),
                allowNull: false,
            },
            timestamp: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            tableName: 'Block',
            modelName: 'Block',
            timestamps: false,
            charset: 'utf8mb4',
        },
    );
    return Block;
};
