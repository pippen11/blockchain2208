import React from 'react';
import styles from '../../public/SearchTable.module.css';

const BlockSearchForm = ({ data }) => {
    return (
        <>
            <h2 className={styles.type}>Block Height : {data.number}</h2>
            <ul className={styles.list}>
                <li>
                    <span>Block Height :</span> <span>{data.number}</span>
                </li>
                <li>
                    <span>Timestamp :</span> <span>{data.timestamp}</span>
                </li>
                <li>
                    <span>Block Hash :</span> <span>{data.blockHash}</span>
                </li>
                <li>
                    <span>Miner :</span> <span>{data.miner}</span>
                </li>
                <li>
                    <span>Difficulty :</span> <span>{data.difficulty}</span>
                </li>
                <li>
                    <span>Nonce :</span> <span>{data.nonce}</span>
                </li>
                <li>
                    <span>Size :</span> <span>{data.size ? data.size : 'null'}</span>
                </li>
                <li>
                    <span>Gas Used :</span> <span>{data.gasUsed}</span>
                </li>
                <li>
                    <span>Gas Limit :</span> <span>{data.gasLimit}</span>
                </li>
                <li>
                    <span>Transactions :</span> <span>{data.transactions}</span>
                </li>
                <li>
                    <span>Extra Data :</span> <span>{data.extraData}</span>
                </li>
            </ul>
        </>
    );
};

export default BlockSearchForm;
