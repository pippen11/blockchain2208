import React from 'react';
import '../../public/PrevTable.css';

const BlockPrevTable = ({ data }) => {
    const dataList = () => {
        return data.map((v, k) => {
            return (
                <tr key={k}>
                    <td>{v.number}</td>
                    <td>{v.blockHash}</td>
                    <td>{v.miner}</td>
                </tr>
            );
        });
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Block Height</th>
                    <th>Block Hash</th>
                    <th>Miner</th>
                </tr>
            </thead>
            <tbody>{dataList()}</tbody>
        </table>
    );
};

export default BlockPrevTable;
