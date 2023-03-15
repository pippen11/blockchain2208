import React from 'react';
import styles from '../../public/SearchTable.module.css';

const TxHashSearchForm = ({ data }) => {
    return (
        <>
            <h2 className={styles.type} style={{ marginBottom: '0' }}>
                Transaction Hash
            </h2>
            <h3 style={{ marginLeft: '5%', marginTop: '0', fontSize: '30px' }}>{data.txHash}</h3>
            <ul className={styles.list}>
                <li>
                    <span>Block Height :</span> <span>{data.blockNum}</span>
                </li>
                <li>
                    <span>Timestamp :</span> <span>{data.timestamp}</span>
                </li>
                <li>
                    <span>From :</span> <span>{data.from}</span>
                </li>
                <li>
                    <span>To :</span> <span>{data.to}</span>
                </li>
                <li>
                    <span>Value :</span> <span>{data.value} ETH</span>
                </li>
                <li>
                    <span>Gas :</span> <span>{data.gas}</span>
                </li>
                <li>
                    <span>Gas Price :</span>{' '}
                    <span>
                        {data.gasPrice} wei ({data.gasPrice / 10 ** 9} Gwei)
                    </span>
                </li>
            </ul>
        </>
    );
};

export default TxHashSearchForm;
