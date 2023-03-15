import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Tx from './address/Tx';
import Mined from './address/Mined';
import BlockSearchForm from './BlockSearchForm';
import TxHashSearchForm from './TxHashSearchForm';
import styles from '../../public/AddressBtn.module.css';

const Found = () => {
    const { state } = useLocation();
    const [flag, setFlag] = useState(0);

    if (state.block) {
        const { data } = state;

        return <BlockSearchForm data={data} />;
    }

    if (state.txHash) {
        const { data } = state;

        return <TxHashSearchForm data={data} />;
    }

    if (state.address) {
        const { txData, minedBlocks: minedData } = state;
        console.log(txData);
        return (
            <>
                <h2 style={{ marginLeft: '5%', fontSize: '50px', marginBottom: '0' }}>Address</h2>
                <h3 style={{ marginLeft: '5%', marginTop: '0', fontSize: '30px' }}>{state.address}</h3>
                <ul className={styles.addressBtn}>
                    <li className={styles.Btn} onClick={() => setFlag(0)}>
                        Transactions
                    </li>
                    <li className={styles.Btn} onClick={() => setFlag(1)}>
                        Mined Blocks
                    </li>
                </ul>
                <div>{flag === 0 ? <Tx txData={txData} /> : <Mined minedData={minedData} />}</div>
            </>
        );
    }

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                fontWeight: 'bold',
                fontSize: '150px',
            }}
        >
            <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)' }}>NO DATA</div>
        </div>
    );
};

export default Found;
