import React from 'react';
import '../../public/BlockTable.css';

const BlockTable = ({ data }) => {
    const dataList = () => {
        return data.map((v, k) => {
            return (
                <tr key={k}>
                    <td>{v.number}</td>
                    <td>{v.timestamp}</td>
                    <td>{v.transactions}</td>
                    <td>{v.miner}</td>
                    <td>{v.gasUsed}</td>
                    <td>{v.gasLimit}</td>
                </tr>
            );
        });
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Block</th>
                    <th>Age</th>
                    <th>Txn</th>
                    <th>Miner</th>
                    <th>Gas Used</th>
                    <th>Gas Limit</th>
                </tr>
            </thead>
            <tbody>{dataList()}</tbody>
        </table>
    );
};

export default BlockTable;
