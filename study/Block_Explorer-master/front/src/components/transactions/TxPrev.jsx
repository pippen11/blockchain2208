import React, { useEffect, useState } from 'react';
import getTxPrev from '../../utils/getTxPrev';
import TxPrevTable from '../table/TxPrevTable';

const TxPrev = (props) => {
    const { socket } = props;
    const [txPrevData, setTxPrevData] = useState([]);

    useEffect(() => {
        const init = async () => {
            const result = await getTxPrev();
            setTxPrevData(result);
        };

        init();
    }, []);

    useEffect(() => {
        socket.on('newTx', (data) => {
            const prevArr = [...data, ...txPrevData];
            const newTxPrevData = prevArr.slice(0, 5);
            setTxPrevData(newTxPrevData);
        });
    }, [txPrevData]);

    return (
        <>
            <h2>Latest Transactions</h2>
            <TxPrevTable data={txPrevData} />
        </>
    );
};

export default TxPrev;
