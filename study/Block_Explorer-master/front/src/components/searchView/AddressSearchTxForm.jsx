import React from 'react';

const AddressSearchForm = ({ txData }) => {
    const dataList = () => {
        return txData.map((v, k) => {
            return (
                <tr key={k}>
                    <td>{v.txHash}</td>
                    <td>{v.blockNum}</td>
                    <td>{v.timestamp}</td>
                    <td>{v.from}</td>
                    <td>{v.to}</td>
                    <td>{v.value / 10 ** 18} ETH</td>
                    <td>{v.txFee} ETH</td>
                </tr>
            );
        });
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Txn Hash</th>
                    <th>Block</th>
                    <th>Age</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Value</th>
                    <th>Txn Fee</th>
                </tr>
            </thead>
            <tbody>{dataList()}</tbody>
        </table>
    );
};

export default AddressSearchForm;
