const Web3 = require('web3');
const { Block, Transaction } = require('./database/models');
const web3 = new Web3(new Web3.providers.WebsocketProvider('ws://127.0.0.1:9005'));

const wsWeb3 = async (io) => {
    const curBlockNum = await web3.eth.getBlockNumber();
    const dbBlocks = await Block.findAll();

    if (dbBlocks.length < curBlockNum) {
        const blockArr = [];
        for (let i = dbBlocks.length + 1; i <= curBlockNum; i++) {
            const block = await web3.eth.getBlock(i, true);
            blockArr.push(block);
        }

        blockArr.forEach(async (v) => {
            const newBlock = {
                number: v.number,
                blockHash: v.hash,
                miner: v.miner,
                difficulty: v.difficulty,
                nonce: v.nonce,
                size: v.size,
                gasUsed: v.gasUsed,
                gasLimit: v.gasLimit,
                transactions: v.transactions.length,
                extraData: v.extraData,
                timestamp: v.timestamp,
            };
            await Block.create(newBlock);
        });

        blockArr.forEach(async (block) => {
            if (block.transactions.length !== 0) {
                block.transactions.forEach(async (v) => {
                    const txData = {
                        txHash: v.hash,
                        blockNum: v.blockNumber,
                        timestamp: block.timestamp,
                        from: v.from,
                        to: v.to,
                        value: v.value,
                        gas: v.gas,
                        gasPrice: parseInt(v.gasPrice),
                        txFee: (v.gas * parseInt(v.gasPrice)) / 10 ** 18,
                    };
                    await Transaction.create(txData);
                });
            }
        });
    }

    web3.eth.subscribe('newBlockHeaders', async (error, result) => {
        try {
            if (!error) {
                const { number } = result;

                const block = await web3.eth.getBlock(number, true);

                const blockData = {
                    number: block.number,
                    blockHash: block.hash,
                    miner: block.miner,
                    difficulty: block.difficulty,
                    nonce: block.nonce,
                    size: block.size,
                    gasUsed: block.gasUsed,
                    gasLimit: block.gasLimit,
                    transactions: block.transactions.length,
                    extraData: block.extraData,
                    timestamp: block.timestamp,
                };
                await Block.create(blockData);

                const txHashs = [];
                if (blockData.gasUsed !== 0) {
                    const txBlock = await web3.eth.getBlock(number);
                    txBlock.transactions.forEach((v) => {
                        txHashs.push(v);
                    });
                }
                for (const hash of txHashs) {
                    const tx = await web3.eth.getTransaction(hash);
                    const txData = {
                        txHash: tx.hash,
                        blockNum: tx.blockNumber,
                        timestamp: blockData.timestamp,
                        from: tx.from,
                        to: tx.to,
                        value: tx.value,
                        gas: tx.gas,
                        gasPrice: parseInt(tx.gasPrice),
                        txFee: (tx.gas * parseInt(tx.gasPrice)) / 10 ** 18,
                    };
                    console.log(txData);
                    await Transaction.create(txData);
                }
            }
        } catch (err) {
            console.log(err);
        }
    });

    io.on('connection', (socket) => {
        console.log('socket opened!!');
        web3.eth.subscribe('newBlockHeaders', async (error, result) => {
            try {
                if (!error) {
                    const { number } = result;

                    const block = await web3.eth.getBlock(number, true);

                    const blockData = {
                        number: block.number,
                        blockHash: block.hash,
                        miner: block.miner,
                        difficulty: block.difficulty,
                        nonce: block.nonce,
                        size: block.size,
                        gasUsed: block.gasUsed,
                        gasLimit: block.gasLimit,
                        transactions: block.transactions.length,
                        extraData: block.extraData,
                        timestamp: block.timestamp,
                    };

                    socket.emit('newBlock', blockData);

                    const txHashs = [];
                    if (block.gasUsed !== 0) {
                        const txBlock = await web3.eth.getBlock(number);
                        txBlock.transactions.forEach((v) => {
                            txHashs.push(v);
                        });
                    }
                    const txDatas = [];
                    for (const hash of txHashs) {
                        const tx = await web3.eth.getTransaction(hash);
                        const txData = {
                            txHash: tx.hash,
                            blockNum: tx.blockNumber,
                            timestamp: block.timestamp,
                            from: tx.from,
                            to: tx.to,
                            value: tx.value / 10 ** 18,
                            gas: tx.gas,
                            gasPrice: parseInt(tx.gasPrice),
                            txFee: (tx.gas * parseInt(tx.gasPrice)) / 10 ** 18,
                        };

                        txDatas.push(txData);
                    }
                    socket.emit('newTx', txDatas);
                }
            } catch (err) {
                console.log(err);
            }
        });

        socket.on('disconnect', () => {
            console.log('disconnect');
        });
    });
};

module.exports = wsWeb3;
