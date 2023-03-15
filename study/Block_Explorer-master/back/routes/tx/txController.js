const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.WebsocketProvider('ws://127.0.0.1:9005'));

const { Transaction } = require('../../database/models');

const getInfo = async (req, res) => {
    try {
        const result = await Transaction.findAll({ order: [['blockNum', 'DESC']] });

        let modifiedResult = [];
        result.reduce((acc, v) => {
            const data = v.toJSON();
            data.value = web3.utils.fromWei(data.value, 'ether');

            modifiedResult.push(data);
            return acc;
        }, modifiedResult);

        res.json(modifiedResult);
    } catch (err) {
        console.log(err);
    }
};

const getPrev = async (req, res) => {
    try {
        const result = await Transaction.findAll({ limit: 5, order: [['blockNum', 'DESC']] });

        let modifiedResult = [];
        result.reduce((acc, v) => {
            const data = v.toJSON();
            data.value = web3.utils.fromWei(data.value, 'ether');

            modifiedResult.push(data);
            return acc;
        }, modifiedResult);

        res.json(modifiedResult);
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    getInfo,
    getPrev,
};
