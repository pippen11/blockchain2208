const { Block, Transaction } = require('../../database/models');

const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.WebsocketProvider('ws://127.0.0.1:9005'));

const block = async (req, res) => {
    const { input } = req.body;

    try {
        const result = await Block.findOne({ where: { number: parseInt(input) } });

        if (result === undefined) {
            throw new Error('no data');
        }
        res.json({ block: 1, data: result.toJSON() });
    } catch (err) {
        res.json({ error: 1 });
    }
};

const address = async (req, res) => {
    const { input } = req.body;
    try {
        const resultFrom = await Transaction.findAll({ where: { from: input } });
        const resultTo = await Transaction.findAll({ where: { to: input } });
        const resultMiner = await Block.findAll({ where: { miner: input }, order: [['number', 'DESC']] });

        if (resultFrom[0] === undefined && resultTo[0] === undefined && resultMiner[0] === undefined) {
            throw new Error('no data');
        }

        const arr = [];
        let minedBlocks = await resultMiner.reduce(async (acc, v) => {
            const block = await web3.eth.getBlock(v.number, true);
            arr.push(block);

            return acc;
        }, arr);

        const arr2 = [];
        minedBlocks = minedBlocks.reduce((acc, v) => {
            if (v.transactions.length === 0) {
                arr2.push(v);
            } else {
                const rewardFee = v.transactions.reduce((acc, tx) => {
                    const fee = tx.gasPrice * tx.gas;

                    return acc + fee;
                }, 0);

                v.rewardFee = rewardFee;
                arr2.push(v);
            }

            return acc;
        }, arr2);

        const txData = [...resultFrom, ...resultTo].sort((a, b) => b.blockNum - a.blockNum);

        const result = {
            address: input,
            minedBlocks,
            txData,
        };

        res.json(result);
    } catch (err) {
        res.json({ error: 1 });
    }
};

const txHash = async (req, res) => {
    const { input } = req.body;
    try {
        const result = await Transaction.findOne({ where: { txHash: input } });
        if (result === undefined) {
            throw new Error('no data');
        }
        const data = result.toJSON();
        data.value = web3.utils.fromWei(data.value, 'ether');

        res.json({ txHash: 1, data });
    } catch (err) {
        res.json({ error: 1 });
    }
};

module.exports = {
    block,
    address,
    txHash,
};
