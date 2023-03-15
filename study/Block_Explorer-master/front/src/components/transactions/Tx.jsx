import React, { useEffect, useState, useMemo } from 'react';
import getTxData from '../../utils/getTxData';
import socketIO from 'socket.io-client';
import TxTable from '../table/TxTable';

const Tx = () => {
    const [txData, setTxData] = useState([]);

    const data = useMemo(() => txData, [txData]);

    useEffect(() => {
        const init = async () => {
            const result = await getTxData();
            setTxData(result);
        };

        init();
    }, []);

    useEffect(() => {
        const socket = socketIO.connect('http://localhost:4000', {
            transports: ['websocket'],
        });

        socket.on('newTx', async (data) => {
            console.log(data);
            await setTxData([...data, ...txData]);
        });

        return () => {
            socket.disconnect();
        };
    }, [txData]);

    return (
        <div style={{}}>
            <h2 style={{ marginLeft: '2%' }}>Transactions</h2>
            <TxTable data={data} />
        </div>
    );
};

export default Tx;
