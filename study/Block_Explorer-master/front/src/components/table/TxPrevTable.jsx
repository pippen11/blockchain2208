import React from 'react';
import '../../public/PrevTable.css';

const TxPrevTable = ({ data }) => {
    const dataList = () => {
        return data.map((v, k) => {
            return (
                <tr key={k}>
                    <td>{v.txHash}</td>
                    <td>
                        from : {v.from}
                        <br />
                        to : {v.to}
                    </td>
                    <td>{v.value} ETH</td>
                </tr>
            );
        });
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Tx Hash</th>
                    <th>From / To</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>{dataList()}</tbody>
        </table>
    );
};

export default TxPrevTable;
