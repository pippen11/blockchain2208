import React, { useState, useEffect, useCallback, useMemo } from 'react';
import getBlockData from '../../utils/getBlockData';
import socketIO from 'socket.io-client';
import BlockTable from '../table/BlockTable';

const Blocks = () => {
    const [blockData, setBlockData] = useState([]);

    const data = useMemo(() => blockData, [blockData]);

    useEffect(() => {
        const init = async () => {
            const result = await getBlockData();
            setBlockData(result);
        };

        init();
    }, []);

    useEffect(() => {
        const socket = socketIO.connect('http://localhost:4000', {
            transports: ['websocket'],
        });

        socket.on('newBlock', (data) => {
            setBlockData([data, ...blockData]);
        });

        return () => {
            socket.disconnect();
        };
    }, [blockData]);

    return (
        <div>
            <h2 style={{ marginLeft: '2%' }}>Blocks</h2>
            <BlockTable data={data} />
        </div>
    );
};

export default Blocks;
