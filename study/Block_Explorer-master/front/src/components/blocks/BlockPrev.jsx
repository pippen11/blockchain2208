import React, { useEffect, useState } from 'react';
import getBlockPrev from '../../utils/getBlockPrev';
import BlockPrevTable from '../table/BlockPrevTable';

const BlockPrev = (props) => {
    const { socket } = props;
    const [blockPrevData, setBlockPrevData] = useState([]);

    useEffect(() => {
        const init = async () => {
            const result = await getBlockPrev();
            setBlockPrevData(result);
        };

        init();
    }, []);

    useEffect(() => {
        socket.on('newBlock', (data) => {
            const prevArr = [data, ...blockPrevData];
            const newBlockPrevData = prevArr.slice(0, 5);
            setBlockPrevData(newBlockPrevData);
        });
    }, [blockPrevData]);

    return (
        <>
            <h2>Latest Blocks</h2>
            <BlockPrevTable data={blockPrevData} />
        </>
    );
};

export default BlockPrev;
