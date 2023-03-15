import React from 'react';

const AddressSearchMinedForm = ({ minedData }) => {
    const dataList = () => {
        return minedData.map((v, k) => {
            return (
                <tr key={k}>
                    <td>{v.number}</td>
                    <td>{v.timestamp}</td>
                    <td>{v.transactions.length}</td>
                    <td>{v.difficulty}</td>
                    <td>{v.gasUsed}</td>
                    <td>{v.rewardFee ? `${2 + v.rewardFee / 10 ** 18} ETH ` : `2 ETH`}</td>
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
                    <th>Transaction</th>
                    <th>Difficulty</th>
                    <th>Gas Used</th>
                    <th>Rewards</th>
                </tr>
            </thead>
            <tbody>{dataList()}</tbody>
        </table>
    );
};

export default AddressSearchMinedForm;
